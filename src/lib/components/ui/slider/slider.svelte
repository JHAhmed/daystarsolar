<script>
	import { Slider as SliderPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	let className = undefined;
	// export let value = [0];
	export let value = 0;
	export { className as class };
</script>

<SliderPrimitive.Root
	bind:value
	class={cn("relative flex w-full touch-none select-none items-center", className)}
	{...$$restProps}
	let:thumbs
	let:ticks
>
	<span class="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full">
		<SliderPrimitive.Range class="bg-primary absolute h-full" />
	</span>

	{#each ticks as tick}
		<SliderPrimitive.Tick {tick} class="bg-black/50 h-1/4 w-px rounded-full"/>
	{/each}

	{#each thumbs as thumb}
		<SliderPrimitive.Thumb
			{thumb}
			class="border-primary bg-background ring-offset-background focus-visible:ring-ring block size-4 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
		/>
	{/each}
</SliderPrimitive.Root>
