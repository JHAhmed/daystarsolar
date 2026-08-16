<script>
	import { onMount } from 'svelte';
	import { Seo, PageHeader, Button } from '$components';
	import { reveal } from '$motion';
	import { SmartCubeIcon } from '$icons';
	import model from '$lib/solar.glb';

	/**
	 * Augmented reality preview of a rooftop panel.
	 *
	 * model-viewer is loaded from the npm package on mount rather than from a
	 * unpkg <script> tag in the head. It defines a custom element and touches
	 * the DOM at import time, so it cannot run during SSR — and the CDN copy
	 * was a third-party runtime dependency on a page that already ships the
	 * package.
	 *
	 * The old /ar2 route, a second AR implementation built on A-Frame and
	 * AR.js loaded from raw.githack.com, is not carried over.
	 */
	let ready = $state(false);
	let failed = $state(false);

	onMount(async () => {
		try {
			await import('@google/model-viewer');
			ready = true;
		} catch {
			failed = true;
		}
	});
</script>

<Seo
	title="View Solar Panels in AR | Daystar Solar"
	description="Preview a Daystar Solar rooftop panel in augmented reality, right from your phone or browser, before you install."
	path="/ar" />

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader
		align="center"
		eyebrow="Augmented Reality"
		eyebrowPosition="above"
		lead="Preview a Daystar Solar rooftop panel in augmented reality, right from your phone or browser, before you install.">
		See it on your roof
	</PageHeader>

	<div
		data-reveal
		{@attach reveal({ y: 20, delay: 0.1 })}
		class="mt-12 overflow-hidden rounded-panel border border-ink-200 bg-ink-50">
		{#if failed}
			<div class="flex min-h-96 flex-col items-center justify-center gap-4 p-10 text-center">
				<p class="text-lead text-ink-600">The 3D viewer could not be loaded.</p>
				<Button href="/products" variant="subtle" size="md">Browse our products instead</Button>
			</div>
		{:else if ready}
			<model-viewer
				src={model}
				ar
				ar-scale="fixed"
				ar-modes="scene-viewer quick-look webxr"
				camera-controls
				auto-rotate
				xr-environment
				interaction-prompt="none"
				shadow-intensity="1"
				environment-image="neutral"
				alt="Interactive 3D model of a Daystar Solar rooftop panel"
				style="width: 100%; height: min(70vh, 34rem); background: transparent;">
				<button
					slot="ar-button"
					class="absolute bottom-8 left-1/2 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full border border-ink-200 bg-white px-5 text-sm font-medium text-night-900 shadow-lift transition-transform duration-160 ease-out active:scale-[0.97]">
					<SmartCubeIcon class="size-5 text-sky-600" />
					View in AR
				</button>
			</model-viewer>
		{:else}
			<div class="flex min-h-96 items-center justify-center p-10">
				<div
					class="size-9 animate-spin rounded-full border-4 border-solar-400 border-t-transparent"
					role="status"
					aria-label="Loading 3D viewer">
				</div>
			</div>
		{/if}
	</div>

	<p class="mt-5 text-center text-sm text-ink-500">
		On a phone, tap <span class="font-medium text-night-900">View in AR</span> to place the panel in your
		own space.
	</p>
</section>
