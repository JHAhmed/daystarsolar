<script>
	import { ChevronIcon } from '$icons';
	import { Separator } from "bits-ui";

	let monthlyBill = 10000;
	let consumerType = 'domestic';
	let electricityRate = 8;

	$: annualSavings = calculateSavings(monthlyBill, consumerType, electricityRate);
	$: requiredkw = calcualteKW(monthlyBill, consumerType, electricityRate);

	function calcualteKW(bill, type, rate) {
		if (type === 'domestic') {
			rate = 11;
		} else if (type === 'commercial') {
			rate = 10;
		} else if (type === 'industrial') {
			rate = 8;
		}

		let cycle = type === 'domestic' ? 60 : 30;
		let cost = bill / cycle;
		let units = cost / rate;

		let kwneeded = Math.round(units) / 4;
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

<div class="mx-auto w-full max-w-6xl">
	<div class="grid grid-cols-1 lg:grid-cols-2">
		<!-- ─── LEFT: Controls ─── -->
		<div class="bg-white p-8 md:p-12 lg:p-16">
			<p class="text-xs font-medium uppercase tracking-widest text-amber-500">Calculator</p>
			<h2 class="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
				Solar Savings Calculator
			</h2>

			<div class="mt-10 space-y-10">
				<!-- Bill slider -->
				<div>
					<div class="flex items-baseline justify-between mb-3">
						<label for="electricity-bill" class="text-sm font-medium text-neutral-700">
							Electricity Bill
						</label>
						<span class="text-lg font-semibold text-neutral-900">
							₹{formatIndianNumber(monthlyBill)}
						</span>
					</div>
					<input
						id="electricity-bill"
						type="range"
						min="5000"
						max="30000"
						step="1000"
						bind:value={monthlyBill}
						class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200"
					/>
					<div class="mt-2 flex justify-between">
						<span class="text-xs text-neutral-400">₹5,000</span>
						<span class="text-xs text-neutral-400">₹30,000</span>
					</div>
				</div>

				<!-- Consumer type -->
				<div>
					<label class="mb-3 block text-sm font-medium text-neutral-700">
						Type of Consumer
					</label>
					<div class="grid grid-cols-3 gap-2">
						<button
							class={`rounded-lg px-3 py-2.5 text-center text-sm font-medium transition ${
								consumerType === 'domestic'
									? 'bg-neutral-900 text-white'
									: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
							}`}
							on:click={() => (consumerType = 'domestic')}>
							Domestic
						</button>
						<button
							class={`rounded-lg px-3 py-2.5 text-center text-sm font-medium transition ${
								consumerType === 'commercial'
									? 'bg-neutral-900 text-white'
									: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
							}`}
							on:click={() => (consumerType = 'commercial')}>
							Commercial
						</button>
						<button
							class={`rounded-lg px-3 py-2.5 text-center text-sm font-medium transition ${
								consumerType === 'industrial'
									? 'bg-neutral-900 text-white'
									: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
							}`}
							on:click={() => (consumerType = 'industrial')}>
							Industrial
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- ─── RIGHT: Results ─── -->
		<div class="flex flex-col items-center justify-center bg-neutral-900 p-8 md:p-12 lg:p-16">
			<div class="flex items-stretch gap-8 md:gap-12">
				<div class="text-center">
					<p class="text-xs font-medium uppercase tracking-widest text-neutral-500">
						Annual Savings
					</p>
					<div class="mt-3 flex items-baseline justify-center">
						<span class="text-2xl font-medium text-neutral-400">₹</span>
						<span class="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
							{formatIndianNumber(annualSavings)}
						</span>
					</div>
				</div>

				<Separator.Root
					orientation="vertical"
					class="bg-neutral-700 my-auto shrink-0 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
				/>

				<div class="text-center">
					<p class="text-xs font-medium uppercase tracking-widest text-neutral-500">
						Required KW
					</p>
					<div class="mt-3 flex items-baseline justify-center">
						<span class="text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
							{requiredkw}
						</span>
						<span class="ml-1 text-2xl font-medium text-neutral-400">kW</span>
					</div>
				</div>
			</div>

			<div class="mt-12 space-y-5 text-center">
				<p class="text-base text-neutral-300 md:text-lg">
					Get a detailed report with one click!
				</p>
				<a
					id="advanced-calculator-button"
					data-umami-event="Advanced Calculator Button"
					href="/calculator"
					class="group flex items-center gap-4 rounded-lg bg-white px-6 py-4 transition hover:bg-neutral-200">
					<p class="text-base font-medium text-neutral-900 md:text-lg">
						Advanced Calculator
					</p>
					<div
						class="flex items-center justify-center rounded-md bg-amber-500 p-2 text-neutral-900 transition group-hover:bg-neutral-900 group-hover:text-white">
						<ChevronIcon strokeWidth={3} />
					</div>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Range slider thumb styling */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		height: 20px;
		width: 20px;
		border-radius: 9999px;
		background: #ffffff;
		border: 2px solid #0a0a0a;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}
	input[type='range']::-moz-range-thumb {
		height: 20px;
		width: 20px;
		border-radius: 9999px;
		background: #ffffff;
		border: 2px solid #0a0a0a;
		cursor: pointer;
	}
</style>