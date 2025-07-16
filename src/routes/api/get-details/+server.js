import { json, error as svelteKitError } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { supabase } from '$lib/supabaseClient';
import OpenAI from 'openai';
import chromium from '@sparticuz/chromium';

const puppeteer = dev ? await import('puppeteer') : await import('puppeteer-core');

const TNEB_BILL_STATUS_URL = 'https://www.tnebltd.gov.in/BillStatus/billstatus.xhtml';
const BROWSER_ARGS = [
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--disable-dev-shm-usage', // Often needed in constrained environments
	'--disable-accelerated-2d-canvas',
	'--no-first-run',
	'--no-zygote',
	// '--single-process', // Maybe uncomment for Docker/Lambda, but test
	'--disable-gpu'
	// '--ignore-certificate-errors', // Use with caution
	// '--disable-web-security', // Use with caution
	// '--allow-running-insecure-content' // Use with caution
];

async function checkErrorMessage(page) {
	const errorMessage = await page.$eval('span.ui-messages-error-summary', (el) => el.textContent);

	console.log('Error message:', errorMessage);

	return (
		errorMessage ===
		'Kindly enter correct registered mobile number for the entered service connection number'
	);
}

async function solveCaptcha(page, openai) {
	const captchaElement = await page.waitForSelector('#imgCaptchaId', {
		visible: true,
		timeout: 10000
	});
	if (!captchaElement) {
		throw new Error('CAPTCHA image element (#imgCaptchaId) not found.');
	}

	const captchaBuffer = await captchaElement.screenshot({ encoding: 'base64' });
	console.log('Got CAPTCHA Screenshot!');

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are a highly accurate CAPTCHA solving assistant. Return only the characters visible in the image, with no extra text or explanation.'
				},
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: 'Extract the exact text from this CAPTCHA image.'
						},
						{
							type: 'image_url',
							image_url: {
								url: `data:image/png;base64,${captchaBuffer}`
							}
						}
					]
				}
			],
			max_tokens: 40
		});

		const captchaText = response.choices[0]?.message?.content?.trim();
		if (!captchaText) {
			throw new Error('OpenAI did not return valid CAPTCHA text.');
		}

		if (!/^[a-zA-Z0-9]{4,12}$/.test(captchaText)) {
			console.warn(`Potential malformed CAPTCHA from OpenAI: "${captchaText}". Proceeding anyway.`);
		}

		console.log('OpenAI Response Received! CAPTCHA:', captchaText);
		return captchaText;
	} catch (err) {
		console.error('Error during OpenAI CAPTCHA solving:', err);
		throw new Error(`Failed to solve CAPTCHA: ${err.message}`);
	}
}

async function checkExistingSolar(page) {

	const tableSelector = 'table';
	try {
		await page.waitForSelector(tableSelector, { visible: true, timeout: 30000 });

		const tables = await page.$$(tableSelector);
		const targetTable = tables[5];

		const isSolar = await page.evaluate((table) => {
			if (!table) return false;
			const rows = Array.from(table.querySelectorAll('tr'));
			return rows.some((row) => {
				const cells = Array.from(row.querySelectorAll('td'));
				return cells.some((cell) => cell.textContent.includes("SOLAR NET METERING SERVICE"));
			});
		}, targetTable);

		return isSolar;

	} catch (err) {
		console.error('Error during bill data extraction:', err);
		throw new Error(`Failed to extract bill data: ${err.message}`);
	}


}

async function extractBillData(page) {

	// const fullName = await page.$eval("table td", el => {
	// 	return el.innerText.split(":").pop().trim();
	//   });
	// console.log("Full Name:", fullName);

	const tableSelector = 'table.ccbills';
	try {
		await page.waitForSelector(tableSelector, { visible: true, timeout: 30000 });
		console.log('Found tables with class "ccbills".');

		const tables = await page.$$(tableSelector);
		const targetTable = tables[1];

		const data = await page.evaluate((table) => {
			if (!table) return [];

			const rows = Array.from(
				table.querySelectorAll('tr[bgcolor="#FFFFFF"], tr[bgcolor="#fff6cc"]')
			);

			return rows
				.slice(0, -1) // Exclude the last row
				.map((row) => {
					const cells = row.querySelectorAll('td');
					// if (cells.length < 15) return null; // Optional: Add validation based on cell count
					return {
						assessmentDate: cells[0]?.innerText.trim() ?? '',
						consumptionUnits: cells[7]?.innerText.trim() ?? '',
						totalCharges: cells[14]?.innerText.trim() ?? ''
					};
				})
				.filter((item) => item !== null); // Filter out nulls if using the cell count check
		}, targetTable); // Pass the ElementHandle 'targetTable' here

		if (!data || data.length === 0) {
			console.warn('No data rows extracted from the target table.');
			// Consider if this is an error or just no bills found.
		} else {
			console.log(`Extracted ${data.length} rows. First row:`, data[0]);
		}
		return data;
	} catch (err) {
		// Catch errors from waitForSelector, $$ or evaluate
		console.error('Error during bill data extraction:', err);
		// Re-throw or handle as needed. If it's one of our specific throws, just re-throw.
		if (
			err.message.startsWith('TNEB site reported an error:') ||
			err.message.startsWith('Could not find the required results table')
		) {
			throw err;
		}
		// Otherwise, wrap it
		throw new Error(`Failed to extract bill data: ${err.message}`);
	}
}

export async function POST({ request, fetch }) {
	let { fullName, consumerNumber, phoneNumber, ebRegNumber } = await request.json();

	if (!fullName || !consumerNumber || !phoneNumber) {
		return svelteKitError(
			400,
			'Missing required fields: fullName, consumerNumber, phoneNumber'
		);
	}

	let browser = null; // Initialize browser variable

	try {
		// --- Database Storage ---
		console.log('Saving initial data to Supabase...');
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('reports') // Ensure 'reports' table exists with 'name' (text) and 'data' (jsonb) columns
			.insert([{ name: fullName, consumer_no: consumerNumber, phone_no: phoneNumber }])
			.select()
			.single();

		if (supabaseError) {
			console.error('Supabase insert error:', supabaseError);
			throw new Error(`Failed to save report to database: ${supabaseError.message}`);
		}
		const id = supabaseResult.id;

		console.log('Launching browser...');
		const executablePath = dev ? undefined : await chromium.executablePath();
		browser = await puppeteer.launch({
			args: BROWSER_ARGS,
			executablePath: executablePath,
			headless: dev ? true : chromium.headless, // Use chromium.headless in prod
			ignoreHTTPSErrors: true
		});

		const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(60000);

		await page.setViewport({ width: 1280, height: 800 });

		const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

		console.log(`Navigating to ${TNEB_BILL_STATUS_URL}...`);
		await page.goto(TNEB_BILL_STATUS_URL, { waitUntil: 'networkidle0' });

		await sleep(500);
		const captchaText = await solveCaptcha(page, openai);

        // if (!ebRegNumber) {
            console.log('EB Reg Number not provided, extracting from TNEB...');

            const response = await fetch(`/api/get-number?cno=${consumerNumber}`);
    
            if (!response.ok) {
            	console.error('Error fetching EB Reg Number:', response.statusText);
            	throw new Error(`Failed to fetch EB Reg Number: ${response.statusText}`);
            }
    
            const data = await response.json();
            ebRegNumber = data.ebRegNumber || ebRegNumber;
        // }

		// --- Form Filling and Submission ---
		await page.type('#serviceno', consumerNumber);
		await page.type('#mob', ebRegNumber);
		await page.type('#cap', captchaText); // Use the solved CAPTCHA

		console.log('Submitting form...');

		await Promise.all([
			page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 45000 }), // Wait for navigation to complete
			page.click('#submit3') // Trigger the navigation
		]);

		console.log('Navigation complete. New Page URL:', page.url());

		if (page.url().includes('chrome-error://')) {
			console.warn('Certificate error page detected, attempting to proceed...');
			// This might not always work depending on the exact error page structure
			const proceedButton = await page.$('#proceed-button'); // Or the correct selector
			if (proceedButton) {
				await Promise.all([
					page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 45000 }),
					proceedButton.click()
				]);
			} else {
				throw new Error('Certificate error page encountered, but could not find proceed button.');
			}
		}

		const isSolar = await checkExistingSolar(page);
		if (isSolar) {
			console.log('Solar Net Metering Service found. No further action needed.');

			const { data: updateData, error: updateError } = await supabase
				.from('reports') // Ensure 'reports' table exists with 'name' (text) and 'data' (jsonb) columns
				.update({ data: { message: 'Solar Net Metering Service found. No further action needed.' } })
				.eq('id', id)
				.single();

			return json({ message: 'Solar Net Metering Service found. No further action needed.', solar: true }, { status: 200 });
		}


		const scrapedData = await extractBillData(page);

		if (scrapedData.length === 0) {
			console.log('No bill data found for the provided details.');
			// Return a specific response indicating no data, maybe 200 OK but with a message
			return json({ message: 'No bill data found.', data: [], id: undefined }, { status: 200 });
		}

		// --- Database Storage ---
		console.log('Saving data to Supabase...');
		console.log('Saving secondary data to Supabase...');
		const { data: updateData, error: updateError } = await supabase
			.from('reports') // Ensure 'reports' table exists with 'name' (text) and 'data' (jsonb) columns
			.update({ data: scrapedData })
			.eq('id', id)
			.single();

		if (updateError) {
			console.error(`Supabase update error for ID ${id}:`, updateError);
			throw new Error(`Failed to update report data column: ${updateError.message}`);
		}

		// --- Success Response ---
		return json({ data: scrapedData, id: id }, { status: 200 });
	} catch (err) {
		console.error('An error occurred during the scraping process:', err);
		let statusCode = 500;
		let message = 'An internal server error occurred during scraping.';

		return svelteKitError(statusCode, message);
	} finally {
		if (browser) {
			await browser.close();
			console.log('Browser closed.');
		}
	}
}
