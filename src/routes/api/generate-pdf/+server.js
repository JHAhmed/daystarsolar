import { dev } from '$app/environment';
import chromium from '@sparticuz/chromium';
import { supabase } from '$lib/supabaseClient.js';
import { error as svelteKitError } from '@sveltejs/kit';

const puppeteer = dev ? await import('puppeteer') : await import('puppeteer-core');

// --- Constants ---
const CHART_SELECTOR = '#chart';
const CHART_TIMEOUT = 5000; // ms

const PDF_OPTIONS = {
	format: 'A4',
	printBackground: true,
	preferCSSPageSize: true,
	margin: { top: '0', right: '0', bottom: '0', left: '0' }
};

const VIEWPORT_OPTIONS = {
	width: 1240, // A4 width at higher DPI
	height: 1754, // A4 height at higher DPI
	deviceScaleFactor: 2
};

// Default args recommended by @sparticuz/chromium
const BROWSER_ARGS_PROD = [
	...chromium.args,
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--disable-dev-shm-usage',
	'--disable-accelerated-2d-canvas',
	'--no-first-run',
	'--no-zygote',
	'--disable-gpu'
];

const BROWSER_ARGS_DEV = ['--no-sandbox', '--disable-setuid-sandbox'];

async function waitForImages(page) {
	await page.evaluate(async () => {
		const images = Array.from(document.images);
		const incompleteImages = images.filter((img) => !img.complete);
		await Promise.all(
			incompleteImages.map((img) => {
				// Handle cases where image might already be loaded or errored between filter and listener attachment
				if (img.complete) return Promise.resolve();
				return new Promise((resolve, reject) => {
					img.onload = resolve;
					img.onerror = resolve; // Resolve on error too, so we don't hang indefinitely
					// Add a timeout for safety, though less critical here as we resolve on error
					// setTimeout(() => reject(new Error(`Image timed out: ${img.src}`)), 10000);
				});
			})
		);
	});
}

export async function GET({ url, request }) {
	const id = url.searchParams.get('id');

	// --- Input Validation ---
	if (!id) {
		return svelteKitError(400, 'Missing required query parameter: id');
	}

	let browser = null; // Initialize browser outside try

	try {
		// Determine the base URL for the report page
		// Using request.url ensures it works behind proxies correctly in production
		const baseUrl = dev ? 'http://localhost:5173' : new URL(request.url).origin;
		const reportUrl = `${baseUrl}/report-view?id=${id}`;

		console.log(`Generating PDF for report ID: ${id} at URL: ${reportUrl}`);

		// --- Launch Browser ---
		const executablePath = dev ? undefined : await chromium.executablePath();
		const browserArgs = dev ? BROWSER_ARGS_DEV : BROWSER_ARGS_PROD;

		browser = await puppeteer.launch({
			args: browserArgs,
			executablePath: executablePath,
			headless: dev ? 'new' : chromium.headless // Use chromium.headless in prod
			// ignoreHTTPSErrors: true // Add if your local dev uses self-signed certs for the report page
		});

		const page = await browser.newPage();

		// --- Page Setup and Navigation ---
		await page.setViewport(VIEWPORT_OPTIONS);

		await page.goto(reportUrl, {
			waitUntil: 'networkidle2', // Keeping as per original code
			timeout: 60000 // Add a generous navigation timeout
		});
		console.log('Report page loaded.');

		// --- Wait for Dynamic Content ---
		await page.waitForSelector(CHART_SELECTOR, { timeout: CHART_TIMEOUT });
		await waitForImages(page);

		// --- Generate PDF ---
		const pdf = await page.pdf(PDF_OPTIONS);
		console.log('PDF generated successfully.');

		await page.close(); // Close the page explicitly before closing the browser

		// --- Return PDF Response ---
		return new Response(pdf, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				// Consider making filename dynamic if needed: `solar-report-${id}.pdf`
				'Content-Disposition': 'attachment; filename="Daystar Solar Report.pdf"'
			}
		});
	} catch (err) {
		// --- Centralized Error Handling ---
		console.error('Error during PDF generation:', err);
		console.error(`Error details: ${err.message}`);

		let statusCode = 500;
		let message = 'Failed to generate PDF report.';

		return svelteKitError(statusCode, `${message} (ID: ${id})`); // Include ID for context
	} finally {
		// --- Cleanup ---
		const response = await supabase.from('reports').delete().eq('id', id);

		// --- Browser Cleanup ---
		if (browser) {
			await browser.close();
			console.log('Browser closed.');
		}
	}
}
