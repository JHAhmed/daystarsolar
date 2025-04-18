// https://www.tnebltd.gov.in/usrp/applyncfa.xhtml

import { json, error as svelteKitError } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { supabase } from '$lib/supabaseClient';
import OpenAI from 'openai';
import chromium from '@sparticuz/chromium';

const puppeteer = dev ? await import('puppeteer') : await import('puppeteer-core');

const TNEB_NUMBER_URL =
	'https://www.tnebltd.gov.in/usrp/applyncfa.xhtml;jsessionid=7262FE1AA27D86843545B3AE048E4F2B';
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

async function solveCaptcha(page, openai) {
	const captchaElement = await page.waitForSelector('#nscapp\\:imgCaptchaId', {
		visible: true,
		timeout: 10000
	});
	if (!captchaElement) {
		throw new Error('CAPTCHA image element (##nscapp\\:imgCaptchaId) not found.');
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

async function extractNumber(page) {
	console.log('Looking for number in input value...');

	try {
		const xp = '::-p-xpath(/html/body/section[2]/div/div/form/div[2]/div[2]/div[2]/div/input[2])';

		await page.waitForSelector(xp, {
			timeout: 5000,
			visible: true
		});

		const inputValue = await page.evaluate(() => {
			return document.querySelector('#nscapp\\:j_idt15').value;
		});

		console.log('Number: ', inputValue);
		const data = inputValue;

		return data;
	} catch (err) {
		console.error('Error during number extraction:', err);
		throw new Error(`Failed to extract number: ${err.message}`);
	}
}

export async function GET({ url, request }) {
	const consumerNumber = url.searchParams.get('cno');
	if (!consumerNumber) {
		return svelteKitError(400, 'Missing required fields: consumerNumber');
	}

	let browser = null;
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
		await page.setDefaultNavigationTimeout(30000);
		await page.setViewport({ width: 1280, height: 800 });

		const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

		console.log(`Navigating to ${TNEB_NUMBER_URL}...`);
		await page.goto(TNEB_NUMBER_URL, { waitUntil: 'networkidle0' });

		sleep(2000);

		await page.keyboard.press('Enter');
		await sleep(1000);

		const captchaText = await solveCaptcha(page, openai);

		// --- Form Filling and Submission ---
		await page.type('#nscapp\\:acno', consumerNumber);
		await page.type('#nscapp\\:j_idt15', 'jhaclashroyale@gmail.com');
		await page.keyboard.press('Tab');
		await page.type('#nscapp\\:imgCaptchaId', captchaText);

		console.log('Submitting form...');
		// Use Promise.all for simultaneous click and navigation waiting
		await Promise.all([
			page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 45000 }), // Wait for navigation to complete
			page.click('input[name="nscapp:j_idt22"]') // Click the submit button
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

		// --- Data Extraction ---
		const scrapedData = await extractNumber(page);

		if (!scrapedData) {
			console.log('Number not found.');
			// Return a specific response indicating no data, maybe 200 OK but with a message
			return json({ message: 'No number found.', data: false }, { status: 200 });
		}

		// --- Success Response ---
		return json({ ebRegNumber: scrapedData }, { status: 200 });
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
