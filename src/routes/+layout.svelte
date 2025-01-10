<script>
	import { Navbar, Footer } from '$components';

	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
</svelte:head>

<div class="">
	<Navbar />
	{@render children()}
	<Footer />
</div>
