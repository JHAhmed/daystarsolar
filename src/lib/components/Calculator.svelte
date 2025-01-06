<script>
	import { ChevronIcon } from '$icons';
	import { Slider } from '$lib/components/ui/slider/index.js';

	// let cost = 5;
	let cost = $state(5);
	let units = $state(50);
	let ac = $state(1);
	// let savings = 35000;

	let savings = $derived(cost * units * 10 + ac * 3000);

	function formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}

	function onSliderChange(e, value) {
		if (value === 'cost') {
			cost = e;
		} else if (value === 'units') {
			units = e;
		} else if (value === 'ac') {
			ac = e;
		}

		console.log(savings);
		// savings = (cost * units) + ac * 5000;
	}
</script>

<div class="my-24 grid w-full grid-cols-2 rounded-xl bg-blue-100 p-16">
	<div class="items-left flex w-full flex-col justify-center space-y-16">
		<div class="">
			<p class="text-lg font-medium">Electricty Cost Per kWh</p>
			<div class="my-2 flex space-x-2">
				<p class="text-sm font-medium text-black">₹1<span class="text-black/70">/kWh</span></p>
				<Slider
					value={[5]}
					min={1}
					max={10}
					step={1}
					class="max-w-[70%]"
					onValueChange={(e) => {
						onSliderChange(e, 'cost');
					}}
				></Slider>
				<p class="text-sm font-medium text-black">₹10<span class="text-black/70">/kWh</span></p>
			</div>
		</div>

		<div class="">
			<p class="text-lg font-medium">Units Consumed Per Month</p>
			<div class="my-2 flex space-x-2">
				<p class="text-sm font-medium text-black">50 <span class="text-black/70">kWh</span></p>
				<Slider
					value={[150]}
					min={50}
					max={500}
					step={25}
					class="max-w-[70%]"
					onValueChange={(e) => {
						onSliderChange(e, 'units');
					}}
				></Slider>
				<p class="text-sm font-medium text-black">500 <span class="text-black/70">kWh</span></p>
			</div>
		</div>

		<div class="">
			<p class="text-lg font-medium">No. Of AC Units</p>
			<div class="my-2 flex space-x-2">
				<p class="text-sm font-medium text-black">1 <span class="text-black/70">AC</span></p>
				<Slider
					value={[3]}
					min={0}
					max={10}
					step={1}
					class="max-w-[70%]"
					onValueChange={(e) => {
						onSliderChange(e, 'ac');
					}}
				></Slider>
				<p class="text-sm font-medium text-black">10 <span class="text-black/70">AC</span></p>
			</div>
		</div>
	</div>

	<div class="flex w-full flex-col items-center justify-center space-y-4">
		<div class="flex grow flex-col items-center justify-center space-y-4">
			<p class="text-md font-light uppercase tracking-[0.25em]">Annual Savings</p>
			<h1 class="text-8xl font-semibold">
				<span class="font-medium text-black/80">₹</span>{formatNumber(savings)}
			</h1>
		</div>

		<div class="flex max-w-md items-center rounded-lg bg-white p-2">
			<p class="mx-8 grow tracking-tight">Advanced Calculator</p>
			<button
				class="flex cursor-pointer items-center justify-center rounded-md bg-black p-2 text-white"
			>
				<ChevronIcon />
			</button>
		</div>
	</div>
</div>
