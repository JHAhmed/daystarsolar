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

<div class="flex flex-col my-24 items-center">

	<!-- <h2 class="text-5xl font-semibold my-4 ">ROI Calculator</h2> -->

	<div class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-16">
		<div class="items-left flex w-full flex-col justify-center space-y-24">
			<div class="">
				<p class="text-lg font-medium">Electricty Cost Per kWh</p>
				<div class="my-2 flex space-x-4">
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
					>
	
				</Slider>
					<p class="text-sm font-medium text-black">₹10<span class="text-black/70">/kWh</span></p>
				</div>
			</div>
	
			<div class="">
				<p class="text-lg font-medium">Units Consumed Per Month</p>
				<div class="my-2 flex space-x-4">
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
				<div class="my-2 flex space-x-4">
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
	
		<div class=" h-96 w-[2px] bg-gray-300 " ></div>


		<div class="flex w-full flex-col items-center justify-center space-y-8">
			<div class="flex grow flex-col items-center justify-center space-y-8">
				<p class="text-md font-light uppercase tracking-[0.25em]">Annual Savings</p>
				<h1 class="text-8xl font-semibold">
					<span class="font-medium text-black/80">₹</span>{formatNumber(savings)}
				</h1>
			</div>
	
			<a href="/calculator" class="flex group/calc max-w-md items-center rounded-lg bg-white p-4">
				<p class="mx-8 grow tracking-tight text-xl">Advanced Calculator</p>
				<div
					class="flex cursor-pointer items-center group-hover/calc:bg-black group-hover/calc:text-white transition-all duration-100 justify-center rounded-md bg-orange-400 p-2 text-black"
				>
					<ChevronIcon strokeWidth=3 />
				</div>
			</a>
		</div>
	</div>
</div>
