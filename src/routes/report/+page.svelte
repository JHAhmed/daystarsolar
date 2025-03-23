<script>
	import { onMount } from 'svelte';
	import { logo } from '$lib';
	import Chart from 'chart.js/auto';
	import html2canvas from 'html2canvas';
	import jsPDF from 'jspdf';

	import { Page1, Page2, Page3 } from '$report';

	// import { dataState, nameState } from '$lib/state.svelte.js';
	import { dataOld } from '$lib/state.svelte.js';

	// let data = dataState.data;
	let data = dataOld.data;

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

	function downloadPDF() {
		const pdf = new jsPDF('p', 'pt', 'a4'); // A4 page size (595pt x 842pt)

		// First container
		html2canvas(reportContainer1, { scale: 2 }).then((canvas1) => {
			const imgData1 = canvas1.toDataURL('image/png');
			const imgWidth = 595;
			const imgHeight = (canvas1.height * imgWidth) / canvas1.width;

			pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight);

			// Second container
			html2canvas(reportContainer2, { scale: 2 }).then((canvas2) => {
				const imgData2 = canvas2.toDataURL('image/png');

				pdf.addPage(); // Add a new page for the second div
				pdf.addImage(imgData2, 'PNG', 0, 0, imgWidth, imgHeight);

				pdf.save('report.pdf');
			});
		});
	}
</script>

<div class="mx-auto flex max-w-2xl flex-col p-4 text-gray-800">
	<button on:click={downloadPDF} class="mt-6 rounded bg-blue-500 px-4 py-2 text-white">
		Download PDF
	</button>
</div>

<Page1 data={formattedData} />
<Page2 data={formattedData} />
<Page3 data={formattedData} />
