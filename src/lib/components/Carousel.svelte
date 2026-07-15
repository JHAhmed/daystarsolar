<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { ArrowIcon } from '$icons';
	import { sampleImage1, sampleImage2, sampleImage3 } from '$lib';

	export let heroProjects = [
		{ text: 'Marina Mall, OMR', src: sampleImage1, href: '/projects/marina-mall' },
		{ text: 'Sana School, Egmore', src: sampleImage2, href: '/projects/sana-school' },
		{ text: 'Trove, Central', src: sampleImage3, href: '/projects/trove' },
		{ text: 'Project 4', src: sampleImage2, href: '/projects/project-4' }
	];

	heroProjects = heroProjects.sort(() => .5 - Math.random());

	const breakpoints = { md: 768, lg: 1024 };
	const itemsPerBreakpoint = { default: 1, md: 2, lg: 3 };
	const transitionDuration = 500;
	const intervalDuration = 3000;
	const totalItems = heroProjects.length;

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
	$: duplicatedProjects = browser
		? [...heroProjects, ...heroProjects.slice(0, visibleItems)]
		: [...heroProjects];

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
					trackElement.style.transform = `translateX(0%)`;
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
		{#each duplicatedProjects as project, i (project.text + i)}
			<div class="h-full flex-shrink-0 px-2" style={`width: ${itemWidthPercent}%`}>
				<figure class="relative my-2 h-full md:my-4">
					{#if i % 2 === 0}
						<a
							href={project.href}
							class="absolute right-3 top-3 z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white lg:flex"
							aria-label={`View project ${project.text}`}>
							<ArrowIcon className="size-3 rotate-[-135deg]" />
						</a>
						<img
							src={project.src}
							alt={project.text}
							class="h-[80%] w-full rounded-xl object-cover lg:h-[90%]"
							loading="lazy" />
						<p class="mt-3 text-center text-xs font-medium uppercase tracking-widest text-neutral-400">
							{project.text}
						</p>
					{:else}
						<a
							href={project.href}
							class="absolute bottom-3 right-3 z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white lg:flex"
							aria-label={`View project ${project.text}`}>
							<ArrowIcon className="size-3 rotate-[-135deg]" />
						</a>
						<p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-neutral-400">
							{project.text}
						</p>
						<img
							src={project.src}
							alt={project.text}
							class="h-[80%] w-full rounded-xl object-cover lg:h-[90%]"
							loading="lazy" />
					{/if}
				</figure>
			</div>
		{/each}
	</div>
</div>