import puppeteer from 'puppeteer';

export async function GET({ request }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load your SvelteKit route or static HTML file
    await page.goto('http://localhost:3000/report', { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,   // Ensures Tailwind colors and backgrounds are retained
        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
    });

    await browser.close();

    return new Response(pdf, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Solar_Report.pdf"'
        }
    });
}
