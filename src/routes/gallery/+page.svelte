<script>
	import { Seo, CTA, PageHeader, Button } from '$components';
	import { revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';

	/**
	 * The lightbox is a native <dialog> opened with showModal(). That gives
	 * focus trapping, Escape to close, inert background content and the ::backdrop
	 * pseudo-element for free — all of which the previous hand-rolled overlay
	 * lacked. It also had a stray <dig> typo for a tag name and a fixed
	 * half-viewport box that cropped portrait photographs.
	 */

	const modules = import.meta.glob('/src/lib/images/gallery/**/*.webp', {
		eager: true,
		query: { enhanced: true }
	});

	const items = Object.entries(modules).map(([path, module]) => {
		const segments = path.split('/');
		const project = segments[segments.length - 2];
		return {
			src: module.default,
			project,
			title: project.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
			path
		};
	});

	let dialog = $state();
	let active = $state(null);

	function open(item) {
		active = item;
		dialog?.showModal();
	}

	function close() {
		dialog?.close();
	}
</script>

<Seo
	title="Gallery | Daystar Solar"
	description="Proof is in the panels. Browse Day Star Solar's gallery of powered homes and businesses across South India."
	ogDescription="View the latest solar installations and projects from Daystar Solar, a leading solar energy solutions provider in south india."
	path="/gallery"
	schema={pageSchema('CollectionPage', {
		path: '/gallery',
		name: 'Gallery',
		description:
			'View the latest solar installations and projects from Daystar Solar, a leading solar energy solutions provider in south india.'
	})} />

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader>Commercial Solar Installation</PageHeader>

	<div
		class="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
		{@attach revealGroup({ variant: 'blur', y: 14, stagger: 0.04 })}>
		{#each items as item (item.path)}
			<button
				type="button"
				data-reveal
				onclick={() => open(item)}
				class="group/tile block overflow-hidden rounded-card transition-transform duration-200 ease-out active:scale-[0.985]">
				<enhanced:img
					src={item.src}
					alt="Daystar Solar installation at {item.title}"
					loading="lazy"
					class="aspect-4/3 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover/tile:scale-[1.05]" />
			</button>
		{/each}
	</div>
</section>

<dialog
	bind:this={dialog}
	onclose={() => (active = null)}
	onclick={(event) => {
		if (event.target === dialog) close();
	}}
	class="lightbox m-auto max-h-[92dvh] max-w-[min(64rem,92vw)] bg-transparent p-0 backdrop:bg-night-950/70 backdrop:backdrop-blur-sm">
	{#if active}
		<div class="flex flex-col gap-4">
			<enhanced:img
				src={active.src}
				alt="Daystar Solar installation at {active.title}"
				class="max-h-[72dvh] w-full rounded-panel object-contain" />

			<div class="flex flex-wrap items-center justify-between gap-3">
				<p class="font-display text-heading-sm text-white">{active.title}</p>

				<div class="flex gap-2">
					<Button variant="outline" size="sm" onclick={close}>Close</Button>
					<Button href="/projects/{active.project}" variant="solar" size="sm" chip>
						View Project
					</Button>
				</div>
			</div>
		</div>
	{/if}
</dialog>

<CTA />

<style>
	.lightbox {
		border: none;
		opacity: 0;
		transform: scale(0.97);
		transition:
			opacity var(--duration-base) var(--ease-out-quart),
			transform var(--duration-base) var(--ease-out-quart),
			overlay var(--duration-base) allow-discrete,
			display var(--duration-base) allow-discrete;
	}

	.lightbox[open] {
		opacity: 1;
		transform: scale(1);
	}

	/* Entry state. Without this the dialog would pop straight to its open
	   values on the first frame instead of transitioning into them. */
	@starting-style {
		.lightbox[open] {
			opacity: 0;
			transform: scale(0.97);
		}
	}

	.lightbox::backdrop {
		opacity: 0;
		transition:
			opacity var(--duration-base) var(--ease-out-quart),
			overlay var(--duration-base) allow-discrete,
			display var(--duration-base) allow-discrete;
	}

	.lightbox[open]::backdrop {
		opacity: 1;
	}

	@starting-style {
		.lightbox[open]::backdrop {
			opacity: 0;
		}
	}
</style>
