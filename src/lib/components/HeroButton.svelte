<script>
	import { ArrowIcon } from '$icons';

	export let text = 'Solar Calculator';
	export let href = '/contact';
	export let button = false;
	export let action = () => {};
	export let hasIcon = true;
</script>

{#if button}
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

