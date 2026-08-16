import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import OpenAI from 'openai';
import chromium from '@sparticuz/chromium';

/**
 * TNEB billing history lookup.
 *
 * This is the client's existing production integration, ported rather than
 * extended. It drives a headless browser against the TNEB consumer portal on
 * behalf of a visitor who has supplied their own consumer number.
 *
 * It is deliberately no longer the calculator's primary path:
 *  - it depends on the markup of a site nobody here controls,
 *  - it takes 10-20 seconds against a 60-second function ceiling,
 *  - and automated CAPTCHA solving is against OpenAI's usage policies, which
 *    is a commercial risk to the client independent of whether it works.
 *
 * The manual entry path covers the same ground with none of that, so any
 * failure here falls back to it rather than blocking the visitor.
 */

const BILL_STATUS_URL = 'https://www.tnebltd.gov.in/BillStatus/billstatus.xhtml';
const REGISTRATION_URL = 'https://www.tnebltd.gov.in/usrp/applyncfa.xhtml';

const BROWSER_ARGS = [
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--disable-dev-shm-usage',
	'--disable-accelerated-2d-canvas',
	'--no-first-run',
	'--no-zygote',
	'--disable-gpu'
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function launch() {
	const puppeteer = dev ? await import('puppeteer') : await import('puppeteer-core');
	return puppeteer.launch({
		args: dev ? BROWSER_ARGS : [...chromium.args, ...BROWSER_ARGS],
		executablePath: dev ? undefined : await chromium.executablePath(),
		headless: dev ? true : chromium.headless,
		acceptInsecureCerts: true
	});
}

async function readCaptcha(page, selector) {
	const element = await page.waitForSelector(selector, { visible: true, timeout: 10000 });
	if (!element) throw new Error(`CAPTCHA image (${selector}) not found.`);

	const image = await element.screenshot({ encoding: 'base64' });
	const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

	const response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		max_tokens: 40,
		messages: [
			{
				role: 'system',
				content:
					'You are a highly accurate CAPTCHA solving assistant. Return only the characters visible in the image, with no extra text or explanation.'
			},
			{
				role: 'user',
				content: [
					{ type: 'text', text: 'Extract the exact text from this CAPTCHA image.' },
					{ type: 'image_url', image_url: { url: `data:image/png;base64,${image}` } }
				]
			}
		]
	});

	const text = response.choices[0]?.message?.content?.trim();
	if (!text) throw new Error('No CAPTCHA text returned.');
	return text;
}

/** Looks up the mobile number registered against a consumer number. */
async function findRegisteredNumber(browser, consumerNumber) {
	const page = await browser.newPage();
	try {
		await page.setDefaultNavigationTimeout(30000);
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto(REGISTRATION_URL, { waitUntil: 'networkidle0' });
		await sleep(500);
		await page.keyboard.press('Enter');
		await sleep(500);

		const captcha = await readCaptcha(page, '#nscapp\\:imgCaptchaId');

		await page.type('#nscapp\\:acno', consumerNumber);
		await page.keyboard.press('Tab');
		await page.type('#nscapp\\:imgCaptchaId', captcha);

		await Promise.all([
			page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 45000 }),
			page.click('input[name="nscapp:j_idt22"]')
		]);

		return await page.evaluate(() => document.querySelector('#nscapp\\:j_idt15')?.value ?? '');
	} finally {
		await page.close().catch(() => {});
	}
}

/** True when the connection already has a solar net metering service. */
async function hasSolarService(page) {
	await page.waitForSelector('table', { visible: true, timeout: 30000 });
	const tables = await page.$$('table');

	return page.evaluate(
		(table) =>
			!!table &&
			Array.from(table.querySelectorAll('tr')).some((row) =>
				Array.from(row.querySelectorAll('td')).some((cell) =>
					cell.textContent.includes('SOLAR NET METERING SERVICE')
				)
			),
		tables[5]
	);
}

async function extractBills(page) {
	await page.waitForSelector('table.ccbills', { visible: true, timeout: 30000 });
	const tables = await page.$$('table.ccbills');

	return page.evaluate((table) => {
		if (!table) return [];

		return Array.from(table.querySelectorAll('tr[bgcolor="#FFFFFF"], tr[bgcolor="#fff6cc"]'))
			.slice(0, -1)
			.map((row) => {
				const cells = row.querySelectorAll('td');
				return {
					assessmentDate: cells[0]?.innerText.trim() ?? '',
					consumptionUnits: cells[7]?.innerText.trim() ?? '',
					totalCharges: cells[14]?.innerText.trim() ?? ''
				};
			})
			.filter((row) => row.consumptionUnits && row.totalCharges);
	}, tables[1]);
}

/**
 * @param {string} consumerNumber
 * @returns {Promise<{ readings: Array, solar: boolean }>}
 */
export async function fetchBillingHistory(consumerNumber) {
	let browser;

	try {
		browser = await launch();

		const registeredNumber = await findRegisteredNumber(browser, consumerNumber);
		if (!registeredNumber) throw new Error('Could not determine the registered mobile number.');

		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(60000);
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto(BILL_STATUS_URL, { waitUntil: 'networkidle0' });
		await sleep(500);

		const captcha = await readCaptcha(page, '#imgCaptchaId');

		await page.type('#serviceno', consumerNumber);
		await page.type('#mob', registeredNumber);
		await page.type('#cap', captcha);

		await Promise.all([
			page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 45000 }),
			page.click('#submit3')
		]);

		if (await hasSolarService(page)) {
			return { readings: [], solar: true };
		}

		return { readings: await extractBills(page), solar: false };
	} finally {
		// Always closed, including on the throw paths above — a leaked browser
		// holds the whole function's memory until the platform reaps it.
		await browser?.close().catch(() => {});
	}
}
