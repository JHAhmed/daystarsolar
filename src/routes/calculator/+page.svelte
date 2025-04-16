<script>
	import { dev } from '$app/environment';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Toaster, toast } from 'svelte-sonner';
	import { Tooltip } from 'bits-ui';
	import {
		HomeIcon,
		ChevronRightIcon,
		BuildingOfficeIcon,
		BuildingOffice2Icon,
		BoltIcon
	} from '@fvilers/heroicons-svelte/24/outline';

	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { CustomInput } from '$components';
	import CustomDropdown from '$components/CustomDropdown.svelte';
	import { dataState, nameState } from '$lib/state.svelte.js';

	// Form fields
	let fullName = '';
	let phoneNumber = '';
	let consumerNumber = '';
	let ebRegNumber = '';
	let captcha = '';

	// State variables
	let loading = false;
	let errorMessage = '';

	// Prefill data for development environment
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
		ebRegNumber = '9841106264';
	}

	// Form submission handler
	async function fetchBillData() {
		// Validate form
		if (!fullName || !phoneNumber || !consumerNumber || !ebRegNumber) {
			toast.warning('Please fill in all details properly!');
			return;
		}

		try {
			loading = true;

			const res = await fetch('/api/getDetails', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fullName,
					consumerNumber,
					ebRegNumber,
					captcha
				})
			});

			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}

			const data = await res.json();
			nameState.name = fullName;
			dataState.data = [];
			data.data.forEach((element) => {
				dataState.data.push(element);
			});
			goto(`/report?id=${data.id}`);


			// const res = await fetch(`/api/getNumber?cno=${consumerNumber}`);

			// if (!res.ok) {
			// 	throw new Error('Failed to fetch data');
			// }

			// const data = await res.json();
			// console.log(data);
			// console.log(data.consumerNumber);



		} catch (error) {
			console.error('Error fetching bill data:', error);
			errorMessage = 'Failed to retrieve bill data. Please try again.';
			toast.error(errorMessage);
		} finally {
			loading = false;
		}
	}
</script>

<Toaster richColors expand={true} />

<section class="mx-auto w-full max-w-4xl px-4 py-8">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-5xl font-medium tracking-tight">Solar Calculator</h1>
		<p class="text-xl text-gray-600">Calculate your cost, savings, ROI, and more!</p>
	</div>
</section>

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
		<div
			class="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-black bg-white p-6"
		>
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"
			></div>
			<p class="font-medium">Loading...</p>
		</div>
	</div>
{/if}

<form on:submit|preventDefault={fetchBillData} class="mx-auto mb-12 w-full max-w-5xl px-4 py-8">
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
			<CustomInput
				bind:value={consumerNumber}
				label="TNEB Consumer Number"
				placeholder="00000000"
				required
			/>
			<CustomInput
				bind:value={ebRegNumber}
				label="TNEB Registered Phone Number"
				hasPrefix
				placeholder="00000 00000"
				required
			/>
		</div>

		{#if errorMessage}
			<div class="rounded-md bg-red-50 p-3 text-red-600">
				{errorMessage}
			</div>
		{/if}
	</div>

	<button
		type="submit"
		class="group/calc shadow-soft mt-8 flex max-w-md items-center rounded-lg bg-orange-400 p-3 px-4 transition-colors hover:bg-orange-500 disabled:opacity-50"
		disabled={loading}
	>
		<p class="mx-6 grow text-lg tracking-tight">Submit</p>
		<div class="flex items-center justify-center rounded-md bg-white p-1 text-black">
			<ChevronRightIcon class="size-5 font-semibold" />
		</div>
	</button>
</form>
