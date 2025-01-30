<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { ArrowIcon, ChevronIcon } from '$icons';
	import { Calculator } from '$components';

	import { sampleImage1, sampleImage2, sampleImage3 } from '$lib';
	import { landingImage1, landingImage2, landingImage3, landingImage4, landingImage5, quotationMark } from '$lib';

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

<svelte:head>
	<title>Daystar Solar - Solar Energy Solutions Provider in South India</title>
	<meta
		name="description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
</svelte:head>

<section class="mx-auto px-32 py-16 pb-0">
	<div class="mb-16 grid grid-cols-12">
		<div class="col-span-5">
			<div class="mb-12 space-y-12">
				<!-- <h2 class="text-md mb-4 font-semibold uppercase tracking-widest">Daystar Solar</h2> -->
				<!-- <div class="h-[2px] w-8 bg-black"></div> -->
				<!-- <h1 class="mb-8 max-w-xl font-serif text-4xl md:text-5xl"> -->
				<h1 class="my-12 max-w-xl py-8 text-4xl font-medium md:text-6xl">
					Effective <span class="text-orange-400">solar</span> energy made simple
				</h1>
				<button on:click={scrollToView} class="flex items-center gap-2 rounded-md bg-blue-200 p-4">
					<p class="mx-4 text-lg font-medium tracking-tighter">Solar Calculator</p>
					<div
						class="flex cursor-pointer items-center justify-center rounded-md bg-white p-2 text-black"
					>
						<ArrowIcon className="size-5 stroke-2" />
					</div>
				</button>
			</div>
			<div class="mb-12 mt-24 max-w-md border-l-4 bg-gray-50 p-6">
				<h3 class="mb-4 font-medium">What We Do</h3>
				<p class="text-gray-600">
					Sustainable development is the creed that underpins Daystar Solar's bespoke initiatives to
					protect the environment, strengthen communities and propel responsible growth.
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
					loading="lazy"
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
					loading="lazy"
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
					loading="lazy"
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

<div class=" w-full bg-darkgray p-24 my-16">
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


<section class="w-full mx-auto px-32 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

	<!-- Left Column -->
	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.100 }} class="opacity-0 space-y-8">
		<p class="max-w-xl text-lg font-medium leading-relaxed">
			Established in 2012, we are a full-service solar power plant integrator, specializing in
			consulting, innovative solutions, design, execution, and maintenance.
		</p>

		<div class="relative overflow-hidden rounded-2xl">
			<img
				src={landingImage1}
				alt="Solar panels at sunset, showcasing a large-scale installation with sun setting in background"
				class="h-[300px] w-full object-cover"
			/>
		</div>
	</div>

	<!-- Middle Column -->
	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.500 }} class="opacity-0 space-y-4 text-center flex items-left justify-center flex-col lg:text-left p-8">
		<div class=" bg-yellow-100 rounded-full p-3 w-fit">
			<img src={quotationMark} class="size-4 text-green-800" alt="">
		</div>
		<h1 class="text-3xl font-medium lg:text-5xl">
			Ignite your future with
			<span class="text-orange-400">solar</span> energy
		</h1>
	</div>

	<!-- Right Column -->
	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.900 }} class="opacity-0 space-y-8">
		<div class="relative overflow-hidden rounded-2xl">
			<img
				src={landingImage2}
				alt="Solar panel array on hillside surrounded by trees, demonstrating environmental integration"
				class="h-[300px] w-full object-cover"
			/>
		</div>

		<p class="max-w-xl text-lg font-medium leading-relaxed">
			Partnering with Panasonic Solar for panels and top-quality imported inverters, we set our own
			benchmark for design and engineering, ensuring longevity and reliability.
		</p>
	</div>
</section>


<section class="mx-auto w-full px-32 my-16">

	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.100 }} class="opacity-0 flex rounded-lg col-span-2 bg-[#F5F5ED]">

		<img src={sampleImage2} class="img-clip w-48 rounded-l-lg" alt="">
		<div class="flex items-center justify-center">
			<!-- Feature 1 -->
			<div use:animateIn={{ blur: 4, delay: 0.2 }} class="opacity-0 text-center p-4">
			  <p class="text-lg font-medium p-4">
				Zero pollution with high efficiency for maximum positive impact
			  </p>
			</div>
		
			<!-- Divider 1 -->
			<div class=" h-24 w-px bg-gray-300 " ></div>
		
			<!-- Feature 2 -->
			<div use:animateIn={{ blur: 4, delay: 0.6 }} class="opacity-0 text-center p-4">
			  <p class="text-lg font-medium p-4">
				100% fully automatic operation in sync with all power sources
			  </p>
			</div>
		
			<!-- Divider 2 -->
			<div class=" h-24 w-px bg-gray-300 " ></div>
		
			<!-- Feature 3 -->
			<div use:animateIn={{ blur: 4, delay: 1.0 }} class="opacity-0 text-center p-4">
			  <p class="text-lg font-medium p-4">
				Rugged heavy-duty design to produce power for years to come all for free
			  </p>
			</div>
		
			<!-- Divider 3 -->
			<div class=" h-24 w-px bg-gray-300 " ></div>
		
			<!-- Feature 4 -->
			<div use:animateIn={{ blur: 4, delay: 1.4 }} class="opacity-0 text-center p-4">
			  <p class="text-lg font-medium p-4">
				Built-in Max. Power point tracker (MPPT) & a battery-less system with Zero recurring costs
			  </p>
			</div>
		  </div>

	</div>				

</section>


<section class="mx-auto grid w-full px-32 grid-cols-1 gap-8 py-16 lg:grid-cols-2">

	<!-- Top Row -->
	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.100 }} class="opacity-0 relative rounded-lg col-span-2">
		<div class="">
			<img src={landingImage3} class="h-96 w-full object-cover relative rounded-xl" alt="">
			<div class="absolute inset-0 bg-black opacity-40 z-10 w-full h-full rounded-xl"></div>
			<div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex bg-white items-center justify-center rounded-lg">
			<!-- <div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex backdrop-blur-sm items-center justify-center"> -->
				<p class="text-lg font-medium text-black">Our panels provide maximum energy output even on cloudy days.</p>
			</div>
		</div>
	</div>

	<!-- Second Row, First Column -->
	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.500 }} class="opacity-0 relative rounded-lg">
		<div class="">
			<img src={landingImage4} class="h-96 w-full object-cover relative rounded-xl" alt="">
			<div class="absolute inset-0 bg-black opacity-40 z-10 w-full h-full rounded-xl"></div>
			<div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex bg-white items-center justify-center rounded-lg">
			<!-- <div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex backdrop-blur-sm items-center justify-center"> -->
				<p class="text-lg font-medium text-black">Our solar panels are designed to generate maximum energy output, allowing you to rely less on grid power and more on renewable solar energy.
				</p>
			</div>
		</div>
	</div>

	<!-- Second Row, Second Column -->
	<div use:animateIn={{ blur: 8, duration: 1, delay: 0.900 }} class="opacity-0 relative rounded-lg">
		<div class="">
			<img src={landingImage5} class="h-96 w-full object-cover relative rounded-xl" alt="">
			<div class="absolute inset-0 bg-black opacity-40 z-10 w-full h-full rounded-xl"></div>
			<div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex bg-white items-center justify-center rounded-lg">
			<!-- <div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex backdrop-blur-sm items-center justify-center"> -->
				<p class="text-lg font-medium text-black">Built to withstand the harshest weather conditions, our solar panels are incredibly durable and come with a 20-year warranty.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.img-clip {
		/* clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%); */
		clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%);
	}
</style>