<script>
	import { goto } from '$app/navigation';
	import { ArrowIcon } from '$icons';
	import { SmartCubeIcon } from '$icons';

	export let text = 'Solar Calculator';
	export let href = '/contact';
	export let button = false;
	export let alt = false;
	export let action = () => {};
	export let hasIcon = true;
</script>

{#if button}
	{#if alt}
		<button on:click={goto("/ar")} class="flex font-sans text-sm md:text-lg font-medium text-black no-underline">
			<div class="mr-2 flex items-center justify-center rounded-lg bg-blue-300 px-4 py-2">
				{text}
			</div>
			{#if hasIcon}
				<div class="flex size-16 items-center justify-center rounded-lg bg-blue-300">
					<SmartCubeIcon className="size-6" />
				</div>
			{/if}
		</button>
	{:else}
		<button on:click={action} class="flex font-sans text-xl font-medium text-black no-underline">
			<div class="mr-2 flex items-center justify-center rounded-lg bg-orange-400 px-8 py-4">
				{text}
			</div>
			{#if hasIcon}
				<div class="flex size-16 items-center justify-center rounded-lg bg-orange-400">
					<ArrowIcon className="size-6" />
				</div>
			{/if}
		</button>
	{/if}
{:else}
	<a {href} class="flex font-sans text-xl font-medium text-black no-underline">
		<div class="mr-2 flex items-center justify-center rounded-lg bg-orange-400 px-8 py-4">
			{text}
		</div>
		{#if hasIcon}
			<div class="flex size-16 items-center justify-center rounded-lg bg-orange-400">
				<ArrowIcon className="size-6" />
			</div>
		{/if}
	</a>
{/if}
