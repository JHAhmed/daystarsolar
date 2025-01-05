<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { ArrowIcon, ChevronIcon } from '$icons';
	import { Calculator } from '$components';

	import { sampleImage1, sampleImage2, sampleImage3 } from '$lib';

	import { animate, inView } from 'motion';
	import { on } from 'svelte/events';

	import LogoCloud from '$components/LogoCloud.svelte';

	let calculator;

	function scrollToView() {
		if (browser) {
			calculator.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function animateIn(
		element,
		args = { duration: 0.5, delay: 0, scale: 1, x: 0, y: 0, blur: 0, amount: 0.5 }
	) {
		inView(
			element,
			() => {
				const animation = animate(
					element,
					{
						opacity: 1,
						scale: [args.scale, 1],
						x: [args.x, 0],
						y: [args.y, 0],
						filter: [`blur(${args.blur}px)`, 'blur(0px)'] // Add blur animation
					},
					{
						duration: args.duration,
						delay: args.delay
					}
				);
			},
			{ amount: args.amount }
		);
	}
</script>

<!-- <div class="flex flex-col h-screen space-y-8 items-center justify-center">
	<h2 class="font-sans text-5xl font-extralight">Hi, there!</h2>
	<a href="/arjs" class="px-4 py-2 border-2 bg-white rounded-full border-black">AR.js Preview</a>
	<a href="/aframe" class="px-4 py-2 border-2 bg-white rounded-full border-black">A-Frame Preview</a>
</div> -->

<section class="mx-auto px-32 py-16 pb-0">
	<div class="mb-16 grid grid-cols-12">
		<div class="col-span-5">
			<div class="mb-12 space-y-12">
				<h2 class="text-md mb-4 font-semibold uppercase tracking-widest">Daystar Solar</h2>
				<div class="h-[2px] w-8 bg-black"></div>
				<h1 class="mb-8 max-w-xl font-serif text-4xl md:text-5xl">
					Effective solar energy made simple
				</h1>
				<button
					on:click={scrollToView}
					class="flex items-center gap-2 rounded-md bg-orange-200 p-4"
				>
					<p class="mx-4 text-lg font-medium tracking-tighter">Solar Calculator</p>
					<div
						class="flex cursor-pointer items-center justify-center rounded-md bg-white p-2 text-black"
					>
						<ArrowIcon className="size-5 stroke-2" />
					</div>
				</button>
			</div>
			<div class="mb-12 mt-24 max-w-md border-l-4 bg-gray-50 p-6">
				<h3 class="mb-4 font-medium">Our Impact</h3>
				<p class="text-gray-600">
					Lorem ipsum dolor amet, consectetur adipiscing elit. Per sit magna hac commodo sed crass
					ridiculus molestie sudda. Ultricies netus hac commodo netus sit erat sapien ligula.
					Senectus lectus est ipsum facilisis tortor cubilia.
				</p>
			</div>
		</div>

		<div class="col-span-7 grid gap-8 md:grid-cols-3">
			<figure
				class="motion-preset-focus relative my-8 py-4 motion-duration-1000 motion-delay-[200ms]"
			>
				<button
					class="absolute -right-4 top-0 transform rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
				>
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				</button>
				<img
					src={sampleImage1}
					alt="Modern house with solar panels installed on sloped roof with blue windows"
					class="h-[90%] w-full rounded-md object-cover"
				/>
				<figcaption class="text-md my-4 text-center font-light uppercase tracking-widest">
					Marina Mall, ECR
				</figcaption>
			</figure>

			<figure
				class="motion-preset-focus relative my-8 py-4 motion-duration-1000 motion-delay-[500ms]"
			>
				<button
					class="absolute -bottom-0 -right-4 transform rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
				>
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				</button>
				<p class="text-md my-4 text-center font-light uppercase tracking-widest">
					SPR City, Perambur
				</p>
				<img
					src={sampleImage2}
					alt="Solar-powered street light against cloudy sky with modern design"
					class="h-[90%] w-full rounded-md object-cover"
				/>
			</figure>

			<figure
				class="motion-preset-focus relative my-8 py-4 motion-duration-1000 motion-delay-[800ms]"
			>
				<button
					class="absolute -right-4 top-0 transform rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
				>
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				</button>

				<img
					src={sampleImage3}
					alt="Residential brick house with solar panels installed on roof and outdoor seating area"
					class="h-[90%] w-full rounded-md object-cover"
				/>
				<figcaption class="text-md my-4 text-center font-light uppercase tracking-widest">
					Mr. Gautam, Chennai
				</figcaption>
			</figure>
		</div>
	</div>

	<div class=" opacity-0" use:animateIn={{ y: 25 }} bind:this={calculator}>
		<Calculator />
	</div>
</section>

<div class=" w-full bg-darkgray p-24">
	<p class="mx-auto text-center text-2xl font-extralight tracking-tight text-white">
		<span class="font-light">We specialize in end-to-end solar power plant projects</span>, covering
		consulting, innovative concepts, detailed design, flawless execution, and ongoing maintenance.
		Since 2012, we've been a trusted solar power integrator, partnering with Panasonic Solar for
		panels and using top-quality imported inverters.
		<span class="font-light"
			>Our focus on exceptional design and engineering ensures long-lasting, reliable systems.</span
		>
	</p>
</div>

<div class="my-16 mt-24">
	<LogoCloud />
</div>
