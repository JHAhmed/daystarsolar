<script>
	import { ArrowIcon } from '$icons';

	let data = $props(); 
	console.log(data.data.solar);
</script>

<svelte:head>
	<title>Error | Daystar Solar</title>
</svelte:head>

<div class="flex flex-col h-screen items-center justify-center space-y-8 p-4 text-center">
	<h1 class="text-3xl md:text-5xl font-light text-black max-w-5xl">
		{#if data.data.solar}
			Good news! <span class="text-black">You already have a solar net metering service</span>.
		{:else}
			Oops! <span class="text-black">Report generation failed</span>.
		{/if}
		
	</h1>
	<p class="text-gray-600 max-w-md">
		{#if data.data.solar}
			It seems you already have a solar net metering service. Contact us for further assistance.
		{:else}
			Data not found for report. But we’ve got your back, reach out to us! 
		{/if}
	</p>
	<a
		href="contact/"
		class="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-gray-100 p-3"
	>
		<span class="ml-2 mr-6 tracking-tighter">Contact Us</span>
		<span class="justi fy-center flex items-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
			<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
		</span>
	</a>
</div>
