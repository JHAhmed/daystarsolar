<script>
	import { cn } from '$lib/utils.js';
	import IndiaMartLogo from '$lib/assets/indiamartlogo.png';
	// export let strokeWidth = 1.5;
	// export let color = "currentColor";

	let { class: className = '' } = $props();
</script>

<!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={strokeWidth} stroke={color} class={cn('size-4', className)}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
</svg> -->

<div class="rounded-full bg-white p-2">
	<img
		src={IndiaMartLogo}
		width="256"
		height="256"
		alt="IndiaMart Logo"
		class={cn('size-4', className)}
	/>
</div>
