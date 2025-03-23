<script>
	import { onMount } from 'svelte';
	import { logo } from '$lib';
	import Chart from 'chart.js/auto';
	import html2canvas from 'html2canvas';
	import jsPDF from 'jspdf';

	// import { nameState } from '$lib/state.svelte.js';

    export let data = [];
	// let name = nameState.name;
	let name = 'nameState.name';

	let chartCanvas1;
	let reportContainer1;

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
			labels.push(element.formattedDate);
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

	});

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

<div
	bind:this={reportContainer1}
	class="mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-8 border p-8 text-base text-gray-800"
>
	<img src={logo} alt="logo" class="mx-auto my-8 h-20" />
	<p class="my-8 ml-auto">{currentDate}</p>

	<h1 class="text-2xl font-bold">Hey {name},</h1>
	<p class=" text-base">
		Based on our analysis, if you had switched to solar energy two years back, you could have saved
		<strong class="text-orange-400">₹{yearlySavings.toFixed(0)}</strong> 
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

	<div class="grow flex flex-col">
		<div class="grow"></div>
		<p class=" border-t p-2 text-center text-sm italic">
			Registered office at H-5, Second Floor, Third Avenue, Anna Nagar East, Chennai - 600102, Tamil
			Nadu <br />
			sales@daystarsolar.co.in, +91-44-43531021
		</p>
	</div>
</div>


