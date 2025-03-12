<script>
	import { blur } from 'svelte/transition';
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
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	// function submitForm() {
    //     toast.warning('Please fill in all details properly!');
	// }

	import { dataState, nameState } from '$lib/state.svelte.js';

    let fullName = '';
    let phoneNumber = '';
    let consumerNumber = '';
    let ebRegNumber = '';
    // let fullName = 'Jamal Haneef';
    // let phoneNumber = '9500044487';
    // let consumerNumber = '0114505470';
    // let ebRegNumber = '9500044487';
    let captcha = '';
    let billData = [];
    let errorMessage = '';

	let loading = false;

    async function fetchBillData() {
		loading = true;
        const res = await fetch('/api/getDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consumerNumber, ebRegNumber, captcha })
        });

		
        const data = await res.json();
		console.log("Calc Log: ", data.data[0]);

		nameState.name = fullName;
		data.data.forEach(element => {
			dataState.data.push(element);
		});
		
		goto('/report');

    }


</script>

<Toaster richColors expand={true} />

<!-- <div class="absolute right-12 top-12 h-48 w-96 rounded-lg bg-gray-600 p-4 font-medium text-white">
	<p>Name: {fullName}</p>
	<p>Phone: {phoneNumber}</p>
	<p>State: {state}</p>
	<p>EB Number: {consumerNumber}</p>
	<p>EB Reg. Number: {ebRegNumber}</p>
</div> -->

<section class="mx-auto w-full max-w-4xl px-4 py-8">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-5xl font-medium tracking-tight">Solar Calculator</h1>
		<p class="text-xl text-gray-600">Calculate your cost, savings, ROI, and more!</p>
	</div>

</section>

{#if loading}
	<div class="w-screen h-screen absolute inset-0 backdrop-blur-sm flex items-center justify-center">
		<div class="size-48 bg-white rounded-xl absolute border-2 border-black tracking-tight flex items-center justify-center">
			<!-- Spinner -->
			<div class="flex flex-col items-center justify-center gap-2">
				<div class="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
				<p class="">Loading...</p>
			</div>
		</div>
	</div>
{/if}

<form on:submit|preventDefault={fetchBillData} class="mx-auto w-full max-w-5xl px-4 py-8 mb-12">
		<div class="">
			<div class="my-8 flex w-full space-x-4">
				<CustomInput bind:value={fullName} label="Full Name" maxlength="20" />
				<CustomInput
					bind:value={phoneNumber}
					label="Phone Number"
					hasPrefix
					placeholder="00000 00000"
				/>
			</div>

            <div class="my-8 flex w-full space-x-4">

                <CustomInput
					bind:value={consumerNumber}
					label="EB/TANGEDCO Number"
				
					placeholder="00000000"
				/>

                <CustomInput
					bind:value={ebRegNumber}
					label="EB Reg. Phone Number"
					hasPrefix
					placeholder="00000 00000"
				/>
			</div>

		</div>
	
		<button type="submit" class="flex group/calc max-w-md items-center rounded-lg bg-orange-400 hover:bg-orange-500 p-3 px-4 shadow-soft">
			<p class="mx-6 grow tracking-tight text-lg">Submit</p>
			<div
				class="flex cursor-pointer items-center  transition-all duration-100 justify-center rounded-md bg-white p-1 text-black"
			>
				<ChevronRightIcon class="size-5 font-semibold"/>
			</div>
		</button>

</form>
