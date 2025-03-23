<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

    export let data = [];

	let chartCanvas3;
	let reportContainer3;

	const consumptionUnits = data.map((entry) => parseInt(entry.consumptionUnits));
	const totalCharges = data.map((entry) => parseInt(entry.totalCharges));

	onMount(() => {
		let labels = [];
		let values = [];

		data.forEach((element) => {
			labels.push(element.formattedDate);
			values.push(element.consumptionUnits);
		});

		new Chart(chartCanvas3, {
			type: 'pie',
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

</script>

<div
	bind:this={reportContainer3}
	class="mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-8 border p-8 text-base text-gray-800"
>

	<canvas bind:this={chartCanvas3} id="chart3" class=""></canvas>

	<p class="mt-auto text-sm italic">
		<strong>Standard Disclaimer:</strong> This is a computer-generated report. No warranty or responsibility
		is expressed or implied by way of Daystar Solar or its representatives. This information is property
		of Daystar Solar and not to be used for commercial purposes. This is a guideline calculation, contact
		our representatives for an exact and best estimate on your power requirements.
	</p>
</div>
