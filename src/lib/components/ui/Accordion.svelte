<script>
	import { cn } from '$lib/utils.js';
	import { ChevronIcon } from '$icons';

	/**
	 * Disclosure list, used by /faq and /services.
	 *
	 * Built on a button plus a region rather than <details>, because a closed
	 * <details> sets its content to display:none and there is nothing for a
	 * transition to animate from. Content stays in the DOM and the panel
	 * animates from `grid-template-rows: 0fr` to `1fr`, which reaches the
	 * content's natural height without measuring it and stays interruptible if
	 * someone toggles rapidly.
	 *
	 * @param items  [{ question | title, answer | description }]
	 * @param html   Render answers as HTML. Only for the hand-authored service
	 *               copy in $data — never for anything user-supplied.
	 */
	let { items = [], html = false, single = false, class: className = '' } = $props();

	let openStates = $state(items.map(() => false));

	function toggle(index) {
		if (single) {
			const wasOpen = openStates[index];
			openStates = items.map((_, i) => (i === index ? !wasOpen : false));
		} else {
			openStates[index] = !openStates[index];
		}
	}

	const id = $props.id();
</script>

<div class={cn('divide-y divide-ink-200 border-y border-ink-200', className)}>
	{#each items as item, i (item.question ?? item.title)}
		{@const label = item.question ?? item.title}
		{@const body = item.answer ?? item.description}
		<div>
			<h3>
				<button
					type="button"
					onclick={() => toggle(i)}
					aria-expanded={openStates[i]}
					aria-controls="{id}-panel-{i}"
					class="group/acc flex w-full items-center justify-between gap-6 px-1 py-5 text-left transition-colors duration-[160ms] ease-out hover:text-solar-600 md:py-6"
				>
					<span class="font-sans text-base font-medium text-night-900 md:text-lg">{label}</span>
					<span
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-100 text-night-900 transition-[background-color,transform] duration-[220ms] ease-out group-hover/acc:bg-ink-200"
						class:is-open={openStates[i]}
					>
						<ChevronIcon class="size-4 rotate-90" strokeWidth="2" />
					</span>
				</button>
			</h3>

			<div
				id="{id}-panel-{i}"
				class="panel"
				class:is-open={openStates[i]}
				inert={!openStates[i] || undefined}
			>
				<div class="overflow-hidden">
					<div class="pr-10 pb-6 text-sm leading-relaxed text-ink-600 md:text-base">
						{#if html}
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html body}
						{:else}
							{body}
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.panel {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows var(--duration-base) var(--ease-out-quart),
			opacity var(--duration-fast) ease;
	}

	.panel.is-open {
		grid-template-rows: 1fr;
		opacity: 1;
	}

	.is-open :global(svg) {
		transform: rotate(-90deg);
	}

	:global(.group\/acc svg) {
		transition: transform var(--duration-base) var(--ease-out-quart);
	}
</style>
