<script>

	import { Navbar, Footer } from '$components';

	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

</script>

<div class="">
	<Navbar />
	{@render children()}
	<Footer />
</div>
