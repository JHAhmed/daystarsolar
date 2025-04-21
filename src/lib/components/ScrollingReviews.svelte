<script>
	import { onMount } from 'svelte';
	import { ArrowIcon, ChevronIcon, StarIcon, GoogleIcon } from '$icons';
    import { animateIn } from '$lib';


	const reviews = [
		{
			name: 'Abdul Gani',
			text: 'I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions',
			rating: 5,
			link: 'https://maps.app.goo.gl/FMAS3THVZiBGdDpy7'
		},
		{
			name: 'Ramesh Kothandapany',
			text: 'I have installed 3.2 kv capacity solar panels through daystar solar team. They have provided good support in inspecting, recommending appropriate installation design, completed the core installation process in 2 to 3 days, taken care of end to end process to go via surya ghar scheme.',
			rating: 5,
			link: 'https://maps.app.goo.gl/Y7d3TS5oRV3grdsD9'
		},
		{
			name: 'Bhuvaneshwar C',
			text: 'I had a wonderful experience with Daystar for my solar installation at home. The staff was highly professional, the process was effortless, and the system is running smoothly. I definitely recommend them for both residential and commercial solar needs.',
			rating: 5,
			link: 'https://maps.app.goo.gl/j3aucsbyhs9GDVxNA'
		},
        {
			name: 'Abdul Gani',
			text: 'I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions',
			rating: 5,
			link: 'https://maps.app.goo.gl/FMAS3THVZiBGdDpy7'
		},
		{
			name: 'Ramesh Kothandapany',
			text: 'I have installed 3.2 kv capacity solar panels through daystar solar team. They have provided good support in inspecting, recommending appropriate installation design, completed the core installation process in 2 to 3 days, taken care of end to end process to go via surya ghar scheme.',
			rating: 5,
			link: 'https://maps.app.goo.gl/Y7d3TS5oRV3grdsD9'
		},
        {
			name: 'Abdul Gani',
			text: 'I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions',
			rating: 5,
			link: 'https://maps.app.goo.gl/FMAS3THVZiBGdDpy7'
		},
        {
			name: 'Abdul Gani',
			text: 'I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions',
			rating: 5,
			link: 'https://maps.app.goo.gl/FMAS3THVZiBGdDpy7'
		},
	];
    let loading = false;
	let error = null;

	// onMount(async () => {
	// 	try {
	// 		const response = await fetch('/api/reviews');
	// 		if (!response.ok) throw new Error('Failed to fetch reviews');

	// 		reviews = await response.json();
	// 		loading = false;
	// 	} catch (err) {
	// 		error = err.message;
	// 		loading = false;
	// 	}
	// });

</script>

<!-- Side-scrolling container -->
<div class="relative w-full overflow-hidden">
	<div class="scrollbar-hide overflow-x-auto pb-4">
		<div class="flex space-x-4 pl-4">
			{#if loading}
				<p class="py-8">Loading reviews...</p>
			{:else if error}
				<p class="py-8 text-red-500">Error: {error}</p>
			{:else if reviews.length === 0}
				<p class="py-8">No 5-star reviews found.</p>
			{:else}
				{#each reviews as review, i}
					<div class="w-80 flex-shrink-0">
						<a
							href={review.link}
							target="_blank"
							use:animateIn={{ y: 10, blur: 4, delay: i / 3 }}
							class="group/link relative flex h-full flex-col space-y-4 rounded-xl border-2 border-black bg-white p-6 opacity-0 hover:bg-green-50 md:space-y-8 md:p-8"
						>
							<div
								class="absolute -right-2 -top-2 transform rounded-full bg-green-500 p-1 duration-100 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
							>
								<ArrowIcon color="white" className="size-4 stroke-black -rotate-[135deg]" />
							</div>

							<div class="mb-4 flex items-center justify-between">
								<div class="flex">
									{#each Array(review.rating) as _, i}
										<StarIcon className="size-4 md:size-6 text-yellow-400 stroke stroke-black" />
									{/each}
								</div>
								<GoogleIcon className="size-4 md:size-6" />
							</div>

							<p class="mb-6 flex-grow text-xs text-gray-700 md:text-sm">{review.text}</p>

							<div class="mt-auto">
								<p class="font-semibold text-gray-800">{review.name}</p>
							</div>
						</a>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar but keep functionality */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
