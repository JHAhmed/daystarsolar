<script>
	import { ChevronIcon } from '$icons';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import { UnitToggle } from '$components';

	// let cost = 5;
	let cost = $state(10000);
	let units = $state(10);
	let type = $state('domestic');
	let cycle = $state('bimonthly');
	// let savings = 35000;

	

	let sliderValues = $derived.by(() => {

		let min = 0;
		let max = 0;
		let step = 0;
		let value = 0;

		if (type === 'domestic') {
			min = 6000;
			max = 50000;
			step = 2000;
			value = 10000;
		} else if (type === 'commercial') {
			min = 15000;
			max = 100000;
			step = 5000;
			value = 50000;
		} else if (type === 'industrial') {
			min = 50000;
			max = 500000;
			step = 20000;
			value = 100000;
		}
			return { min: min, max: max, step: step, value: value };
		}
	);
	
	let savings = $derived.by(() => {

		let unitCost = 0;
		if (type === 'domestic') {
			unitCost = 11;
		} else if (type === 'commercial') {
			unitCost = 10;
		} else if (type === 'industrial') {
			unitCost = 8;
		}

		let days = cycle === 'bimonthly' ? 60 : 30;

		let costPerDay = (cost / days)	;

		// let unitPerDay = Math.ceil(units / 4);
		// let costPerDay = cost * unitPerDay;
		// let total = costPerDay * 365;
		// console.log(total);
		return Math.round(costPerDay * 100);
	}
	);

	function formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}

	function onToggleChange(e, value) {
		// if (value === 'bimonthly') {
		// 	console.log('bimonthly');
		// } else if (value === 'monthly') {
		// 	console.log('monthly');
		// }
		type = e;
	}

	function onSliderChange(e, value) {
		if (value === 'cost') {
			cost = e;
		} else if (value === 'units') {
			units = e;
		}

		console.log(savings);
	}
</script>

<div class="flex flex-col my-12 items-center">

	<h2 class="text-2xl leading-tight tracking-[-0.06em] md:text-3xl lg:text-4xl">Maximize Your Savings – Calculate Your Benefits Instantly</h2>

	<!-- <div class="flex w-full items-center justify-center rounded-xl bg-gray-100 p-16">
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
	</div> -->

	<div class="grid w-full grid-cols-1 md:grid-cols-2 gap-8 p-16">

		<div class="items-left flex w-full flex-col rounded-xl justify-center bg-gray-100 border-2 border-black p-12 space-y-20">
			<div class="flex items-center justify-center">
				<UnitToggle
				onUnitChange={(e) => {console.log(e);}}
				triggers={{'bimonthly': 'Bimonthly', 'monthly': 'Monthly' }}
				className="w-full"
				/>

			</div>
	
			<!-- <div class="">
				<p class="text-lg font-medium">Cost per Unit</p>
				<div class="my-2 flex space-x-4">
					<p class="text-sm font-medium text-black">₹6<span class="text-black/70"></span></p>
					<Slider
						value={[10]}
						min={6}
						max={20}
						step={1}
						class="max-w-[70%]"
						onValueChange={(e) => {
							onSliderChange(e, 'cost');
						}}
					></Slider>
					<p class="text-sm font-medium text-black">₹20<span class="text-black/70"></span></p>
				</div>
			</div> -->

			<div class="">
				<!-- <p class="text-lg font-medium">Consumer Type</p> -->
				<div class="my-2 flex space-x-4">
					<div class="flex items-center justify-center">
						<UnitToggle
						text="Consumer Type"
						onUnitChange={(e) => {
							onToggleChange(e, 'type');
						}}
						triggers={{'domestic': 'Domestic', 'commercial': 'Commercial', 'industrial': 'Industrial' }}
						className="w-full"
						/>
		
					</div>
				</div>
			</div>

			<div class="">
				<p class="text-lg font-medium">Bill Amount Per Cycle</p>
				<div class="my-2 flex space-x-4">
					<!-- <p class="text-sm font-medium text-black">4 <span class="text-black/70">Units</span></p> -->
					<Slider
						value={[sliderValues.value]}
						min={sliderValues.min}
						max={sliderValues.max}
						step={sliderValues.step}
						class="max-w-[70%]"
						onValueChange={(e) => {
							onSliderChange(e, 'cost');
						}}
					></Slider>
					<p class="text-md font-medium text-black">= <span class="text-black/80">{cost}</span></p>
				</div>
			</div>
		</div>
	
		<div class="flex w-full flex-col items-center rounded-xl justify-center bg-gray-100 p-16 space-y-8 border-2 border-orange-400">
			<div class="flex grow flex-col items-center justify-center space-y-8">
				<p class="text-md font-light uppercase tracking-[0.25em]">Annual Savings</p>
				<h1 class="text-8xl font-semibold text-transparent bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text" >
					<span class="font-medium text-black/80">₹</span>{formatNumber(savings)}
				</h1>
			</div>
	
			<p class="text-xl leading-tight tracking-[-0.06em] md:text-xl lg:text-2xl">Get A Detailed Report With One Click!</p>

			<a id="advanced-calculator-button" data-umami-event="Advanced Calculator Button" href="/calculator" class="flex group/calc max-w-md items-center rounded-lg bg-white p-4 shadow-soft">
				<p class="mx-8 grow tracking-tight text-xl">Advanced Calculator</p>
				<div
					class="flex cursor-pointer items-center group-hover/calc:bg-black group-hover/calc:text-white  transition-all duration-100 justify-center rounded-md bg-orange-400 p-2 text-black"
				>
					<ChevronIcon strokeWidth=3 />
				</div>
			</a>
		</div>

	</div>
</div>
