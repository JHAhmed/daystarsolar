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
	import CustomDropdown from '$components/CustomDropdown.svelte';

	const steps = [
		{
			title: 'Demographic',
			icon: HomeIcon,
			isActive: false
		},
		{
			title: 'Policy',
			icon: HomeIcon,
			isActive: true
		},
		{
			title: 'Consumption',
			icon: HomeIcon,
			isActive: false
		}
	];

	const meteringType = [
		{
			name: 'Net Metering',
			value: 'net-metering',
			icon: BoltIcon
		},
		{
			name: 'Net Feed-In',
			value: 'net-feed-in',
			icon: BoltIcon
		},
		{
			name: 'Gross Metering',
			value: 'gross-metering',
			icon: BoltIcon
		}
	];
	const technologyType = [
		{
			name: 'Solar On-Grid',
			value: 'solar-on-grid',
			icon: BoltIcon
		},
		{
			name: 'Solar Off-Grid',
			value: 'solar-off-grid',
			icon: BoltIcon
		},
		{
			name: 'Solar Hybrid',
			value: 'solar-hybrid',
			icon: BoltIcon
		}
	];

	let details = {
		meteringTypeValue: 'net-metering',
		technologyValue: 'solar-on-grid'
	};
</script>

<div class="absolute right-12 top-12 h-48 w-96 rounded-lg bg-gray-600 p-4 font-medium text-white">
	<p>Name: {details.fullName}</p>
	<p>Phone: {details.phoneNumber}</p>
	<p>State: {details.state}</p>
	<p>Consumer Type: {details.consumerType}</p>
	<p>Residence Type: {details.residenceTypeValue}</p>
	<p>Voltage Type: {details.voltageTypeValue}</p>
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
	<div class="my-8" in:blur out:blur>
		<Label for="metering-type" class="my-2">Metering Type</Label>
		<RadioGroup.Root
			id="metering-type"
			value={details.meteringTypeValue}
			class="flex items-center justify-between space-x-2"
			onValueChange={(e) => {
				details.meteringTypeValue = e;
			}}
		>
			{#each meteringType as option, i}
				<div
					class="flex w-full items-center space-x-6 rounded-lg border-2 {details.meteringTypeValue ==
					option.value
						? 'border-orange-400'
						: 'border-gray-600'} p-4"
				>
					<option.icon
						class="size-6 {details.meteringTypeValue == option.value ? 'text-orange-400' : ''}"
					/>
					<Label class="flex grow cursor-pointer text-gray-800" for={`r-${option.value}-${i}`}
						>{option.name}</Label
					>
					<RadioGroup.Item
						value={option.value}
						class={details.meteringTypeValue == option.value ? 'text-orange-400' : ''}
						id={`r-${option.value}-${i}`}
					/>
				</div>
			{/each}
			<RadioGroup.Input name="spacing" />
		</RadioGroup.Root>
	</div>

	<div class="my-8">
		<Label for="technology-type" class="my-2">Technology Type</Label>
		<RadioGroup.Root
			id="technology-type"
			value={details.technologyValue}
			class="flex items-center justify-between space-x-2"
			onValueChange={(e) => {
				details.technologyValue = e;
			}}
		>
			{#each technologyType as option, i}
				<div
					class="flex w-full items-center space-x-6 rounded-lg border-2 {details.technologyValue ==
					option.value
						? 'border-orange-400'
						: 'border-gray-600'} p-4"
				>
					<option.icon
						class="size-6 {details.technologyValue == option.value ? 'text-orange-400' : ''}"
					/>
					<Label class="flex grow cursor-pointer text-gray-800" for={`r-${option.value}-${i}`}
						>{option.name}</Label
					>
					<RadioGroup.Item
						value={option.value}
						class={details.technologyValue == option.value ? 'text-orange-400' : ''}
						id={`r-${option.value}-${i}`}
					/>
				</div>
			{/each}
			<RadioGroup.Input name="spacing" />
		</RadioGroup.Root>
	</div>
</section>
