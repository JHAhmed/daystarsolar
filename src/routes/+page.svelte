<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { ArrowIcon, ChevronIcon } from '$icons';
	import { SliderBox } from '$components';

	import { sampleImage1, sampleImage2, sampleImage3 } from '$lib';

	let calculator;

	function scrollToView() {
		if (browser) {
			calculator.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- <div class="flex flex-col h-screen space-y-8 items-center justify-center">
	<h2 class="font-sans text-5xl font-extralight">Hi, there!</h2>
	<a href="/arjs" class="px-4 py-2 border-2 bg-white rounded-full border-black">AR.js Preview</a>
	<a href="/aframe" class="px-4 py-2 border-2 bg-white rounded-full border-black">A-Frame Preview</a>
</div> -->

<!-- <div class="flex flex-col space-y-16 p-32 items-center justify-center"> -->

<section class="mx-auto px-32 py-16">

	<div class="grid grid-cols-12 mb-16">

		<div class="col-span-5">
			<div class="mb-12 space-y-12">
				<h2 class="mb-4 text-md font-semibold uppercase tracking-widest">Daystar Solar</h2>
				<div class="w-8 h-[2px] bg-black"></div>
				<h1 class="mb-8 font-serif max-w-xl text-4xl md:text-5xl">Effective solar energy made simple</h1>
				<button on:click={scrollToView} class="flex items-center gap-2 rounded-md bg-[#FFF3E4] p-4">
					<p class="mx-4 font-medium tracking-tighter text-lg">Solar Calculator</p>
					<div class="bg-white text-black rounded-md p-2 flex items-center justify-center cursor-pointer">
						<ArrowIcon className="size-5 stroke-2"/>
					</div>
				</button>
			</div>
			<div class="mb-12 max-w-md border-l-4 bg-gray-50 p-6 mt-24">
				<h3 class="mb-4 font-medium">Our Impact</h3>
				<p class="text-gray-600">
					Lorem ipsum dolor amet, consectetur adipiscing elit. Per sit magna hac commodo sed crass
					ridiculus molestie sudda. Ultricies netus hac commodo netus sit erat sapien ligula. Senectus
					lectus est ipsum facilisis tortor cubilia.
				</p>
			</div>
		</div>

		<div class="grid gap-8 md:grid-cols-3 col-span-7">

			<figure class="py-4 my-8 relative motion-preset-fade-lg motion-delay-100">
				<div class="absolute -right-4 top-0 bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1">
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				  </div>
				<img
					src={sampleImage1}
					alt="Modern house with solar panels installed on sloped roof with blue windows"
					class="h-[90%] w-full rounded-md object-cover"
				/>
				<figcaption class="uppercase my-4 text-md font-light tracking-widest text-center">Marina Mall, ECR</figcaption>
			</figure>

			<figure class="py-4 my-8 relative motion-preset-fade-lg motion-delay-200">
				<div class="absolute -right-4 -bottom-0 bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1">
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				  </div>
				<figcaption class="uppercase my-4 text-md font-light tracking-widest text-center">SPR City, Perambur</figcaption>
				<img
					src={sampleImage2}
					alt="Solar-powered street light against cloudy sky with modern design"
					class="h-[90%] w-full rounded-md object-cover"
				/>
			</figure>

			<figure class="py-4 my-8 relative motion-preset-fade-lg motion-delay-300">
				
				<div class="absolute -right-4 top-0 bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1">
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				  </div>
				  
				<img
					src={sampleImage3}
					alt="Residential brick house with solar panels installed on roof and outdoor seating area"
					class="h-[90%] w-full rounded-md object-cover"
				/>
				<figcaption class="uppercase my-4 text-md font-light tracking-widest text-center">Mr. Gautam, Chennai</figcaption>
			</figure>

		</div>

	</div>

	<div class="" bind:this={calculator}>
		<SliderBox />
	</div>

</section>


<!-- </div> -->
