import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

let puppeteer;

if (dev) {
	puppeteer = await import('puppeteer');
} else {
	puppeteer = await import('puppeteer-core');
}

export async function GET({ url, request }) {
	let browser = null;
	const id = url.searchParams.get('id');

	try {
		// Get the base URL for the application
		const baseUrl = dev
			? 'http://localhost:5173' // Development server
			: new URL(request.url).origin; // Production server

		// Launch a headless browser
		browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		const page = await browser.newPage();

		// Set viewport to match A4 size with higher resolution for better quality
		await page.setViewport({
			width: 1240, // ~595pt at higher resolution
			height: 1754, // ~842pt at higher resolution
			deviceScaleFactor: 2
		});

		// Navigate to the report page
		await page.goto(`${baseUrl}/report-view?id=${id}`, {
			waitUntil: 'networkidle2' // Wait until network is idle
		});

		// Wait for charts to render
		await page.waitForSelector('#chart', { timeout: 5000 });

		// Wait for all images to load
		await page.evaluate(() => {
			return Promise.all(
				Array.from(document.images)
					.filter((img) => !img.complete)
					.map(
						(img) =>
							new Promise((resolve) => {
								img.onload = img.onerror = resolve;
							})
					)
			);
		});

		// Generate PDF
		const pdf = await page.pdf({
			format: 'A4',
			printBackground: true,
			preferCSSPageSize: true,
			margin: { top: '0', right: '0', bottom: '0', left: '0' }
		});

		// Return the PDF
		return new Response(pdf, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="solar-report.pdf"'
			}
		});
	} catch (error) {
		console.error('PDF generation error:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} finally {
		if (browser) {
			await browser.close();
		}
	}
}
