// src/lib/pdfGenerator.js
import { browser } from '$app/environment';

export async function downloadPDF() {
	if (!browser) return;

	try {
		// Call your server endpoint
		const response = await fetch('/api/generate-pdf', {
			method: 'POST'
		});

		if (!response.ok) {
			throw new Error('PDF generation failed');
		}

		// Download the generated PDF
		const pdfBlob = await response.blob();
		const url = URL.createObjectURL(pdfBlob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'report.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error generating PDF:', error);
	}
}
