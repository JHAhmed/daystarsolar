<script>
	import { onMount } from 'svelte';
	import { logo } from '$lib';
	import Chart from 'chart.js/auto';
	import html2canvas from 'html2canvas';
	import jsPDF from 'jspdf';
	import { browser } from '$app/environment';
	import { Page1, Page2, Page3, Page4 } from '$report';

	// import { dataState, nameState } from '$lib/state.svelte.js';
	import { dataOld } from '$lib/state.svelte.js';

	// let data = dataState.data;
	let data = dataOld.data;

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

                // Continue with other containers...
                html2canvas(reportContainer3, { scale: 2 }).then((canvas3) => {
                    // Similar process for third container
                    pdf.addPage();
                    const imgData3 = canvas3.toDataURL('image/png');
                    const imgHeight3 = (canvas3.height * imgWidth) / canvas3.width;
                    pdf.addImage(imgData3, 'PNG', 0, 0, imgWidth, imgHeight3);

                    html2canvas(reportContainer4, { scale: 2 }).then((canvas4) => {
                        // Similar process for fourth container
                        pdf.addPage();
                        const imgData4 = canvas4.toDataURL('image/png');
                        const imgHeight4 = (canvas4.height * imgWidth) / canvas4.width;
                        pdf.addImage(imgData4, 'PNG', 0, 0, imgWidth, imgHeight4);

                        pdf.save('report.pdf');
                    });
                });
            });
        });
    }
</script>

<div class="mx-auto flex max-w-2xl flex-col p-4 text-gray-800">
	<button on:click={downloadPDF} class="mt-6 rounded bg-blue-500 px-4 py-2 text-white">
		Download PDF
	</button>
</div>

<Page1 bind:reportContainer1={reportContainer1} data={formattedData} />
<Page2 bind:reportContainer2={reportContainer2} data={formattedData} />
<Page3 bind:reportContainer3={reportContainer3} data={formattedData} />
<Page4 bind:reportContainer4={reportContainer4} data={formattedData} />
