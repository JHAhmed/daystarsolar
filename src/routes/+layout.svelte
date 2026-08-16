<script>
	import '../app.css';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { Navbar, Footer } from '$components';
	import { initSmoothScroll, resetScroll, useGsap } from '$motion';

	let { children } = $props();

	/** The PDF renderer loads this route in a headless browser; it gets no chrome. */
	const bare = $derived(page.url.pathname === '/report-view');
	const minimalNav = $derived(page.url.pathname.startsWith('/calculator'));

	$effect(() => initSmoothScroll());

	afterNavigate(() => {
		resetScroll();
		// Section heights change between routes; without this, triggers created
		// on the new page measure against the old page's layout.
		const { ScrollTrigger } = useGsap();
		ScrollTrigger.refresh();
	});
</script>

{#if bare}
	{@render children()}
{:else}
	<div class="flex min-h-dvh flex-col">
		<Navbar minimal={minimalNav} />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>

	<Toaster
		richColors
		expand
		position="bottom-right"
		toastOptions={{ style: 'font-family: var(--font-sans);' }}
	/>
{/if}
