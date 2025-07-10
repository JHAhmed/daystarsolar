<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { logo } from '$lib';
	import { Separator } from 'bits-ui';

	// import { nameState } from '$lib/state.svelte.js';

	export let data = [];

	export let reportType = 'domestic'; // Default to domestic if not provided

	export let name = 'there!';

	let chartCanvas1;
	export let reportContainer1;

	const consumptionUnits = data.map((entry) => parseInt(entry.consumptionUnits));
	const totalCharges = data.map((entry) => parseInt(entry.totalCharges));

	const totalUnits = consumptionUnits.reduce((acc, val) => acc + val, 0);
	const totalCost = totalCharges.reduce((acc, val) => acc + val, 0);

	const perUnitCost = totalCost / totalUnits;
	const perUnitSavings = Math.ceil(totalUnits / 8);
	const yearlySavings = perUnitCost * perUnitSavings;

	const formattedAmount = `₹${yearlySavings.toLocaleString('en-IN', {
		maximumFractionDigits: 0,
		style: 'decimal'
	})}`;

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

	console.log(data);

	let avgConsumption = data.reduce((acc, val) => acc + val.consumptionUnits, 0) / data.length || 0;
	let avgKWHr = (avgConsumption / 60 / 4) * 2; // Adjusted for the average KWHr calculation

	let formattedAvgKWHr = Math.ceil(avgKWHr).toFixed(0);
</script>

<div
	id="Page1"
	bind:this={reportContainer1}
	class="reportContainer mx-auto my-12 flex h-[842pt] w-[595pt] flex-col space-y-4 p-8 text-base text-gray-800"
>
	<img src={logo} alt="logo" class="w-72 mx-auto my-5" />
	<p class="my-5 ml-auto">{currentDate}</p>

	<h1 class="text-2xl font-bold">Hey {name},</h1>
	<p class=" text-base">
		Based on our analysis, if you had switched to solar energy two years back, your savings and
		requirement would have been,
		<!-- <strong class="text-orange-400">{formattedAmount}</strong> -->
	</p>

	<!-- <p class="text-center text-5xl font-light" m-0 >
		<strong class="text-orange-400">{formattedAmount}</strong> <br>
	</p>
	<p class="uppercase text-center m-0 tracking-widest font-semibold text-lg">Total Savings</p>
	<p class=" text-base">
		And your requirement for solar is,
	</p>
	<p class="text-center text-3xl font-medium">
		<strong class="text-slate-800">{formattedAvgKWHr} kW</strong>
	</p> -->

	<div class="flex w-full flex-col items-center justify-center space-x-4 py-4 text-center">
		<div class="flex w-2/3 items-center justify-center my-2 rounded-xl border py-2 px-6 border-slate-400 ml-4 ">
			<p
				class="grow my-auto text-left text-sm font-semibold uppercase tracking-wider text-gray-700 md:text-lg"
			>
				TOTAL SAVINGS
			</p>

			<div class="flex items-center justify-center px-2">
				<span class="text-2xl font-medium text-gray-700 sm:text-3xl md:text-4xl">₹</span>
				<p
					class="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text px-1 text-3xl font-medium tracking-tight text-transparent sm:text-4xl md:text-5xl "
				>
					{formattedAmount}
				</p>
			</div>
		</div>

		<!-- <div class="h-full mt-auto  w-px bg-gray-600"></div> -->

		<!-- <Separator.Root
				orientation="vertical"
				class="bg-border my-auto shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-[80%] data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[2px]"
			  /> -->

		<div class="flex w-2/3 items-center justify-center my-2 rounded-xl border py-2 px-6 border-slate-400">
			<p
				class="grow my-auto text-left text-sm font-semibold uppercase tracking-wider text-gray-700 md:text-lg"
			>
				REQUIRED SOLAR KW
			</p>
			<div class="flex items-center justify-center px-2">
				<p
					class="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text px-1 text-3xl font-medium tracking-tight text-transparent sm:text-4xl md:text-5xl "
				>
					{formattedAvgKWHr}
				</p>
				<span class="mb-1 ml-1 mt-auto text-2xl font-medium text-gray-700 sm:text-3xl md:text-4xl"
					>kW</span
				>
			</div>
		</div>
	</div>

	<p class="">
		<!-- Please find enclosed with this letter a case study report of your premises’ energy consumption. -->
		As you will see, installation of a boundless source of free energy such as solar power will
		amount to momentous savings as shown with the help of actual data from the past 12 months in the
		case study report. 		Below is a chart detailing your consumption over the last 24 months, in {reportType ==
		'domestic'
			? 'bimonthly'
			: 'monthly'} cycles.
	</p>

	<!-- <p class="">
		Below is a chart detailing your consumption over the last 24 months, in {reportType ==
		'domestic'
			? 'bimonthly'
			: 'monthly'} cycles.
	</p> -->

	<canvas bind:this={chartCanvas1} id="chart" class=""></canvas>

	<div class="flex grow flex-col">
		<div class="grow"></div>
		<p class=" border-t p-2 text-center text-sm italic">
			Registered office at H-5, Second Floor, Third Avenue, Anna Nagar East, Chennai - 600102, Tamil
			Nadu <br />
			info@daystarsolar.co.in or +91 91766 68617/30/34/50/51/57/64
		</p>
	</div>
</div>
