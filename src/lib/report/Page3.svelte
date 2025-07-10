<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data = [];

	let chartCanvas3;
	let chartCanvas4;
	
	export let reportContainer3;

    if (data.length % 2 !== 0) data.pop();

    let mid = data.length / 2;
    let data1 = data.slice(0, mid);
    let data2 = data.slice(mid);

	function formatNumber(num) {
		const numStr = Math.floor(num).toString();

		if (numStr.length <= 3) return numStr;

		let lastThree = numStr.substring(numStr.length - 3);
		let remaining = numStr.substring(0, numStr.length - 3);

		remaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

		return remaining + ',' + lastThree;
	}

	function analyzeData(dataset) {
		return dataset.reduce(
			(acc, val) => {
				acc.peak = val.consumptionUnits > acc.peak.consumptionUnits ? val : acc.peak;
				acc.min = val.consumptionUnits < acc.min.consumptionUnits ? val : acc.min;
				acc.totalConsumption += val.consumptionUnits;
				acc.totalCost += val.totalCharges;
				return acc;
			},
			{
				peak: dataset[0] || { consumptionUnits: -Infinity },
				min: dataset[0] || { consumptionUnits: Infinity },
				totalConsumption: 0,
				totalCost: 0
			}
		);
	}

	let stats1 = analyzeData(data1);
	let stats2 = analyzeData(data2);

	let avgConsumption1 = stats1.totalConsumption / data1.length || 0;
	let avgConsumption2 = stats2.totalConsumption / data2.length || 0;
	let avgCost1 = stats1.totalCost / data1.length || 0;
	let avgCost2 = stats2.totalCost / data2.length || 0;

	let peakMonth1 = stats1.peak;
	let peakMonth2 = stats2.peak;
	let minMonth1 = stats1.min;
	let minMonth2 = stats2.min;

	// let avgKWHr = (avgConsumption1 + avgConsumption2) / 60 / 4;

	let avgConsumption = data.reduce((acc, val) => acc + val.consumptionUnits, 0) / data.length || 0;
	let avgKWHr = (avgConsumption / 60 / 4) * 2;

	onMount(() => {
		let labels = [];
		let values = [];

		data.forEach((element) => {
			labels.push(element.formattedDate);
			values.push(element.consumptionUnits);
		});

		let labels1 = labels.slice(0, labels.length / 2);
		let values1 = values.slice(0, labels.length / 2);

		let labels2 = labels.slice(labels.length / 2);
		let values2 = values.slice(labels.length / 2);

		new Chart(chartCanvas3, {
			type: 'pie',
			options: {
				animation: false
			},
			data: {
				labels: labels1,
				datasets: [
					{
						label: 'Electricity Usage (Units)',
						data: values1,
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(153, 102, 255)',
							'rgb(255, 159, 64)'
						]
					}
				]
			}
		});

		new Chart(chartCanvas4, {
			type: 'pie',
			options: {
				animation: false
			},
			data: {
				labels: labels2,
				datasets: [
					{
						label: 'Electricity Usage (Units)',
						data: values2,
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(153, 102, 255)',
							'rgb(255, 159, 64)'
						]
					}
				]
			}
		});
	});
</script>

<div
	id="Page3"
	bind:this={reportContainer3}
	class="reportContainer mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-8 p-8 text-base text-gray-800"
>
	<p>
		The data consists of energy consumption during the past 24 months. The aim of this table is to
		show the power requirement (Consumption in kilowatt per hour) of the premises during the past
		two year period. As this parameter varies depending on many factors such as climate, holidays,
		religious festivals, power efficiency of electrical appliances used etc, we can calculate an
		average of <strong>{avgKWHr.toFixed(1)} KW/Hr</strong> over past two years as the minimum power requirement
		of the premises to reduce power consumption by 100% as of the last billing cycle.
	</p>

	<div class="flex">
		<div class="flex w-1/2 flex-col items-center justify-center">
			<canvas bind:this={chartCanvas3} id="chart3" class=""></canvas>

			<p class="mx-auto my-8 text-left">
				Max Consumption: <strong>{peakMonth1.consumptionUnits}</strong> Units <br />
				Min Consumption: <strong>{minMonth1.consumptionUnits}</strong> Units <br />
				Avg Consumption: <strong>{avgConsumption1.toFixed(0)}</strong> Units <br />
				Avg Cost: <strong>₹{formatNumber(avgCost1.toFixed(0))}</strong> <br />
				Avg Cost w/ Solar: <strong>₹{formatNumber((avgConsumption1 * 4).toFixed(0))}</strong>
			</p>
		</div>
		<div class="flex w-1/2 flex-col items-center justify-center">
			<canvas bind:this={chartCanvas4} id="chart4" class=""></canvas>

			<p class="mx-auto my-8 text-left">
				Max Consumption: <strong>{peakMonth2.consumptionUnits}</strong> Units <br />
				Min Consumption: <strong>{minMonth2.consumptionUnits}</strong> Units <br />
				Avg Consumption: <strong>{avgConsumption2.toFixed(0)}</strong> Units <br />
				Avg Cost: <strong>₹{formatNumber(avgCost2.toFixed(0))}</strong> <br />
				Avg Cost w/ Solar: <strong>₹{formatNumber((avgConsumption2 * 4).toFixed(0))}</strong>
			</p>
		</div>
	</div>

	<p class="">
		Note how the electricy usage peaks in the months of <strong>{peakMonth1.formattedDate}</strong>
		and <strong>{peakMonth2.formattedDate}</strong>.
	</p>

	<p class="">Kindly find the conclusion and recommendation on the next page!</p>

	<div class="flex grow flex-col">
		<div class="grow"></div>

		<p class=" border-t p-2 text-center text-sm italic">
			Registered office at H-5, Second Floor, Third Avenue, Anna Nagar East, Chennai - 600102, Tamil
			Nadu <br />
			info@daystarsolar.co.in or +91 91766 68617/30/34/50/51/57/64
		</p>
	</div>
</div>
