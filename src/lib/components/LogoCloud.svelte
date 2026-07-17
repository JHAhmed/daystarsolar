<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { sampleImage1 } from '$lib';

	export let carouselItems = [
		{ image: sampleImage1, alt: '' },
	];

	const breakpoints = { md: 768, lg: 1024 };
	const itemsPerBreakpoint = { default: 1, md: 2, lg: 3 };
	const transitionDuration = 500; // ms
	const intervalDuration = 3000; // ms
	const totalItems = carouselItems.length;

	let currentIndex = 0;
	let trackElement;
	let intervalId;
	let windowWidth = browser ? window.innerWidth : 0;
	let visibleItems = getVisibleItemCount(windowWidth);
	let prevVisibleItems = visibleItems;

	function getVisibleItemCount(width) {
		if (width >= breakpoints.lg) return itemsPerBreakpoint.lg;
		if (width >= breakpoints.md) return itemsPerBreakpoint.md;
		return itemsPerBreakpoint.default;
	}

	$: visibleItems = getVisibleItemCount(windowWidth);
	$: itemWidthPercent = 100 / visibleItems;
	$: duplicatedItems = browser
		? [...carouselItems, ...carouselItems.slice(0, visibleItems)]
		: [...carouselItems];

	$: if (browser && visibleItems !== prevVisibleItems) {
		prevVisibleItems = visibleItems;

		if (trackElement) {
			currentIndex = 0;
			trackElement.style.transition = 'none';
			trackElement.style.transform = `translateX(0%)`;
		}
	}

	function advanceCarousel() {
		if (!trackElement || totalItems === 0 || visibleItems === 0) return;

		currentIndex++;

		trackElement.style.transition = `transform ${transitionDuration}ms ease-in-out`;
		trackElement.style.transform = `translateX(-${currentIndex * itemWidthPercent}%)`;

		if (currentIndex === totalItems) {
			setTimeout(() => {
				if (trackElement) {
					trackElement.style.transition = 'none';
					currentIndex = 0;
					trackElement.style.transform = 'translateX(0%)';
				}
			}, transitionDuration);
		}
	}

	onMount(() => {
		if (browser) {
			windowWidth = window.innerWidth;
			intervalId = setInterval(advanceCarousel, intervalDuration);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="relative h-full w-full overflow-hidden">
	<div class="flex h-full" bind:this={trackElement}>
		{#each duplicatedItems as item, i (item.text + i)}
			<div class="h-full flex-shrink-0 px-2" style={`width: ${itemWidthPercent}%`}>
				<figure class="motion-preset-focus relative my-2 h-full motion-duration-1000 md:my-4">
					<img
						src={item.image}
						alt={item.alt}
						class="h-[80%] w-full rounded-md object-cover lg:h-[90%]"
						loading="lazy"
					/>
				</figure>
			</div>
		{/each}
	</div>
</div>
