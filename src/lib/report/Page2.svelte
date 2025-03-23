<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

    export let data = [];

	let chartCanvas2;
	let reportContainer2;

	const consumptionUnits = data.map((entry) => parseInt(entry.consumptionUnits));
	const totalCharges = data.map((entry) => parseInt(entry.totalCharges));

	onMount(() => {
		let labels = [];
		let values = [];

		data.forEach((element) => {
			labels.push(element.formattedDate);
			values.push(element.consumptionUnits);
		});

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

	// const totalUnitsAmount = data.reduce((sum, row) => sum + row.consumptionUnits, 0);
	// const totalCostAmount = data.reduce((sum, row) => sum + row.totalCharges, 0);
	const totalUnitsAmount = 2000
	const totalCostAmount = 2000

</script>


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
		Also note how the consumption and cost peaks in the summer months.
		Massive savings can be gained once the power consumption falls
		below a certain threshold. 
	</p>

	<div class="overflow-x-auto p-2">
		<table class="min-w-full text-sm">
			<thead>
				<tr class="bg-orange-200">
					<th class="p-1 text-left">Period</th>
					<th class="p-1 text-right">No. of Units consumed</th>
					<th class="p-1 text-right">Bill Amount (Rs.)</th>
					<th class="p-1 text-right">Average Consumption (KwH)</th>
				</tr>
			</thead>
			<tbody>
				{#each data as row, i}
					<tr class={i % 2 === 0 ? 'bg-orange-100' : 'bg-orange-50'}>
						<td class="p-1">{row.formattedDate}</td>
						<td class="p-1 text-right">{row.consumptionUnits}</td>
						<td class="p-1 text-right">{row.totalCharges}</td>
						<td class="p-1 text-right">{Math.round((row.totalCharges / row.consumptionUnits * 4))}</td>
					</tr>
				{/each}
				<tr class="bg-orange-200 font-bold">
					<td class="p-1">Totals</td>
					<td class="p-1 text-right">{totalUnitsAmount}</td>
					<td class="p-1 text-right">{totalCostAmount}</td>
					<td class="p-1 text-right">---</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="grow flex flex-col">
		<div class="grow"></div>
		<p class=" border-t p-2 text-center text-sm italic">
			Registered office at H-5, Second Floor, Third Avenue, Anna Nagar East, Chennai - 600102, Tamil
			Nadu <br />
			sales@daystarsolar.co.in, +91-44-43531021
		</p>
	</div>
</div>