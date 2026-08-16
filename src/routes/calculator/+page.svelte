<script>
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Seo, Button, Field } from '$components';
	import { reveal } from '$motion';
	import { webApplicationSchema } from '$lib/seo/schema.js';
	import { REGIONS, REGION_CODES, FUN_FACTS, CONSUMER_TYPES } from '$data/regions.js';
	import { formatIndianNumber } from '$lib/utils.js';
	import { ArrowIcon, ChevronIcon } from '$icons';

	/**
	 * Solar report calculator.
	 *
	 * Manual entry is the primary path: it answers immediately, needs no third
	 * party, and cannot break when someone else changes their markup. The TNEB
	 * lookup remains available as an opt-in shortcut and falls back to manual
	 * whenever it fails, so a visitor is never left at a dead end.
	 */

	const STEPS = ['Your details', 'Your usage', 'Report'];

	let step = $state(0);
	let mode = $state('manual');
	let submitting = $state(false);
	let fetching = $state(false);
	let showRegions = $state(false);
	let funFact = $state(FUN_FACTS[0]);

	let details = $state({ name: '', phone: '', consumerType: 'domestic' });
	let consumerNumber = $state('');
	let errors = $state({});

	/** Six bi-monthly periods ending with the most recent, newest first. */
	function seedReadings() {
		const now = new Date();
		return Array.from({ length: 6 }, (_, i) => {
			const date = new Date(now.getFullYear(), now.getMonth() - i * 2, 1);
			const dd = '01';
			const mm = String(date.getMonth() + 1).padStart(2, '0');
			return {
				assessmentDate: `${dd}/${mm}/${date.getFullYear()}`,
				label: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
				consumptionUnits: '',
				totalCharges: ''
			};
		});
	}

	let readings = $state(seedReadings());

	const filledReadings = $derived(
		readings.filter((row) => row.consumptionUnits.trim() && row.totalCharges.trim())
	);

	const totals = $derived({
		units: filledReadings.reduce((sum, row) => sum + Number(row.consumptionUnits || 0), 0),
		charges: filledReadings.reduce((sum, row) => sum + Number(row.totalCharges || 0), 0)
	});

	function validateDetails() {
		const next = {};
		if (details.name.trim().length < 2) next.name = 'Please enter your name.';
		if (details.phone.replace(/\D/g, '').length < 10)
			next.phone = 'Please enter a 10-digit phone number.';
		errors = next;
		return Object.keys(next).length === 0;
	}

	function goToUsage() {
		if (validateDetails()) step = 1;
	}

	function addReading() {
		const last = readings.at(-1);
		const [, mm, yyyy] = (last?.assessmentDate ?? '01/01/2020').split('/').map(Number);
		const date = new Date(yyyy, mm - 1 - 2, 1);
		readings.push({
			assessmentDate: `01/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
			label: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
			consumptionUnits: '',
			totalCharges: ''
		});
	}

	async function submitManual() {
		if (submitting) return;

		if (filledReadings.length < 2) {
			toast.warning('Please fill in at least two billing periods.');
			return;
		}

		submitting = true;
		try {
			const response = await fetch('/api/report', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: details.name,
					phone: details.phone,
					consumerType: details.consumerType,
					readings: filledReadings.map(({ assessmentDate, consumptionUnits, totalCharges }) => ({
						assessmentDate,
						consumptionUnits,
						totalCharges
					}))
				})
			});

			const result = await response.json().catch(() => ({}));

			if (!response.ok) {
				toast.error(result.message ?? 'Could not build your report. Please try again.');
				return;
			}

			if (!result.persisted) {
				toast.info('Report built, but writes are disabled in this environment.');
				return;
			}

			await goto(`/report?id=${result.id}`);
		} catch {
			toast.error('Could not reach the server. Please check your connection.');
		} finally {
			submitting = false;
		}
	}

	function validateConsumerNumber() {
		const cleaned = consumerNumber.replace(/\s/g, '');

		if (cleaned.length < 10) {
			errors = { consumerNumber: "Consumer number doesn't contain region code!" };
			return null;
		}
		if (!REGION_CODES.includes(cleaned.slice(0, 2))) {
			errors = { consumerNumber: 'Invalid region code in consumer number!' };
			return null;
		}
		if (!/^\d+$/.test(cleaned)) {
			errors = { consumerNumber: 'Please fill in numbers properly!' };
			return null;
		}

		errors = {};
		return cleaned;
	}

	async function fetchFromTneb() {
		const cleaned = validateConsumerNumber();
		if (!cleaned || fetching) return;

		funFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
		fetching = true;

		try {
			const response = await fetch('/api/report/tneb', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: details.name,
					phone: details.phone,
					consumerNumber: cleaned
				})
			});

			const result = await response.json().catch(() => ({}));

			if (response.ok && result.solar) {
				await goto('/report-error?solar=true');
				return;
			}

			if (!response.ok || !result.readings?.length) {
				// Never a dead end: the manual path is right there, and the details
				// already entered are preserved.
				toast.error(
					result.message ??
						'We could not reach the TNEB portal. Please enter your bills manually below.'
				);
				mode = 'manual';
				return;
			}

			// Fold what came back into the manual table so it can be checked and
			// corrected before the report is generated.
			readings = result.readings.map((row) => {
				const [, mm, yyyy] = row.assessmentDate.split('/').map(Number);
				const date = new Date(yyyy, mm - 1, 1);
				return {
					...row,
					label: Number.isNaN(date.getTime())
						? row.assessmentDate
						: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
				};
			});
			mode = 'manual';
			toast.success(`Found ${result.readings.length} billing periods. Check them and continue.`);
		} catch {
			toast.error('We could not reach the TNEB portal. Please enter your bills manually below.');
			mode = 'manual';
		} finally {
			fetching = false;
		}
	}
</script>

<Seo
	title="Calculator | Daystar Solar"
	description="Generate a report to estimate your solar savings using our solar calculator."
	path="/calculator"
	image="/ogcalculator.png"
	schema={webApplicationSchema({
		path: '/calculator',
		name: 'Solar Savings Calculator',
		category: 'UtilitiesApplication',
		description: 'Generate a report to estimate your solar savings using our solar calculator.'
	})}
/>

{#if fetching}
	<div
		class="fixed inset-0 z-100 flex items-center justify-center bg-night-950/40 p-6 backdrop-blur-sm"
		role="status"
		aria-live="polite"
	>
		<div
			class="flex w-full max-w-md flex-col items-center gap-4 rounded-panel bg-white p-8 text-center shadow-lift"
		>
			<div
				class="size-11 animate-spin rounded-full border-4 border-solar-400 border-t-transparent"
			></div>
			<p class="text-sm font-medium text-night-900">
				Checking the TNEB portal…<br />This can take 10-20 seconds
			</p>
			<p class="text-sm text-ink-500">Fun fact: {funFact}</p>
		</div>
	</div>
{/if}

<section class="container-page pt-6 md:pt-10">
	<div data-reveal {@attach reveal({ trigger: 'load' })} class="mx-auto max-w-3xl text-center">
		<h1 class="font-display text-display text-night-900 md:text-display-lg">Solar Calculator</h1>
		<p class="mt-4 text-lead text-ink-600">Calculate your cost, savings, ROI, and more!</p>
	</div>

	<!-- Progress -->
	<ol class="mx-auto mt-12 flex max-w-2xl items-center gap-2" aria-label="Progress">
		{#each STEPS as label, i (label)}
			<li class="flex flex-1 items-center gap-2">
				<span
					class="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors duration-[200ms]
						{i <= step ? 'bg-night-900 text-white' : 'bg-ink-200 text-ink-500'}"
					aria-current={i === step ? 'step' : undefined}
				>
					{i + 1}
				</span>
				<span class="hidden text-sm sm:inline {i <= step ? 'text-night-900' : 'text-ink-400'}">
					{label}
				</span>
				{#if i < STEPS.length - 1}
					<span class="h-px flex-1 {i < step ? 'bg-night-900' : 'bg-ink-200'}"></span>
				{/if}
			</li>
		{/each}
	</ol>
</section>

<section class="section">
	<div class="container-page mx-auto max-w-3xl">
		{#if step === 0}
			<div
				data-reveal
				{@attach reveal({ trigger: 'load', y: 14 })}
				class="rounded-panel border border-ink-200 p-6 md:p-8"
			>
				<h2 class="mb-6 font-display text-heading text-night-900">Your details</h2>

				<div class="flex flex-col gap-4">
					<Field
						label="Full name"
						bind:value={details.name}
						error={errors.name}
						placeholder="John Smith"
						autocomplete="name"
						maxlength="60"
						required
					/>

					<Field
						label="Contact number"
						type="tel"
						bind:value={details.phone}
						error={errors.phone}
						prefix="+91"
						placeholder="99999 99999"
						autocomplete="tel"
						inputmode="numeric"
						maxlength="15"
						required
					/>

					<fieldset>
						<legend class="mb-2 text-sm font-medium text-ink-700">Connection type</legend>
						<div class="grid grid-cols-3 gap-2">
							{#each CONSUMER_TYPES as type (type.value)}
								<button
									type="button"
									aria-pressed={details.consumerType === type.value}
									onclick={() => (details.consumerType = type.value)}
									class="rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97]
										{details.consumerType === type.value
										? 'bg-night-900 text-white'
										: 'bg-ink-100 text-ink-600 hover:bg-ink-200'}"
								>
									{type.label}
								</button>
							{/each}
						</div>
					</fieldset>
				</div>

				<div class="mt-8">
					<Button variant="primary" size="lg" chip onclick={goToUsage}>Continue</Button>
				</div>
			</div>
		{:else}
			<div class="rounded-panel border border-ink-200 p-6 md:p-8">
				<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
					<h2 class="font-display text-heading text-night-900">Your electricity usage</h2>
					<button
						type="button"
						onclick={() => (step = 0)}
						class="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-night-900"
					>
						<ArrowIcon class="size-3.5 rotate-90" strokeWidth="2" />
						Back to details
					</button>
				</div>

				<!-- Mode switch -->
				<div class="mb-8 grid grid-cols-2 gap-2 rounded-xl bg-ink-100 p-1">
					<button
						type="button"
						aria-pressed={mode === 'manual'}
						onclick={() => (mode = 'manual')}
						class="rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color] duration-[160ms] ease-out
							{mode === 'manual' ? 'bg-white text-night-900 shadow-soft' : 'text-ink-600 hover:text-night-900'}"
					>
						Enter bills manually
					</button>
					<button
						type="button"
						aria-pressed={mode === 'tneb'}
						onclick={() => (mode = 'tneb')}
						class="rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color] duration-[160ms] ease-out
							{mode === 'tneb' ? 'bg-white text-night-900 shadow-soft' : 'text-ink-600 hover:text-night-900'}"
					>
						Fetch from TNEB
					</button>
				</div>

				{#if mode === 'manual'}
					<p class="mb-5 text-sm text-ink-600">
						Enter the units consumed and the amount billed for each period from your electricity
						bills. Two periods is enough to start; more history makes the report more accurate.
					</p>

					<div class="overflow-x-auto">
						<table class="w-full min-w-md border-collapse text-sm">
							<thead>
								<tr class="border-b border-ink-200 text-left text-ink-500">
									<th class="py-2 pr-3 font-medium">Period</th>
									<th class="py-2 pr-3 font-medium">Units consumed</th>
									<th class="py-2 font-medium">Bill amount (₹)</th>
								</tr>
							</thead>
							<tbody>
								{#each readings as reading, i (reading.assessmentDate + i)}
									<tr class="border-b border-ink-100">
										<td class="py-2.5 pr-3 whitespace-nowrap text-ink-700">{reading.label}</td>
										<td class="py-2.5 pr-3">
											<label class="sr-only" for="units-{i}">
												Units consumed for {reading.label}
											</label>
											<input
												id="units-{i}"
												type="number"
												min="0"
												inputmode="numeric"
												bind:value={reading.consumptionUnits}
												placeholder="0"
												class="w-full rounded-lg border border-ink-200 px-3 py-2 text-night-900 transition-[border-color] duration-[160ms] focus:border-night-900 focus:ring-2 focus:ring-night-900/15 focus:outline-none"
											/>
										</td>
										<td class="py-2.5">
											<label class="sr-only" for="charges-{i}">
												Bill amount for {reading.label}
											</label>
											<input
												id="charges-{i}"
												type="number"
												min="0"
												inputmode="numeric"
												bind:value={reading.totalCharges}
												placeholder="0"
												class="w-full rounded-lg border border-ink-200 px-3 py-2 text-night-900 transition-[border-color] duration-[160ms] focus:border-night-900 focus:ring-2 focus:ring-night-900/15 focus:outline-none"
											/>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
						<button
							type="button"
							onclick={addReading}
							class="text-sm font-medium text-sky-600 transition-colors hover:text-sky-700"
						>
							+ Add an earlier period
						</button>

						{#if filledReadings.length}
							<p class="text-sm text-ink-500">
								{filledReadings.length} period{filledReadings.length === 1 ? '' : 's'} ·
								<span class="tabular-nums">{formatIndianNumber(totals.units)}</span> units ·
								<span class="tabular-nums">₹{formatIndianNumber(totals.charges)}</span>
							</p>
						{/if}
					</div>

					<div class="mt-8">
						<Button
							variant="solar"
							size="lg"
							chip
							onclick={submitManual}
							disabled={submitting || filledReadings.length < 2}
						>
							{submitting ? 'Building your report…' : 'Generate report'}
						</Button>
					</div>
				{:else}
					<p class="mb-5 text-sm text-ink-600">
						We can look your billing history up directly from the TNEB portal. This takes 10-20
						seconds and occasionally fails when the portal is busy — you can always enter your bills
						manually instead.
					</p>

					<Field
						label="TNEB Consumer Number (With Region Code)"
						bind:value={consumerNumber}
						error={errors.consumerNumber}
						placeholder="01123123123"
						inputmode="numeric"
						maxlength="15"
						required
					/>

					<div class="mt-3 flex flex-wrap gap-4">
						<a
							href="https://www.tnebltd.gov.in/BillStatus/consguide.html"
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm font-medium text-sky-600 hover:underline"
						>
							How to check your consumer number?
						</a>
						<button
							type="button"
							onclick={() => (showRegions = !showRegions)}
							aria-expanded={showRegions}
							class="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:underline"
						>
							Check your region code
							<ChevronIcon
								class="size-3.5 transition-transform duration-[220ms] {showRegions
									? '-rotate-90'
									: 'rotate-90'}"
								strokeWidth="2"
							/>
						</button>
					</div>

					{#if showRegions}
						<div class="mt-5 overflow-x-auto rounded-card border border-ink-200">
							<table class="w-full border-collapse text-left text-xs md:text-sm">
								<thead class="bg-ink-50 text-ink-600">
									<tr>
										<th class="px-3 py-2.5 font-medium">Code</th>
										<th class="px-3 py-2.5 font-medium">Region</th>
										<th class="px-3 py-2.5 font-medium">Districts / Zones Covered</th>
									</tr>
								</thead>
								<tbody>
									{#each REGIONS as region (region.code)}
										<tr class="border-t border-ink-100">
											<td class="px-3 py-2.5 font-medium tabular-nums">{region.code}</td>
											<td class="px-3 py-2.5 whitespace-nowrap">{region.name}</td>
											<td class="px-3 py-2.5 text-ink-600">{region.districts}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}

					<div class="mt-8">
						<Button variant="primary" size="lg" chip onclick={fetchFromTneb} disabled={fetching}>
							{fetching ? 'Checking…' : 'Fetch my bills'}
						</Button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
