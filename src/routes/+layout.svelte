<script>
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

</script>

<div class="">
	{@render children()}
</div>
