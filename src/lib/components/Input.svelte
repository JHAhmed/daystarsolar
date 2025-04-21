<script>
	import { Label } from '$lib/components/ui/label/index.js';

	let {
		label = 'Name',
		maxlength = 10,
		placeholder = 'John Doe',
		hasPrefix = false,
		hasSuffix = false,
		required = false,
		prefixText = '+91',
		onUnitChange = (e) => {},
		value = $bindable()
	} = $props();
</script>

<div class="w-full">
	<div class="flex">
		<Label for="custom-input" class="my-1 text-xs md:text-sm">{label}</Label>
		{#if required}
			<div class="w-1 h-1 text-red-600">*</div>
		{/if}
	</div>
	<div id="custom-input" class="flex items-center justify-center">
		{#if hasPrefix}
			<p
				class="text-md inline-flex h-9 md:h-14 items-center text-sm md:text-base justify-center rounded-l-md border border-r-0 bg-gray-200 px-2 tracking-wider"
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
				: ''} rounded-lg bg-gray-100 p-2 md:p-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-200 {hasSuffix
				? 'rounded-r-none'
				: ''}"
		/>
	</div>
</div>
