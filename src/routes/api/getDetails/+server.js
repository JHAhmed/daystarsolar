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
	'--disable-gpu',
	'--ignore-certificate-errors', // Use with caution
	'--disable-web-security', // Use with caution
	'--allow-running-insecure-content' // Use with caution
];

async function checkErrorMessage(page) {
	const errorMessage = await page.$eval(
		'div.ui-messages-error span.ui-messages-error-summary',
		(el) => el.textContent
	);

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

async function extractBillData(page) {
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
	const { fullName, consumerNumber, ebRegNumber } = await request.json();

	if (!fullName || !consumerNumber || !ebRegNumber) {
		return svelteKitError(400, 'Missing required fields: fullName, consumerNumber, ebRegNumber');
	}

	let browser = null; // Initialize browser variable

	try {
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
		await page.setDefaultNavigationTimeout(60000); // Increased timeout

		// Setting viewport might help with element visibility sometimes
		await page.setViewport({ width: 1280, height: 800 });
		// No need for setBypassCSP, setExtraHTTPHeaders unless specifically required and tested

		const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

		console.log(`Navigating to ${TNEB_BILL_STATUS_URL}...`);
		await page.goto(TNEB_BILL_STATUS_URL, { waitUntil: 'networkidle0' }); // networkidle0 might be more reliable

		sleep(500);
		const captchaText = await solveCaptcha(page, openai);
		const response = await fetch(`/api/getNumber?cno=${consumerNumber}`);

		if (!response.ok) {
			console.error('Error fetching EB Reg Number:', response.statusText);
			throw new Error(`Failed to fetch EB Reg Number: ${response.statusText}`);
		}

		const data = await response.json();
		let newEbRegNumber = data.ebRegNumber || ebRegNumber;

		// --- Form Filling and Submission ---
		await page.type('#serviceno', consumerNumber);
		await page.type('#mob', newEbRegNumber);
		await page.type('#cap', captchaText); // Use the solved CAPTCHA

		console.log('Submitting form...');
		// Use Promise.all for simultaneous click and navigation waiting
		await Promise.all([
			page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 45000 }), // Wait for navigation to complete
			page.click('#submit3') // Trigger the navigation
		]);

		console.log('Navigation complete. New Page URL:', page.url());

		// Note: The 'chrome-error' handling for certificates might not be needed
		// in production if the server environment trusts the site's cert.
		// If it *is* needed, keep it, but it's often a sign of local dev issues.
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

		// --- Data Extraction ---
		const scrapedData = await extractBillData(page);

		if (scrapedData.length === 0) {
			console.log('No bill data found for the provided details.');
			// Return a specific response indicating no data, maybe 200 OK but with a message
			return json({ message: 'No bill data found.', data: [] }, { status: 200 });
		}

		// --- Database Storage ---
		console.log('Saving data to Supabase...');
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('reports') // Ensure 'reports' table exists with 'name' (text) and 'data' (jsonb) columns
			.insert([{ name: fullName, data: scrapedData }])
			.select();

		if (supabaseError) {
			console.error('Supabase insert error:', supabaseError);
			throw new Error(`Failed to save report to database: ${supabaseError.message}`);
		}
		const id = supabaseResult[0].id;

		// --- Success Response ---
		return json({ data: scrapedData, id: id }, { status: 200 });
	} catch (err) {
		// --- Centralized Error Handling ---
		console.error('An error occurred during the scraping process:', err);

		// Log page content on error for debugging (optional, can be large)
		// if (page) {
		// 	try {
		// 		const pageContent = await page.content();
		// 		console.error("Page content on error:\n", pageContent.substring(0, 2000)); // Log first 2KB
		// 	} catch (contentError) {
		// 		console.error("Could not get page content on error:", contentError);
		// 	}
		// }

		// Provide specific error messages based on caught error type if possible
		let statusCode = 500;
		let message = 'An internal server error occurred during scraping.';

		// Use SvelteKit's error helper for standard error responses
		return svelteKitError(statusCode, message);
	} finally {
		if (browser) {
			await browser.close();
			console.log('Browser closed.');
		}
	}
}
