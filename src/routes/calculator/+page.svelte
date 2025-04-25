<script>
	import { browser, dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Toaster, toast } from 'svelte-sonner';
	import { ChevronRightIcon, ArrowDownIcon } from '@fvilers/heroicons-svelte/24/outline';

	import { CustomInput, UnitToggle, RegionTable } from '$components';
	import { dataState, nameState } from '$lib/state.svelte.js';

	// ELements
	let regionTable;

	// Form fields
	let fullName = '';
	let phoneNumber = '';
	let consumerNumber = '';
	let ebRegNumber = '';
	let connectionType = 'domestic';

	// State variables
	let loading = false;
	let errorMessage = '';

	let funFacts = [
		"Solar energy is the Earth's most abundant energy resource; the sun provides more energy in an hour than the world consumes in a year.",
		'Solar panels can generate electricity using daylight, not just direct sunlight, including on cloudy days or in the shade.',
		'Solar energy prices have dropped significantly, making it cheaper than gas power in places like the U.S.',
		'The principle behind solar energy (the photovoltaic effect) was discovered nearly 200 years ago, with the first solar cell created in the 1800s.',
		'The typical energy efficiency of most commercial solar panels is between 11% and 15%.',
		'Solar energy helps reduce climate change as it generates electricity without producing emissions or pollution.',
		'Installing solar panels can increase the resale value of a home.',
		'Most solar panels are made from silicon, a semiconductor material used in photovoltaic cells.',
		'Technology is being developed to harness solar energy in space and wirelessly transmit it back to Earth.',
		"It is forecasted that solar panels could supply 25% of the world's electricity needs by the year 2050."
	];

	if (dev) {
		// Test 1
		// fullName = 'Jamal Haneef';
		// phoneNumber = '9500044487';
		// consumerNumber = '0114505470';
		// ebRegNumber = '9500044487';

		// Test 2
		fullName = 'Subramaniya';
		phoneNumber = '9841106264';
		consumerNumber = '0107301616';
		ebRegNumber = '7871925242'; // actual number
	}

	async function validateForm() {
		consumerNumber = consumerNumber.replace(/\s/g, '');
		console.log(consumerNumber);

		if (fullName.length < 4 || phoneNumber.length < 8) {
			toast.warning('Please fill in all details properly!');
			return;
		}

		if (consumerNumber.length < 10) {
			toast.warning("Consumer number doesn't contain region code!");
			return;
		}

		const regionCode = consumerNumber.slice(0, 2);
		const validCodes = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

		if (!validCodes.includes(regionCode)) {
			toast.warning('Invalid region code in consumer number!');
			return;
		}

		if (isNaN(phoneNumber) || isNaN(consumerNumber)) {
			toast.warning('Please fill in numbers properly!');
			return;
		}

		fetchBillData();
	}

	async function fetchBillData() {
		try {
			loading = true;

			const res = await fetch('/api/get-details', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fullName,
					phoneNumber,
					consumerNumber,
					ebRegNumber
				})
			});

			if (!res.ok) {
				toast.error('Error!');
				loading = false;
				throw new Error('Failed to fetch data');
			}

			const data = await res.json();

			if (!isNaN(data.id)) {
				goto(`/report?id=${data.id}`);
			} else {
				goto('/report-error');
			}
		} catch (error) {
			console.error('Error fetching bill data:', error);
			errorMessage = 'Failed to retrieve bill data. Please try again.';
			toast.error(errorMessage);
			goto('/report-error');
		} finally {
			loading = false;
		}
	}

	const onToggle = (e) => {
		connectionType = e;
	};

	const scrollTo = () => {
		if (browser) {
			regionTable.scrollIntoView({ behavior: 'smooth' });
		}
	};
</script>

<Toaster richColors expand={true} />

<svelte:head>
	<title>Calculator | Daystar Solar</title>
	<meta
		name="description"
		content="Generate a report to estimate your solar savings using our solar calculator."
	/>
	<meta property="og:title" content="Calculator | Daystar Solar" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://daystar.co.in/calculator" />
	<meta
		property="og:description"
		content="Generate a report to estimate your solar savings using our solar calculator."
	/>
	<meta property="og:image" content="https://daystarsolar.co.in/images/calculator.png" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"url": "https://daystarsolar.co.in/calculator",
			"name": "Solar Savings Calculator",
			"applicationCategory": "UtilitiesApplication",
			"description": "Generate a report to estimate your solar savings using our solar calculator."
		}
	</script>
</svelte:head>

<section class="mx-auto w-full max-w-4xl px-4 py-8">
	<div class="text-center md:mb-12">
		<h1 class="mb-4 text-3xl font-medium tracking-tight md:text-5xl">Solar Calculator</h1>
		<p class="text-lg text-gray-600 md:text-xl">Calculate your cost, savings, ROI, and more!</p>
	</div>
</section>

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
		<div
			class="flex w-1/4 flex-col items-center justify-center gap-2 rounded-xl border-2 border-black bg-white p-6"
		>
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"
			></div>

			<p class="mt-4 font-medium">Your report is being generated...</p>

			<p class="text-center text-sm text-gray-600">
				Fun fact: {funFacts[Math.floor(Math.random() * 10)]}
			</p>
		</div>
	</div>
{/if}

<form on:submit|preventDefault={validateForm} class="mx-auto w-full max-w-5xl px-4 pt-8">
	<div class="space-y-8">
		<div class="flex w-full space-x-4">
			<CustomInput bind:value={fullName} label="Full Name" maxlength="20" required />
			<CustomInput
				bind:value={phoneNumber}
				label="Contact Number"
				hasPrefix
				placeholder="00000 00000"
				required
			/>
		</div>

		<div class="flex w-full space-x-4">
			<div class="w-full" name="consumer-number">
				<CustomInput
					maxlength={15}
					bind:value={consumerNumber}
					label="TNEB Consumer Number (With Region Code)"
					placeholder="01123123123"
					required
				/>
				<label for="consumer-number" class="my-1 text-xs font-medium leading-none text-gray-700">
					<a
						href="https://www.tnebltd.gov.in/BillStatus/consguide.html"
						target="_blank"
						class="text-blue-800 hover:underline">How to check your consumer number?</a
					>
				</label>
			</div>
			<div class="w-full" name="eg-reg-number">
				<CustomInput
					bind:value={ebRegNumber}
					label="TNEB Registered Phone Number"
					hasPrefix
					placeholder="00000 00000"
				/>
				<label for="eg-reg-number" class="my-1 text-xs font-medium leading-none text-gray-700"
					>Enter for faster report generation!</label
				>
			</div>
		</div>

		<!-- <div class="flex w-full space-x-4">
			<div class="w-full">
				<UnitToggle {onToggle} />
			</div>
		</div> -->

		{#if errorMessage}
			<div class="rounded-md bg-red-50 p-3 text-red-600">
				{errorMessage}
			</div>
		{/if}
	</div>

	<button
		type="submit"
		class="group/calc shadow-soft mt-8 flex max-w-md items-center rounded-lg bg-orange-400 p-1 px-2 transition-colors hover:bg-orange-500 disabled:opacity-50 md:p-3 md:px-4"
		disabled={loading}
	>
		<p class="mx-6 grow text-base tracking-tight md:text-lg">Submit</p>
		<div class="flex items-center justify-center rounded-md bg-white p-1 text-black">
			<ChevronRightIcon class="size-3 font-semibold md:size-5" />
		</div>
	</button>
</form>

<div class="items-left mx-auto mb-12 flex w-full max-w-5xl justify-start px-4">
	<button
		on:click={scrollTo}
		class="group/calc shadow-soft mr-auto flex max-w-md items-center p-2 py-6"
	>
		<p class="grow text-base tracking-tight text-blue-600">Check your region code</p>
		<div class="flex items-center justify-center rounded-md bg-white p-1 text-blue-600">
			<ArrowDownIcon class="mx-1 size-4 -rotate-90 font-semibold " />
		</div>
	</button>
</div>

<div bind:this={regionTable}>
	<RegionTable />
</div>
