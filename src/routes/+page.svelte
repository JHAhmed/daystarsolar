<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { ArrowIcon, ChevronIcon, StarIcon, GoogleIcon } from '$icons';
	import { Calculator, HeroButton } from '$components';

	import { sampleImage1, sampleImage2, sampleImage3, animateIn } from '$lib';
	import {
		landingImage1,
		landingImage2,
		landingImage3,
		landingImage4,
		landingImage5,
		quotationMark
	} from '$lib';

	import { animate, inView } from 'motion';
	import { on } from 'svelte/events';

	import ScrollingReviews from '$components/ScrollingReviews.svelte';
	
	let calculator;

	const stats = [
		{ number: '1000', label: 'Customers Served' },
		{ number: '13k', label: 'Megawatt Hours Generated' },
		{ number: '14', label: 'Years Experience' }
	];

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
		}
	];

	function scrollToView() {
		if (browser) {
			calculator.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:head>
	<title>Solar Energy Solutions in South India | Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar is a leading solar energy solutions provider in South India. We offer solar panels, street lights, and distribution boxes for residential and commercial use."
	/>
	<link rel="canonical" href="https://daystar.co.in/" />
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebSite",
			"name": "Daystar Solar",
			"url": "https://daystar.co.in"
		}
	</script>
</svelte:head>

<section class="mx-auto px-6 py-6 pb-0 md:px-16 md:py-16 md:pb-0 lg:px-32">
	<div class="mb-6 grid grid-cols-12 gap-4 md:mb-16">
		<div class="col-span-12 lg:col-span-5">
			<div class="mb-12 space-y-12">
				<h1 class="my-4 max-w-xl py-2 text-4xl font-medium md:my-12 md:py-8 md:text-6xl">
					Effective <span class="text-orange-400">solar</span> energy made simple
				</h1>

				<HeroButton button={true} action={scrollToView} />
			</div>
			<div class="mb-12 mt-24 max-w-md border-l-4 bg-gray-50 p-6">
				<h6 class="mb-4 font-medium">What We Do</h6>
				<p class="text-gray-600">
					Sustainable development is the creed that underpins Daystar Solar's bespoke initiatives to
					protect the environment, strengthen communities and propel responsible growth.
				</p>
			</div>
		</div>

		<div class="col-span-12 grid gap-4 lg:col-span-7 lg:grid-cols-3">
			<figure
				class="motion-preset-focus relative my-2 py-4 motion-duration-1000 motion-delay-[200ms] md:my-8"
			>
				<a
					href="/projects/marina-mall?id=53aDknlFVpSnJg6QAz7ozZ"
					class="absolute -right-4 top-0 transform rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
				>
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				</a>
				<img
					src={sampleImage1}
					alt="Modern house with solar panels installed on sloped roof with blue windows"
					class="h-[90%] w-full rounded-md object-cover"
					loading="lazy"
				/>
				<figcaption class="text-md my-4 text-center font-light uppercase tracking-widest">
					Marina Mall, OMR
				</figcaption>
			</figure>

			<figure
				class="motion-preset-focus relative my-2 py-4 motion-duration-1000 motion-delay-[500ms] md:my-8"
			>
				<a
					href="/projects/sana-school?id=3o9jHuaSgHyYmq3EZ7x4qM"
					class="absolute -bottom-0 -right-4 transform rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
				>
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				</a>
				<p class="text-md my-4 text-center font-light uppercase tracking-widest">
					Sana School, Egmore
				</p>
				<img
					src={sampleImage2}
					alt="Solar-powered street light against cloudy sky with modern design"
					class="h-[90%] w-full rounded-md object-cover"
					loading="lazy"
				/>
			</figure>

			<figure
				class="motion-preset-focus relative my-2 py-4 motion-duration-1000 motion-delay-[800ms] md:my-8"
			>
				<a
					href="/projects/trove?id=2TPzHsTRKMhtm4Jyz1KQWP"
					class="absolute -right-4 top-0 transform rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1"
				>
					<ArrowIcon className="size-4 rotate-[-135deg]" />
				</a>

				<img
					src={sampleImage3}
					alt="Residential brick house with solar panels installed on roof and outdoor seating area"
					class="h-[90%] w-full rounded-md object-cover"
					loading="lazy"
				/>
				<figcaption class="text-md my-4 text-center font-light uppercase tracking-widest">
					Trove, Central
				</figcaption>
			</figure>
		</div>
	</div>

	<div class="my-24 grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x-2">
		{#each stats as stat, i}
			<div
				use:animateIn={{ y: 10, blur: 4, delay: i / 3 }}
				class="flex items-center justify-center space-x-4 text-center opacity-0"
			>
				<p class="text-4xl md:text-5xl lg:text-7xl">
					{stat.number}<span class="font-light text-blue-400">+</span>
				</p>
				<p class="max-w-24 text-left text-xl font-light text-gray-700">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>

<div
	class="mx-auto px-2 py-6 opacity-0 md:px-12 md:py-16 lg:px-32"
	use:animateIn={{ y: 25 }}
	bind:this={calculator}
>
	<Calculator />
</div>

<section class="bg-gray-50 py-8">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-2xl tracking-[-0.07em] md:text-4xl">
			What Our Customers Say
		</h2>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
			{#each reviews as review, i}
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
			{/each}
		</div>
	</div>
</section>

<div class="my-6 w-full bg-green-600 p-8 md:my-16 md:p-24">
	<p class="mx-auto text-center text-lg font-extralight tracking-tight text-white md:text-2xl">
		<span class="font-light">We specialize in end-to-end solar power plant projects</span>, covering
		consulting, innovative concepts, detailed design, flawless execution, and ongoing maintenance.
		Since 2012, we've been a trusted solar power integrator, partnering with Panasonic Solar for
		panels and using top-quality imported inverters.
		<span class="font-light"
			>Our focus on exceptional design and engineering ensures long-lasting, reliable systems.</span
		>
	</p>
</div>

<section
	class="mx-auto grid w-full grid-cols-1 gap-8 px-6 py-6 md:px-16 md:py-16 lg:grid-cols-3 lg:px-32"
>
	<!-- Left Column -->
	<div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }} class="space-y-8 opacity-0">
		<p class="text-md max-w-xl font-medium leading-relaxed md:text-lg">
			Established in 2012, we are a full-service solar power plant integrator, specializing in
			consulting, innovative solutions, design, execution, and maintenance.
		</p>

		<div class="relative overflow-hidden rounded-2xl">
			<img
				src={landingImage1}
				alt="Solar panels at sunset, showcasing a large-scale installation with sun setting in background"
				class="h-[200px] w-full object-cover md:h-[300px]"
			/>
		</div>
	</div>

	<!-- Middle Column -->
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
		class="items-left flex flex-col justify-center space-y-4 p-8 text-center opacity-0 lg:text-left"
	>
		<div class=" w-fit rounded-full bg-yellow-100 p-3">
			<img src={quotationMark} class="size-4 text-green-800" alt="" />
		</div>
		<h1 class="text-center text-xl font-medium md:text-3xl lg:text-5xl">
			Ignite your future with
			<span class="text-orange-400">solar</span> energy
		</h1>
		<div class=" ml-auto w-fit rounded-full bg-yellow-100 p-3">
			<img src={quotationMark} class="size-4 rotate-180 text-green-800" alt="" />
		</div>
	</div>

	<!-- Right Column -->
	<div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.9 }} class="space-y-8 opacity-0">
		<div class="relative overflow-hidden rounded-2xl">
			<img
				loading="lazy"
				src={landingImage3}
				alt="Solar panel array on hillside surrounded by trees, demonstrating environmental integration"
				class="h-[200px] w-full object-cover md:h-[300px]"
			/>
		</div>

		<p class="text-md max-w-xl font-medium leading-relaxed md:text-lg">
			Partnering with Panasonic Solar for panels and top-quality imported inverters, we set our own
			benchmark for design and engineering, ensuring longevity and reliability.
		</p>
	</div>
</section>

<section class="mx-auto my-6 w-full px-6 md:my-16 md:px-16 lg:px-32">
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
		class="col-span-2 flex flex-col rounded-lg bg-[#F5F5ED] opacity-0 md:flex-row"
	>
		<img
			loading="lazy"
			src={sampleImage1}
			class="img-clip hidden w-full rounded-t-lg object-cover md:w-48 md:rounded-l-lg md:rounded-tr-none lg:block"
			alt=""
		/>
		<div class="flex w-full flex-col items-center justify-center md:flex-row">
			<!-- Feature 1 -->
			<div
				use:animateIn={{ blur: 4, delay: 0.2 }}
				class="w-full p-4 text-center opacity-0 md:w-auto"
			>
				<p class="p-4 text-base font-medium md:text-lg">
					Zero pollution with high efficiency for maximum positive impact
				</p>
			</div>

			<!-- Divider 1 - Hidden on mobile [4] -->
			<div class=" h-px w-10/12 bg-gray-300 md:block md:h-24 md:w-px"></div>

			<!-- Feature 2 -->
			<div
				use:animateIn={{ blur: 4, delay: 0.5 }}
				class="w-full p-4 text-center opacity-0 md:w-auto"
			>
				<p class="p-4 text-base font-medium md:text-lg">
					100% fully automatic operation in sync with all power sources
				</p>
			</div>

			<!-- Divider 2 -  on mobile [4] -->
			<div class=" h-px w-10/12 bg-gray-300 md:block md:h-24 md:w-px"></div>

			<!-- Feature 3 -->
			<div
				use:animateIn={{ blur: 4, delay: 0.7 }}
				class="w-full p-4 text-center opacity-0 md:w-auto"
			>
				<p class="p-4 text-base font-medium md:text-lg">
					Rugged heavy-duty design to produce power for years to come all for free
				</p>
			</div>

			<!-- Divider 3 -  on mobile [4] -->
			<div class=" h-px w-10/12 bg-gray-300 md:block md:h-24 md:w-px"></div>

			<!-- Feature 4 -->
			<div
				use:animateIn={{ blur: 4, delay: 1.4 }}
				class="w-full p-4 text-center opacity-0 md:w-auto"
			>
				<p class="p-4 text-base font-medium md:text-lg">
					Built-in Max. Power point tracker (MPPT) & a battery-less system with Zero recurring costs
				</p>
			</div>
		</div>
	</div>
</section>

<section
	class="mx-auto grid w-full grid-cols-1 gap-8 px-6 py-16 text-sm md:px-16 md:text-lg lg:grid-cols-2 lg:px-32"
>
	<!-- Top Row -->
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
		class="relative col-span-2 rounded-lg opacity-0"
	>
		<div class="">
			<img
				src={landingImage3}
				class="relative h-96 w-full rounded-xl object-cover"
				alt=""
				loading="lazy"
			/>
			<div class="absolute inset-0 z-10 h-full w-full rounded-xl bg-black opacity-40"></div>
			<div
				class="absolute bottom-0 z-20 m-4 flex h-fit items-center justify-center rounded-lg bg-white p-4"
			>
				<!-- <div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex backdrop-blur-sm items-center justify-center"> -->
				<p class="font-medium text-black">
					Our panels provide maximum energy output even on cloudy days.
				</p>
			</div>
		</div>
	</div>

	<!-- Second Row, First Column -->
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.3 }}
		class="relative col-span-2 rounded-lg opacity-0 lg:col-span-1"
	>
		<div class="">
			<img
				src={landingImage4}
				class="relative h-96 w-full rounded-xl object-cover"
				alt=""
				loading="lazy"
			/>
			<div class="absolute inset-0 z-10 h-full w-full rounded-xl bg-black opacity-40"></div>
			<div
				class="absolute bottom-0 z-20 m-4 flex h-fit items-center justify-center rounded-lg bg-white p-4"
			>
				<!-- <div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex backdrop-blur-sm items-center justify-center"> -->
				<p class="font-medium text-black">
					Our solar panels are designed to generate maximum energy output, allowing you to rely less
					on grid power and more on renewable solar energy.
				</p>
			</div>
		</div>
	</div>

	<!-- Second Row, Second Column -->
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
		class="relative col-span-2 rounded-lg opacity-0 lg:col-span-1"
	>
		<div class="">
			<img
				src={landingImage5}
				class="relative h-96 w-full rounded-xl object-cover"
				alt=""
				loading="lazy"
			/>
			<div class="absolute inset-0 z-10 h-full w-full rounded-xl bg-black opacity-40"></div>
			<div
				class="absolute bottom-0 z-20 m-4 flex h-fit items-center justify-center rounded-lg bg-white p-4"
			>
				<!-- <div class="absolute bottom-0 p-4 m-4 h-fit z-20 flex backdrop-blur-sm items-center justify-center"> -->
				<p class="font-medium text-black">
					Built to withstand the harshest weather conditions, our solar panels are incredibly
					durable and come with a 20-year warranty.
				</p>
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
