<script>
	import { ChevronIcon } from '$icons';

	let monthlyBill = 10000; 
	let consumerType = 'domestic'; 
	let electricityRate = 8; 

	$: annualSavings = calculateSavings(
		monthlyBill,
		consumerType,
		electricityRate
	);

	function calcualteKW(bill, type, rate) {

		// KW Needed = (Monthly electricity bill in ₹) / (Electricity rate ₹/kWh × Avg. solar generation per kW per month)
		// kwneeded = bill / (rate * 120)

		if (type === 'domestic') {
			rate = 11;
		} else if (type === 'commercial') {
			rate = 10;
		} else if (type === 'industrial') {
			rate = 8;
		}

		let kwneeded = bill / (rate * 120)
		return Math.round(kwneeded);
	}

	function calculateSavings(bill, type, rate) {

		if (type === 'domestic') {
			rate = 11;
		} else if (type === 'commercial') {
			rate = 10;
		} else if (type === 'industrial') {
			rate = 8;
		}

		let units = bill / rate;

		let cycle = type === 'domestic' ? 6 : 12;
		let annualSavings = units * rate * cycle;

		return Math.round(annualSavings);
	}

	function formatIndianNumber(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
</script>

<div class="mx-auto w-full max-w-7xl p-2 sm:p-3 md:p-4">
	<div class="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:flex-row">
		<!-- Left side - Options and controls -->
		<div class="w-full rounded-lg border-2 border-black p-4 sm:p-6 md:p-8 lg:p-12 bg-white tracking-tight shadow-sm space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 lg:w-1/2">
			<h2 class="text-xl sm:text-2xl font-medium text-gray-800">Solar Savings Calculator</h2>

			<!-- Monthly Electricity Bill -->
			<div class="">
				<label for="electricity-bill" class="mb-1 sm:mb-2 block font-medium text-gray-700 text-sm sm:text-base"
					>Electricity Bill (₹)</label
				>
				<input
					id="electricity-bill"
					type="range"
					min="5000"
					max="30000"
					step="1000"
					bind:value={monthlyBill}
					class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
				/>
				<div class="mt-1 flex justify-between">
					<span class="text-xs sm:text-sm text-gray-500">₹5,000</span>
					<span class="text-xs sm:text-sm font-medium text-blue-600">₹{formatIndianNumber(monthlyBill)}</span>
					<span class="text-xs sm:text-sm text-gray-500">₹30,000</span>
				</div>
			</div>

			<!-- Consumer Type -->
			<div class="">
				<label for="consumer-type" class="mb-1 sm:mb-2 block font-medium text-gray-700 text-sm sm:text-base"
					>Type of Consumer</label
				>
				<div id="consumer-type" class="grid grid-cols-3 gap-1 sm:gap-2">
					<button
						class={`rounded-md px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm transition ${consumerType === 'domestic' ? 'border border-blue-300 bg-blue-100 text-blue-700' : 'border border-gray-200 bg-gray-100 text-gray-700'}`}
						on:click={() => (consumerType = 'domestic')}
					>
						Domestic
					</button>
					<button
						class={`rounded-md px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm transition ${consumerType === 'commercial' ? 'border border-blue-300 bg-blue-100 text-blue-700' : 'border border-gray-200 bg-gray-100 text-gray-700'}`}
						on:click={() => (consumerType = 'commercial')}
					>
						Commercial
					</button>
					<button
						class={`rounded-md px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm transition ${consumerType === 'industrial' ? 'border border-blue-300 bg-blue-100 text-blue-700' : 'border border-gray-200 bg-gray-100 text-gray-700'}`}
						on:click={() => (consumerType = 'industrial')}
					>
						Industrial
					</button>
				</div>
			</div>

			<!-- Electricity Rate - Commented out as in original code -->
			<!-- <div class="mb-6">
				<label for="electricity-cost" class="mb-2 block font-medium text-gray-700"
					>Electricity Rate (₹ per unit)</label
				>
				<input
					id="electricity-cost"
					type="range"
					min="5"
					max="15"
					step="0.5"
					bind:value={electricityRate}
					class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
				/>
				<div class="mt-1 flex justify-between">
					<span class="text-sm text-gray-500">₹5</span>
					<span class="text-sm font-medium text-blue-600">₹{electricityRate}</span>
					<span class="text-sm text-gray-500">₹15</span>
				</div>
			</div> -->

		</div>

		<!-- Right side - Results -->
		<div class="flex w-full flex-col items-center justify-center rounded-lg border-2 border-orange-400 bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 lg:w-1/2">
			<div class="text-center">
				<p class="mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wider text-gray-600">ANNUAL SAVINGS</p>
				<div class="flex items-center justify-center">
					<span class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">₹</span>
					<span
						class="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-transparent"
					>
						{formatIndianNumber(annualSavings)}
					</span>
				</div>
			</div>

			<div class="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-5 md:space-y-6 text-center">
				<p class="text-base sm:text-lg md:text-xl leading-tight tracking-[-0.06em]">Get A Detailed Report With One Click!</p>

				<a id="advanced-calculator-button" data-umami-event="Advanced Calculator Button" href="/calculator" class="flex group/calc max-w-md items-center rounded-lg bg-white p-3 sm:p-4 shadow-soft">
					<p class="mx-4 sm:mx-6 md:mx-8 grow tracking-tight text-base sm:text-lg md:text-xl">Advanced Calculator</p>
					<div
						class="flex cursor-pointer items-center group-hover/calc:bg-black group-hover/calc:text-white transition-all duration-100 justify-center rounded-md bg-orange-400 p-1 sm:p-2 text-black"
					>
						<ChevronIcon strokeWidth=3 />
					</div>
				</a>
			</div>
		</div>
	</div>
</div>