import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import chromium from '@sparticuz/chromium';

export const config = { maxDuration: 60 };

const PDF_OPTIONS = {
	format: 'A4',
	printBackground: true,
	preferCSSPageSize: true,
	margin: { top: '0', right: '0', bottom: '0', left: '0' }
};

const VIEWPORT = { width: 1240, height: 1754, deviceScaleFactor: 2 };

const BROWSER_ARGS = [
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--disable-dev-shm-usage',
	'--disable-accelerated-2d-canvas',
	'--no-first-run',
	'--no-zygote',
	'--disable-gpu'
];

/** Waits for every image to settle, so the logo is never missing from page 1. */
async function waitForImages(page) {
	await page.evaluate(async () => {
		await Promise.all(
			Array.from(document.images)
				.filter((img) => !img.complete)
				.map(
					(img) =>
						new Promise((resolve) => {
							img.onload = resolve;
							// Resolve on error too — a broken image should not hang the render.
							img.onerror = resolve;
						})
				)
		);
	});
}

export async function GET({ url, request }) {
	const id = url.searchParams.get('id');
	if (!id) error(400, 'Missing required query parameter: id');

	const origin = dev ? url.origin : new URL(request.url).origin;
	const target = `${origin}/report-view?id=${encodeURIComponent(id)}`;

	let browser;

	try {
		const puppeteer = dev ? await import('puppeteer') : await import('puppeteer-core');

		// In production the bundled Chromium is used. Locally, puppeteer's own
		// download is used unless PUPPETEER_EXECUTABLE_PATH points at an
		// installed Chrome — which avoids a 150MB download just to render a PDF.
		const executablePath = dev
			? (env.PUPPETEER_EXECUTABLE_PATH ?? undefined)
			: await chromium.executablePath();

		browser = await puppeteer.launch({
			args: dev ? BROWSER_ARGS : [...chromium.args, ...BROWSER_ARGS],
			executablePath,
			headless: dev ? true : chromium.headless
		});

		const page = await browser.newPage();
		await page.setViewport(VIEWPORT);
		await page.goto(target, { waitUntil: 'networkidle2', timeout: 45000 });

		// #chart only exists once the first Chart.js instance has mounted.
		await page.waitForSelector('#chart', { timeout: 15000 });
		await waitForImages(page);

		const pdf = await page.pdf(PDF_OPTIONS);

		return new Response(pdf, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="Daystar Solar Report.pdf"'
			}
		});
	} catch (err) {
		console.error(`PDF generation failed for report ${id}:`, err);
		error(500, 'Failed to generate PDF report.');
	} finally {
		// The old version deleted the report row in this finally block, so
		// downloading the PDF destroyed the report and any second download —
		// or a refresh of the report page — 404'd.
		await browser?.close().catch(() => {});
	}
}
