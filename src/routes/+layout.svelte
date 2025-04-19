<script>
	import { Navbar, Footer } from '$components';
	import { page } from '$app/stores';
	import { injectAnalytics } from '@vercel/analytics/sveltekit'
	import { metaHome } from '$lib';

	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
	console.log($page.url.pathname);
</script>

<svelte:head>
	<title>Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
	<meta name="robots" content="index, follow" />

	<!-- Open Graph tags for social sharing -->
	<meta property="og:title" content="Daystar Solar" />
	<meta
		property="og:description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
	<meta property="og:image" content={metaHome} />
</svelte:head>

{#if $page.url.pathname == '/report-view' || $page.url.pathname == '/ar'}
	<div class="">
		{@render children()}
	</div>
{:else}
	<div class="">
		<Navbar isCalc={$page.url.pathname == '/calculator'} />
		<!-- <div class="relative">
		<Navbar isCalc={$page.url.pathname == '/calculator'} />
	</div> -->
		{@render children()}
		<Footer />
	</div>
{/if}
