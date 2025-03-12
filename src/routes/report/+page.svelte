<script>
	import { onMount } from 'svelte';
	import { logo } from '$lib';
	import Chart from 'chart.js/auto';
	import html2canvas from 'html2canvas';
	import jsPDF from 'jspdf';

	import { dataState, nameState } from '$lib/state.svelte.js';

	let data = dataState.data;
	let name = nameState.name;
	let savings = '2,500';
	let roiMonths = '24';

	// console.log(data);

	let chartCanvas1;
	let chartCanvas2;
	let reportContainer1;
	let reportContainer2;

	const consumptionUnits = data.map((entry) => parseInt(entry.consumptionUnits));
	const totalCharges = data.map((entry) => parseInt(entry.totalCharges));

	const totalUnits = consumptionUnits.reduce((acc, val) => acc + val, 0);
	const totalCost = totalCharges.reduce((acc, val) => acc + val, 0);

	const perUnitCost = totalCost / totalUnits;
	const perUnitSavings = Math.ceil(totalUnits / 8);
	const yearlySavings = perUnitCost * perUnitSavings;

	onMount(() => {
		let labels = [];
		let values = [];

		data.forEach((element) => {
			labels.push(element.assessmentDate);
			values.push(element.consumptionUnits);
		});

		new Chart(chartCanvas1, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Electricity Usage (Units)',
						data: values,
						backgroundColor: 'rgba(75, 192, 192, 0.5)'
					}
				]
			}
		});

		const consumptionUnits = data.map((entry) => parseInt(entry.consumptionUnits));
		const totalCharges = data.map((entry) => parseInt(entry.totalCharges));

		new Chart(chartCanvas2, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Total units bi-monthly',
						data: consumptionUnits,
						backgroundColor: 'rgba(54, 162, 235, 0.6)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1
					},
					{
						label: 'Total cost bi-monthly',
						data: totalCharges,
						backgroundColor: 'rgba(255, 99, 132, 0.6)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
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

	function formatDate(date) {
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'long' });
		const year = date.getFullYear();

		const suffix =
			day % 10 === 1 && day !== 11
				? 'st'
				: day % 10 === 2 && day !== 12
					? 'nd'
					: day % 10 === 3 && day !== 13
						? 'rd'
						: 'th';

		return `${day}${suffix} ${month} ${year}`;
	}

	let currentDate = formatDate(new Date());
</script>

<div class="mx-auto flex max-w-2xl flex-col p-4 text-gray-800">
	<button on:click={downloadPDF} class="mt-6 rounded bg-blue-500 px-4 py-2 text-white">
		Download PDF
	</button>
</div>

<div
	bind:this={reportContainer1}
	class="mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-8 border p-8 text-base text-gray-800"
>
	<img src={logo} alt="logo" class="mx-auto my-12 h-20" />
	<p class="my-8 ml-auto">{currentDate}</p>

	<h1 class="text-2xl font-bold">Hey {name},</h1>
	<p class=" text-base">
		Based on our analysis, you could have saved
		<strong class="text-orange-400">₹{yearlySavings.toFixed(0)}</strong> every year if you had
		switched to solar energy. By switching to solar now, you can begin seeing a Return On Investment
		in
		<strong>{roiMonths} months</strong>.
	</p>
	<p class="">
		Please find enclosed with this letter a case study report of your premises’ energy consumption.
		As you will see, installation of a boundless source of free energy such as solar power will
		amount to momentous savings as shown with the help of actual data from the past 12 months in the
		case study report.
	</p>

	<p class="">
		Below is a chart detailing your consumption over the last 24 months, in bimonthly cycles.
	</p>
	<canvas bind:this={chartCanvas1} id="chart" class=""></canvas>
	<!-- <p class="">Notice how the chart has a noticable </p> -->
</div>

<div
	bind:this={reportContainer2}
	class="mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-8 border p-8 text-base text-gray-800"
>
	<p class="">
		Below is a comparison of power consumption in KwH (units) versus the cost incurred. Notice how
		cost increases a lot more in relation to a small increase in consumption.
	</p>
	<canvas bind:this={chartCanvas2} id="chart2" class=""></canvas>

	<p class="grow">
		It is important to note that massive savings can be gained once the power consumption falls
		below a certain threshold. Unlimited clean renewable energy does just that; solar power would be
		generated so that the net consumption comes down drastically thereby accruing to momentous
		savings.
	</p>

	<p class="mt-auto text-sm italic">
		<strong>Standard Disclaimer:</strong> This is a computer-generated report. No warranty or responsibility
		is expressed or implied by way of Daystar Solar or its representatives. This information is property
		of Daystar Solar and not to be used for commercial purposes. This is a guideline calculation, contact
		our representatives for an exact and best estimate on your power requirements.
	</p>
</div>
