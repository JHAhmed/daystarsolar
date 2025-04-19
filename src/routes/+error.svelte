<script>
	import { ArrowIcon } from '$icons';

</script>

<svelte:head>
	<title>404 | Daystar Solar</title>
</svelte:head>

<div class="flex h-screen items-center justify-center">
	<h1 class="text-6xl font-light text-black">
		This page does not <span class="text-red-400">exist</span>!
	</h1>
	<a
		href="/"
		class="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-gray-100 p-3"
	>
		<span class="ml-2 mr-6 tracking-tighter">Go Home</span>
		<span class="justi fy-center flex items-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
			<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
		</span>
	</a>
</div>
