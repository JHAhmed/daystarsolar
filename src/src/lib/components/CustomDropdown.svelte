<script>
	import { Combobox } from 'bits-ui';
	import { Label } from '$lib/components/ui/label/index.js';

	let {
		label = 'State',
		placeholder = 'Tamil Nadu',
		options = [],
		value = $bindable('tamil-nadu')
	} = $props();

	let touchedInput = $state(false);
	let filteredStates = $derived(
		value && touchedInput
			? options.filter((state) => state.value.includes(value.toLowerCase()))
			: options
	);
</script>

<div>
	<Label for="custom-dropdown-{label.toLowerCase()}" class="my-1">{label}</Label>
	<div id="custom-dropdown-{label.toLowerCase()}">
		<Combobox.Root items={filteredStates} bind:inputValue={value} bind:touchedInput required>
			<div class="relative">
				<Combobox.Input
					class="rounded-lg bg-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-gray-200"
					{placeholder}
					aria-label={placeholder}
				/>
			</div>
			<Combobox.Content
				class="w-full rounded-xl border border-muted bg-background px-1 py-3 shadow-popover outline-none"
				sideOffset={8}
			>
				{#each filteredStates as state (state.value)}
					<Combobox.Item
						class="rounded-button flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-muted"
						value={state.value}
						label={state.label}
					>
						{state.label}
						<Combobox.ItemIndicator class="ml-auto" asChild={false} />
					</Combobox.Item>
				{:else}
					<span class="block px-5 py-2 text-sm text-muted-foreground">No results found</span>
				{/each}
			</Combobox.Content>
			<Combobox.HiddenInput name="favoriteState" />
		</Combobox.Root>
	</div>
</div>
