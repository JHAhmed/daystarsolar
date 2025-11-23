<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { ArrowIcon, StarIcon, GoogleIcon } from '$icons';
	import { Calculator, HeroButton, CTA, ScrollingReviews, Carousel } from '$components';

	import { sampleImage1, animateIn } from '$lib';
	import {
		landingImage1,
		landingImage2,
		landingImage3,
		landingImage4,
		landingImage5,
		quotationMark
	} from '$lib';

	import { animate, inView } from 'motion';
	import { goto } from '$app/navigation';

	let calculator;

const usps = [
        "₹78k Subsidy Support",
        "Free Site Inspection",
        "0% EMI Options",
        "25-Year Panel Warranty"
    ];

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

	const imageModules = import.meta.glob('/src/lib/images/hero-images/*.webp', {
		eager: true,
		query: '?url', // Use query instead of as
		import: 'default' // Import the default export (the URL string)
	});
	const heroProjects = Object.entries(imageModules).map(([path, src]) => {
		const pathSegments = path.split('/');
		let text = pathSegments.length > 2 ? pathSegments[pathSegments.length - 1] : null;

		const projectSegments = path.split('/');
		let href = projectSegments.length > 2 ? projectSegments[projectSegments.length - 1] : null;

		text = text
			.split('.')[0]
			.replace(/-/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());
		href = '/projects/' + href.split('.')[0];

		return { src, text, href };
	});
	let vid;

	function toggle() {
		vid.paused ? vid.play() : vid.pause();
	}

	// FAQ Data for SEO content expansion
	const faqs = [
		{
			question: 'How much does a 5kW solar system cost in Chennai?',
			answer:
				'The cost depends on the panels (monocrystalline vs polycrystalline) and inverter brand. Generally, a 5kW system ranges from ₹2.5L to ₹3.5L. Contact us for a precise quote including subsidy calculations.'
		},
		{
			question: 'Is government subsidy available for home solar?',
			answer:
				'Yes, under the PM Surya Ghar Muft Bijli Yojana, subsidies are available for residential rooftop solar. We handle the entire documentation process for you.'
		},
		{
			question: 'What is the warranty on Panasonic solar panels?',
			answer:
				'We offer a 25-year linear power output warranty on Panasonic solar panels, ensuring your system generates efficient power for decades.'
		}
	];
</script>

<svelte:head>
	<title>Solar Panel Installation Chennai | Daystar Solar - 13+ Years Experience</title>
	<meta
		name="description"
		content="Daystar Solar - Leading solar panel installer in Chennai since 2012. We provide residential & commercial solar solutions with Panasonic panels, government subsidy support, and 20-year warranties." />
	<link rel="canonical" href="https://daystarsolar.co.in/" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "LocalBusiness",
			"name": "Daystar Solar",
			"description": "Solar power plant integrator in Chennai",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "H-5, Second floor, Third avenue, Anna nagar east",
				"addressLocality": "Chennai",
				"postalCode": "600102"
			},
			"telephone": "+91 91766 68617"
		}
	</script>

	<meta
		property="og:title"
		content="Solar Panel Installation Chennai | Daystar Solar - 13+ Years Experience" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://daystarsolar.co.in/oghome.png" />
	<meta property="og:url" content="https://daystarsolar.co.in/" />
	<meta
		property="og:description"
		content="Daystar Solar - Leading solar panel installer in Chennai since 2012. We provide residential & commercial solar solutions with Panasonic panels, government subsidy support, and 20-year warranties." />
</svelte:head>

<section class="mx-auto px-6 py-6 pb-0 md:px-16 md:py-16 md:pb-0 lg:px-32">
	<div class="mb-6 grid grid-cols-12 gap-4 md:mb-16">
		<div class="col-span-12 lg:col-span-5">
			<div class="mb-12 space-y-12">
				<h1 class="my-4 max-w-xl py-2 text-4xl font-medium md:my-12 md:py-8 md:text-6xl">
					Solar Panel Installation in <span class="text-orange-400">Chennai</span>
				</h1>
				<p class="text-lg text-gray-600">
					Premium sustainable energy solutions for homes and businesses.
				</p>

				<div class="space-y-2">
					<HeroButton button={true} action={scrollToView} />
					<HeroButton button={true} text="View in AR" alt={true} href="/ar2" />
				</div>
			</div>
			<div class="my-8 max-w-md border-l-4 bg-gray-50 p-6 lg:mb-12 lg:mt-24">
				<h2 class="mb-4 text-sm font-medium md:text-base">Trusted Solar Integrators</h2>
				<p class="text-sm text-gray-600 md:text-base">
					Sustainable development is the creed that underpins Daystar Solar's bespoke initiatives to
					protect the environment, strengthen communities and propel responsible growth.
				</p>
			</div>
		</div>

		<div class="col-span-12 lg:col-span-7">
			<Carousel {heroProjects} />
		</div>
	</div>

	<div class="my-24 grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x-2">
		{#each stats as stat, i}
			<div
				use:animateIn={{ y: 10, blur: 4, delay: i / 3 }}
				class="flex items-center justify-center space-x-4 text-center opacity-0">
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
	bind:this={calculator}>
	<Calculator />
</div>

<section class="bg-gray-50 py-8">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-2xl tracking-[-0.07em] md:text-4xl">
			What Our Customers Say
		</h2>
		<ScrollingReviews />
	</div>
</section>

<!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700 font-medium">
                    {#each usps as usp}
                        <div class="flex items-center gap-2">
                            <div class="bg-green-100 p-1 rounded-full text-green-700">✓</div>
                            <span>{usp}</span>
                        </div>
                    {/each}
                </div> -->

<div class="my-6 w-full bg-green-600 p-8 md:my-16 md:p-24">
	<p class="mx-auto text-center text-lg font-extralight tracking-tight text-white md:text-2xl">
		<span class="font-light">We specialize in end-to-end solar power plant projects</span>. Since
		2012, we've been a trusted solar power integrator, partnering with Panasonic Solar for premium
		panels and using top-quality imported inverters.
		<span class="font-light"
			>Our focus on exceptional design and engineering ensures long-lasting, reliable systems.</span>
	</p>
</div>

<section
	class="mx-auto grid w-full grid-cols-1 gap-8 px-6 py-6 md:px-16 md:py-16 lg:grid-cols-3 lg:px-32">
	<div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }} class="space-y-8 opacity-0">
		<h3 class="text-xl font-semibold">Comprehensive Solar Services</h3>
		<p class="text-md max-w-xl font-medium leading-relaxed md:text-lg">
			From initial consulting and innovative concept design to flawless execution and ongoing
			maintenance, we handle every aspect of your solar journey. Our bespoke solutions are tailored
			for residential villas, apartments, and commercial industries.
		</p>

		<div class="relative overflow-hidden rounded-2xl">
			<img
				src={landingImage1}
				alt="Rooftop solar panel installation in Chennai by Daystar Solar"
				class="h-[200px] w-full object-cover md:h-[300px]" />
		</div>
	</div>

	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
		class="items-left flex flex-col justify-center space-y-4 p-8 text-center opacity-0 lg:text-left">
		<div class=" w-fit rounded-full bg-yellow-100 p-3">
			<img src={quotationMark} class="size-4 text-green-800" alt="quote" />
		</div>
		<h2 class="text-center text-xl font-medium md:text-3xl lg:text-5xl">
			Ignite your future with
			<span class="text-orange-400">solar</span> energy
		</h2>
		<div class=" ml-auto w-fit rounded-full bg-yellow-100 p-3">
			<img src={quotationMark} class="size-4 rotate-180 text-green-800" alt="quote" />
		</div>
		<div class="mt-8 text-center">
			<a href="/products" class="text-blue-600 hover:underline"
				>Explore our Solar Products &rarr;</a>
		</div>
	</div>

	<div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.9 }} class="space-y-8 opacity-0">
		<div class="relative overflow-hidden rounded-2xl">
			<img
				loading="lazy"
				src={landingImage3}
				alt="Commercial solar plant installation surrounded by nature"
				class="h-[200px] w-full object-cover md:h-[300px]" />
		</div>

		<h3 class="text-xl font-semibold">Quality Components</h3>
		<p class="text-md max-w-xl font-medium leading-relaxed md:text-lg">
			We refuse to compromise on quality. By using Panasonic Solar panels and premium inverters, we
			set the industry benchmark for design and engineering, ensuring your investment pays off for
			decades.
		</p>
	</div>
</section>

<section class="mx-auto my-6 w-full px-6 md:my-16 md:px-16 lg:px-32">
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
		class="col-span-2 flex flex-col rounded-lg bg-[#F5F5ED] opacity-0 md:flex-row">
		<img
			loading="lazy"
			src={sampleImage1}
			class="img-clip hidden w-full rounded-t-lg object-cover md:w-48 md:rounded-l-lg md:rounded-tr-none lg:block"
			alt="High efficiency solar inverter system" />
		<div class="flex w-full flex-col items-center justify-center md:flex-row">
			<div
				use:animateIn={{ blur: 4, delay: 0.2 }}
				class="w-full p-4 text-center opacity-0 md:w-auto">
				<p class="p-4 text-base font-medium md:text-lg">
					Zero pollution with high efficiency for maximum positive impact
				</p>
			</div>
			<div class=" h-px w-10/12 bg-gray-300 md:block md:h-24 md:w-px"></div>
			<div
				use:animateIn={{ blur: 4, delay: 0.5 }}
				class="w-full p-4 text-center opacity-0 md:w-auto">
				<p class="p-4 text-base font-medium md:text-lg">
					100% fully automatic operation in sync with all power sources
				</p>
			</div>
			<div class=" h-px w-10/12 bg-gray-300 md:block md:h-24 md:w-px"></div>
			<div
				use:animateIn={{ blur: 4, delay: 0.7 }}
				class="w-full p-4 text-center opacity-0 md:w-auto">
				<p class="p-4 text-base font-medium md:text-lg">
					Rugged heavy-duty design to produce power for years to come
				</p>
			</div>
			<div class=" h-px w-10/12 bg-gray-300 md:block md:h-24 md:w-px"></div>
			<div
				use:animateIn={{ blur: 4, delay: 1.4 }}
				class="w-full p-4 text-center opacity-0 md:w-auto">
				<p class="p-4 text-base font-medium md:text-lg">
					Built-in MPPT & battery-less system with Zero recurring costs
				</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto bg-white px-6 py-12 md:px-16 lg:px-32">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<div>
			<h2 class="mb-6 text-3xl font-medium">Why Chennai Chooses Daystar Solar?</h2>
			<ul class="space-y-4 text-lg text-gray-700">
				<li class="flex items-start gap-3">
					<span class="text-xl text-green-600">✓</span>
					<p>
						<strong>Government Subsidy Experts:</strong> We guide you through the Surya Ghar scheme to
						maximize your savings.
					</p>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-xl text-green-600">✓</span>
					<p>
						<strong>Premium Partnerships:</strong> Authorized partners for Panasonic panels, ensuring
						Tier-1 quality.
					</p>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-xl text-green-600">✓</span>
					<p>
						<strong>20+ Year Warranty:</strong> Peace of mind with long-term performance guarantees.
					</p>
				</li>
			</ul>
			<div class="mt-8">
				<a
					href="/projects"
					class="rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800"
					>View Our Projects</a>
			</div>
		</div>
		<div>
			<h2 class="mb-6 text-3xl font-medium">Our 4-Step Installation Process</h2>
			<div class="space-y-6">
				<div class="flex gap-4">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
						1
					</div>
					<div>
						<h3 class="font-bold">Site Survey & Consultation</h3>
						<p class="text-sm text-gray-600">
							We analyze your roof and energy bills to recommend the perfect KW capacity.
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
						2
					</div>
					<div>
						<h3 class="font-bold">Design & Subsidy Approval</h3>
						<p class="text-sm text-gray-600">
							We create the structural design and handle all TNEB/Government paperwork.
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
						3
					</div>
					<div>
						<h3 class="font-bold">Installation & Commissioning</h3>
						<p class="text-sm text-gray-600">
							Our expert team installs the panels, inverters, and net metering system.
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
						4
					</div>
					<div>
						<h3 class="font-bold">Lifetime Support</h3>
						<p class="text-sm text-gray-600">
							Remote monitoring setup and regular maintenance services.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section
	class="mx-auto grid w-full grid-cols-1 gap-8 px-6 py-8 text-sm md:px-16 md:text-lg lg:grid-cols-2 lg:px-32">
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
		class="relative col-span-2 rounded-lg opacity-0">
		<div class="">
			<img
				src={landingImage3}
				class="relative h-96 w-full rounded-xl object-cover"
				alt="High output solar panels working on a cloudy day"
				loading="lazy" />
			<div class="absolute inset-0 z-10 h-full w-full rounded-xl bg-black opacity-40"></div>
			<div
				class="absolute bottom-0 z-20 m-4 flex h-fit items-center justify-center rounded-lg bg-white p-4">
				<p class="font-medium text-black">
					Our panels provide maximum energy output even on cloudy days.
				</p>
			</div>
		</div>
	</div>

	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.3 }}
		class="relative col-span-2 rounded-lg opacity-0 lg:col-span-1">
		<div class="">
			<img
				src={landingImage4}
				class="relative h-96 w-full rounded-xl object-cover"
				alt="Residential rooftop solar installation reducing grid dependency"
				loading="lazy" />
			<div class="absolute inset-0 z-10 h-full w-full rounded-xl bg-black opacity-40"></div>
			<div
				class="absolute bottom-0 z-20 m-4 flex h-fit items-center justify-center rounded-lg bg-white p-4">
				<p class="font-medium text-black">
					Our solar panels are designed to generate maximum energy output, allowing you to rely less
					on grid power and more on renewable solar energy.
				</p>
			</div>
		</div>
	</div>

	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
		class="relative col-span-2 rounded-lg opacity-0 lg:col-span-1">
		<div class="">
			<img
				src={landingImage5}
				class="relative h-96 w-full rounded-xl object-cover"
				alt="Durable solar panels capable of withstanding harsh weather"
				loading="lazy" />
			<div class="absolute inset-0 z-10 h-full w-full rounded-xl bg-black opacity-40"></div>
			<div
				class="absolute bottom-0 z-20 m-4 flex h-fit items-center justify-center rounded-lg bg-white p-4">
				<p class="font-medium text-black">
					Built to withstand the harshest weather conditions, our solar panels are incredibly
					durable and come with a 20-year warranty.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto bg-gray-50 px-6 py-12 md:px-16 lg:px-32">
	<h2 class="mb-8 text-center text-3xl font-medium">Common Questions regarding Solar</h2>
	<div class="mx-auto grid max-w-3xl gap-6">
		{#each faqs as faq}
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-bold">{faq.question}</h3>
				<p class="text-gray-600">{faq.answer}</p>
			</div>
		{/each}
		<div class="mt-6 text-center">
			<a href="/faq" class="font-medium text-blue-600 hover:underline">Read more FAQs &rarr;</a>
		</div>
	</div>
</section>

<section class="mx-auto px-4 py-2 md:px-6 md:py-6">
	<video
		bind:this={vid}
		autoplay
		muted
		playsinline
		loop
		preload="metadata"
		on:click={toggle}
		poster="/preview.jpg"
		class="mx-auto h-auto cursor-pointer rounded-xl object-cover">
		<source
			src="https://res.cloudinary.com/dlq8wuvji/video/upload/v1745575578/Daystar_Projects_Showreel_esvxpw.mp4"
			type="video/mp4" />
	</video>
</section>

<CTA />

<style>
	.img-clip {
		clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%);
	}
</style>
