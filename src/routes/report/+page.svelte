<script>
	import { Page1, Page2, Page3, Page4 } from '$lib/report';
	import { dataState } from '$lib/state.svelte.js'; // Real data for prod
	import { dataOld } from '$lib/state.svelte.js'; // Dummy data for testing
	import { dev } from '$app/environment';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let data;
	let userName = data.report.name;
	let reportId= data.report.id;
	data = data.report.data;

	let isGeneratingPDF = false;

	let reportContainer1;
	let reportContainer2;
	let reportContainer3;
	let reportContainer4;

	data.forEach((entry) => {
		entry.consumptionUnits = parseInt(entry.consumptionUnits);
		entry.totalCharges = parseInt(entry.totalCharges);
	});

	function formatDateToMonthRange(dateString) {
		dateString === '' ? (dateString = '01/01/1970') : dateString;
		const [day, month, year] = dateString.split('/').map((part) => parseInt(part, 10));
		const currentMonth = new Date(year, month - 3, 1).toLocaleString('en-US', { month: 'short' });
		const nextMonth = new Date(year, month - 2, 1).toLocaleString('en-US', { month: 'short' });
		return `${currentMonth}-${nextMonth} ${year}`;
	}

	const formattedData = data.map((entry) => {
		return {
			...entry,
			formattedDate: formatDateToMonthRange(entry.assessmentDate)
		};
	});

	async function downloadPDF() {
		try {
			isGeneratingPDF = true;

			// Make a request to the server-side PDF generation endpoint
			const response = await fetch(`/api/generate-pdf?id=${reportId}`);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`PDF generation failed: ${errorData.error || 'Unknown error'}`);
			}

			// Get the PDF as a blob
			const blob = await response.blob();

			// Create a download link and trigger the download
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'solar-report.pdf';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading PDF:', error);
			alert('Failed to generate PDF. Please try again.');
		} finally {
			isGeneratingPDF = false;
		}
	}
</script>

<div class="mx-auto flex max-w-2xl flex-col p-4 text-gray-800">
	<button
		on:click={downloadPDF}
		class="mt-6 rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
		disabled={isGeneratingPDF}
	>
		{isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
	</button>
</div>

<div class="font-report">
	<Page1 bind:reportContainer1 data={formattedData} name={userName} />
	<Page2 bind:reportContainer2 data={formattedData} />
	<Page3 bind:reportContainer3 data={formattedData} />
	<Page4 bind:reportContainer4 data={formattedData} />
</div>
