<script>
	import { blur } from 'svelte/transition';

	import {
		HomeIcon,
		BuildingOfficeIcon,
		BuildingOffice2Icon,
		BoltIcon
	} from '@fvilers/heroicons-svelte/24/outline';

	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { CustomInput } from '$components';

	const steps = [
		{
			title: 'Demographic',
			icon: HomeIcon,
			isActive: false
		},
		{
			title: 'Policy',
			icon: HomeIcon,
			isActive: false
		},
		{
			title: 'Consumption',
			icon: HomeIcon,
			isActive: true
		}
	];

	let details = $state({
		sanctionedLoad: '',
		ebNumber: '',
		ebRegNumber: '',
		terraceArea: '',
		unit: 'sqmt'
	});

</script>

<div class="absolute right-12 top-12 h-48 w-96 rounded-lg bg-gray-600 p-4 font-medium text-white">
	<p>Sanctioned Load: {details.sanctionedLoad}</p>
	<p>EB Number: {details.ebNumber}</p>
	<p>EB Reg Number: {details.ebRegNumber}</p>
	<p>Terrace Area: {details.terraceArea}{details.unit}</p>
</div>

<section class="mx-auto w-full max-w-4xl px-4 py-12">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-5xl font-medium tracking-tight">Solar Calculator</h1>
		<p class="text-xl text-gray-600">Calculate your cost, savings, ROI, and more!</p>
	</div>

	<div class="flex max-w-7xl items-center justify-center">
		{#each steps as step, i}
			{#if step.isActive}
				<div class="flex items-center">
					<div class="flex items-center gap-2 rounded-full border-2 border-orange-400 p-4">
						<span
							class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-400 text-sm text-white"
							>{i + 1}</span
						>
						<span class="mx-4 text-gray-800">{step.title}</span>
					</div>
				</div>
				<div class="mx-4 h-px w-24 bg-gray-400 {i === 2 ? 'hidden' : ''}"></div>
			{:else}
				<div class="flex items-center">
					<div class="flex items-center gap-2 rounded-full border-2 border-gray-300 p-4">
						<span
							class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-sm text-white"
							>{i + 1}</span
						>
						<span class="mx-4 text-gray-800">{step.title}</span>
					</div>
					<div class="mx-4 h-px w-24 bg-gray-400 {i === 2 ? 'hidden' : ''}"></div>
				</div>
			{/if}
		{/each}
	</div>
</section>

<section class="mx-auto w-full max-w-5xl px-4 py-12">
	<div class="my-8 max-w-60 space-x-4">
		<CustomInput
			bind:value={details.sanctionedLoad}
			label="Sanctioned Load"
			hasSuffix
			placeholder="000"
		/>
	</div>
	<div class="w-1/2 space-y-8">
		<CustomInput bind:value={details.ebNumber} label="EB Number" placeholder="0000000000" />
		<CustomInput
			bind:value={details.ebRegNumber}
			label="EB Registered Phone Number"
			hasPrefix
			placeholder="00000 00000"
		/>
		<CustomInput
			onUnitChange={(e) => (details.unit = e)}
			bind:value={details.terraceArea}
			label="Available Terrace Area"
			showUnits
			placeholder="000"
		/>
	</div>
</section>
