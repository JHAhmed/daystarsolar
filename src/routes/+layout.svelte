<script>
	import { Navbar, Footer } from '$components';
	import { page } from '$app/stores';

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
	
</svelte:head>

<div class="">
		<Navbar isCalc={$page.url.pathname == '/calculator'} />
	<!-- <div class="relative">
		<Navbar isCalc={$page.url.pathname == '/calculator'} />
	</div> -->
	{@render children()}
	<Footer />
</div>
