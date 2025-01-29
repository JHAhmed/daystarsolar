<script>
	import {
		HomeIcon,
		BuildingOfficeIcon,
		BuildingOffice2Icon
	} from '@fvilers/heroicons-svelte/24/outline';

	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let residenceType = [
		{
			name: 'House (Own)',
			value: 'house-own',
			icon: HomeIcon
		},
		{
			name: 'House (Rented)',
			value: 'house-rent',
			icon: BuildingOffice2Icon
		},
		{
			name: 'Flat (Rented)',
			value: 'flat-rent',
			icon: BuildingOfficeIcon
		}
	];

	let residenceTypeValue = 'house-own';
</script>

<RadioGroup.Root
	required
	value={residenceTypeValue}
	class="flex items-center justify-between space-x-2"
	onValueChange={(e) => {
		residenceTypeValue = e;
	}}
>
	{#each residenceType as option, i}
		<div
			class="flex w-full items-center space-x-6 rounded-lg border-2 {residenceTypeValue ==
			option.value
				? 'border-orange-400'
				: 'border-gray-600'} p-4"
		>
			<option.icon class="size-6 {residenceTypeValue == option.value ? 'text-orange-400' : ''}" />
			<Label class="cursor-pointer text-gray-800" for={`r${i}`}>{option.name}</Label>
			<RadioGroup.Item
				value={option.value}
				class={residenceTypeValue == option.value ? 'text-orange-400' : ''}
				id={`r${i}`}
			/>
		</div>
	{/each}
	<RadioGroup.Input name="spacing" />
</RadioGroup.Root>
