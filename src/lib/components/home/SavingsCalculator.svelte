<script>
	import { ChevronIcon } from '$icons';
	import { formatIndianNumber } from '$lib/utils.js';

	/**
	 * The quick savings estimate on the homepage.
	 *
	 * The arithmetic is carried over exactly as it was — these are the client's
	 * numbers and the tariffs and billing cycles behind them are deliberate.
	 * Only the naming and the surrounding markup changed.
	 */

	const CONSUMER_TYPES = [
		{ value: 'domestic', label: 'Domestic' },
		{ value: 'commercial', label: 'Commercial' },
		{ value: 'industrial', label: 'Industrial' }
	];

	const MIN_BILL = 5000;
	const MAX_BILL = 30000;

	let monthlyBill = $state(10000);
	let consumerType = $state('domestic');

	/** Per-unit tariff assumed for each consumer class, in rupees. */
	function rateFor(type) {
		if (type === 'domestic') return 11;
		if (type === 'commercial') return 10;
		return 8;
	}

	function calculateRequiredKw(bill, type) {
		const rate = rateFor(type);
		const cycle = type === 'domestic' ? 60 : 30;
		const cost = bill / cycle;
		const units = cost / rate;
		return Math.round(Math.round(units) / 4);
	}

	function calculateAnnualSavings(bill, type) {
		const rate = rateFor(type);
		const units = bill / rate;
		const cycle = type === 'domestic' ? 6 : 12;
		return Math.round(units * rate * cycle);
	}

	const annualSavings = $derived(calculateAnnualSavings(monthlyBill, consumerType));
	const requiredKw = $derived(calculateRequiredKw(monthlyBill, consumerType));

	/** Drives the filled portion of the slider track. */
	const progress = $derived(((monthlyBill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100);
</script>

<div class="overflow-hidden rounded-panel border border-ink-200 shadow-soft">
	<div class="grid lg:grid-cols-2">
		<!-- Controls -->
		<div class="bg-white p-8 md:p-12 lg:p-14">
			<p class="text-eyebrow text-solar-500 uppercase">Calculator</p>
			<h2 class="mt-3 font-display text-heading-lg text-night-900">Solar Savings Calculator</h2>

			<div class="mt-10 space-y-10">
				<div>
					<div class="mb-4 flex items-baseline justify-between gap-4">
						<label for="electricity-bill" class="text-sm font-medium text-ink-700">
							Electricity Bill
						</label>
						<span class="font-display text-heading text-night-900 tabular-nums">
							₹{formatIndianNumber(monthlyBill)}
						</span>
					</div>

					<div class="relative">
						<div class="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2">
							<div class="h-full w-full rounded-full bg-ink-200"></div>
							<div
								class="absolute inset-y-0 left-0 rounded-full bg-night-900"
								style:width="{progress}%"
							></div>
						</div>
						<input
							id="electricity-bill"
							type="range"
							min={MIN_BILL}
							max={MAX_BILL}
							step="1000"
							bind:value={monthlyBill}
							aria-valuetext="₹{formatIndianNumber(monthlyBill)}"
							class="range-input relative w-full cursor-pointer"
						/>
					</div>

					<div class="mt-3 flex justify-between text-xs text-ink-400">
						<span>₹{formatIndianNumber(MIN_BILL)}</span>
						<span>₹{formatIndianNumber(MAX_BILL)}</span>
					</div>
				</div>

				<fieldset>
					<legend class="mb-3 text-sm font-medium text-ink-700">Type of Consumer</legend>
					<div class="grid grid-cols-3 gap-2">
						{#each CONSUMER_TYPES as type (type.value)}
							<button
								type="button"
								aria-pressed={consumerType === type.value}
								onclick={() => (consumerType = type.value)}
								class="rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97]
									{consumerType === type.value
									? 'bg-night-900 text-white'
									: 'bg-ink-100 text-ink-600 hover:bg-ink-200'}"
							>
								{type.label}
							</button>
						{/each}
					</div>
				</fieldset>
			</div>
		</div>

		<!-- Results -->
		<div class="flex flex-col justify-center bg-night-900 p-8 md:p-12 lg:p-14">
			<div class="flex flex-wrap items-stretch gap-8 sm:gap-10">
				<div>
					<p class="text-eyebrow text-white/40 uppercase">Annual Savings</p>
					<p class="mt-3 flex items-baseline font-display text-white">
						<span class="text-heading text-white/45">₹</span>
						<span class="text-display tabular-nums lg:text-display-lg">
							{formatIndianNumber(annualSavings)}
						</span>
					</p>
				</div>

				<div class="hidden w-px shrink-0 bg-white/15 sm:block" aria-hidden="true"></div>

				<div>
					<p class="text-eyebrow text-white/40 uppercase">Required KW</p>
					<p class="mt-3 flex items-baseline font-display text-white">
						<span class="text-display tabular-nums lg:text-display-lg">{requiredKw}</span>
						<span class="ml-1 text-heading text-white/45">kW</span>
					</p>
				</div>
			</div>

			<div class="mt-12 space-y-5">
				<p class="text-base text-white/70">Get a detailed report with one click!</p>
				<a
					id="advanced-calculator-button"
					data-umami-event="Advanced Calculator Button"
					href="/calculator"
					class="group/adv inline-flex items-center gap-4 rounded-xl bg-white py-3 pr-3 pl-6 transition-[background-color,transform] duration-[160ms] ease-out hover:bg-ink-100 active:scale-[0.97]"
				>
					<span class="text-base font-medium text-night-900">Advanced Calculator</span>
					<span
						class="flex size-9 items-center justify-center rounded-lg bg-solar-400 text-night-900 transition-[background-color,color,transform] duration-[200ms] ease-out group-hover/adv:translate-x-0.5 group-hover/adv:bg-night-900 group-hover/adv:text-white"
					>
						<ChevronIcon strokeWidth={2.5} class="size-4" />
					</span>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* The visible track is painted by the divs behind the input; the input
	   itself only contributes the thumb and the interaction surface. */
	.range-input {
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		height: 1.5rem;
	}

	.range-input::-webkit-slider-runnable-track {
		height: 1.5rem;
		background: transparent;
	}

	.range-input::-moz-range-track {
		height: 1.5rem;
		background: transparent;
	}

	.range-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		height: 1.25rem;
		width: 1.25rem;
		margin-top: 0.125rem;
		border-radius: 9999px;
		background: var(--color-white);
		border: 2px solid var(--color-night-900);
		box-shadow: var(--shadow-chip);
		cursor: grab;
		transition: transform var(--duration-fast) var(--ease-out-quart);
	}

	.range-input::-moz-range-thumb {
		height: 1.25rem;
		width: 1.25rem;
		border-radius: 9999px;
		background: var(--color-white);
		border: 2px solid var(--color-night-900);
		box-shadow: var(--shadow-chip);
		cursor: grab;
		transition: transform var(--duration-fast) var(--ease-out-quart);
	}

	.range-input:active::-webkit-slider-thumb {
		transform: scale(1.15);
		cursor: grabbing;
	}

	.range-input:active::-moz-range-thumb {
		transform: scale(1.15);
		cursor: grabbing;
	}

	.range-input:focus-visible::-webkit-slider-thumb {
		outline: 2px solid var(--color-night-900);
		outline-offset: 2px;
	}

	.range-input:focus-visible::-moz-range-thumb {
		outline: 2px solid var(--color-night-900);
		outline-offset: 2px;
	}
</style>
