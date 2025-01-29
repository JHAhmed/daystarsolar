<script>
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Tabs from '$lib/components/ui/tabs';

	let {
		label = 'Name',
		maxlength = 10,
		placeholder = 'John Doe',
		showUnits = false,
		hasPrefix = false,
		hasSuffix = false,
		required = true,
		prefixText = '+91',
		suffixText = 'kW/Units',
		onUnitChange = (e) => {},
		value = $bindable()
	} = $props();
</script>

<div class="w-full">
	<Label for="custom-input" class="my-1">{label}</Label>
	<div id="custom-input" class="flex items-center justify-center">
		{#if hasPrefix}
			<p
				class="text-md inline-flex h-14 items-center justify-center rounded-l-md border border-r-0 bg-gray-200 px-2 tracking-wider"
			>
				{prefixText}
			</p>
		{/if}
		<input
			{maxlength}
			bind:value
			type="text"
			{required}
			{placeholder}
			class="w-full {hasPrefix
				? 'rounded-l-none'
				: ''} rounded-lg bg-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200 {hasSuffix
				? 'rounded-r-none'
				: ''}"
		/>
		{#if hasSuffix}
			<p
				class="inline-flex h-14 w-fit items-center justify-center text-nowrap rounded-r-md border border-l-0 bg-gray-200 px-2 text-sm tracking-wider"
			>
				{suffixText}
			</p>
		{/if}
		{#if showUnits}
			<Tabs.Root
				onValueChange={(e) => {
					onUnitChange(e);
				}}
				value="sqmt"
				class="w-[400px]"
			>
				<Tabs.List class="mx-2 p-2">
					<Tabs.Trigger class="h-full" value="sqmt">Sq. M</Tabs.Trigger>
					<Tabs.Trigger class="h-full" value="sqft">Sq. Ft</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		{/if}
	</div>
</div>
