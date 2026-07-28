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
		'₹78k Subsidy Support',
		'Free Site Inspection',
		'0% EMI Options',
		'25-Year Panel Warranty'
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
		query: '?url',
		import: 'default'
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
			"image": "https://daystarsolar.co.in/oghome.png",
			"url": "https://daystarsolar.co.in/",
			"priceRange": "₹₹",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "H-5, Second floor, Third avenue, Anna nagar east",
				"addressLocality": "Chennai",
				"postalCode": "600102",
				"addressCountry": "IN"
			},
			"telephone": "+91 91766 68617",
			"openingHoursSpecification": {
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				"opens": "09:30",
				"closes": "18:30"
			},
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "4.9",
				"reviewCount": "120"
			},
			"review": [
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Abdul Gani" },
					"reviewBody": "I had a great experience with Daystar for my home solar installation. The team was professional, the process was smooth, and the system is working perfectly. Highly recommend them for both home and commercial solar solutions.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/FMAS3THVZiBGdDpy7"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Ramesh Kothandapany" },
					"reviewBody": "I have installed 3.2 kv capacity solar panels through Daystar Solar team. They have provided good support in inspecting, recommending appropriate installation design, completed the core installation process in 2 to 3 days, and taken care of the end to end process to go via Surya Ghar scheme.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/Y7d3TS5oRV3grdsD9"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Bhuvaneshwar C" },
					"reviewBody": "I had a wonderful experience with Daystar for my solar installation at home. The staff was highly professional, the process was effortless, and the system is running smoothly. I definitely recommend them for both residential and commercial solar needs.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/j3aucsbyhs9GDVxNA"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Sujith D" },
					"reviewBody": "Perfect in everything, especially competitive in costing. Their service is top notch. Genuine people. Actually I thought of adding solar for me and my parents, but by looking at the EB bill, they suggested to take solar only for me (generally no one does this). I was impressed by this behaviour.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/jJjuFT6JXm6t5CVv7"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Pradap" },
					"reviewBody": "I have installed a 3 kW plant from Daystar Solar and was satisfied with their technical expertise and customer support. Keep up the good work.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/XuVuwXmeNbirBbXbA"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Lokesh T M" },
					"reviewBody": "Installation of 3 kW done by them was the best in standards and I got the subsidy of 78k via PM Surya Ghar scheme. Recommending the seller.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/siikLWwVQqgzgEN17"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Venki Abi" },
					"reviewBody": "I have installed a 3.3 kVA solar panel at my home. Daystar team from the beginning provided very good service and very good support and follow up till the subsidy was credited.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/95o7GHkHYEZRko9r9"
				},
				{
					"@type": "Review",
					"author": { "@type": "Person", "name": "Arumugam K" },
					"reviewBody": "Technically strong and clear communication to customers with very precise information about panels and customer needs. Great customer support, timely completion of all tasks and follow-ups with all departments for the completion. Highly recommended.",
					"reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
					"url": "https://maps.app.goo.gl/BGhJd65bqhr7abqy7"
				}
			]
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

<!-- ───────────────────── HERO ───────────────────── -->
<section class="mx-auto px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-12 lg:px-20">
	<div class="grid grid-cols-12 gap-8 lg:gap-12">
		<div class="col-span-12 lg:col-span-5 flex flex-col justify-center">
			<h1 class="text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
				Solar Panel
				<br />
				Installation in
				<br />
				<span class="text-amber-500">Chennai</span>
			</h1>

			<p class="mt-8 max-w-md text-lg text-neutral-500 md:text-xl">
				Premium sustainable energy solutions for homes and businesses.
			</p>

			<div class="mt-10 flex flex-col gap-3 sm:flex-row">
				<HeroButton button={true} action={scrollToView} />
				<HeroButton button={true} text="View in AR" alt={true} href="/ar2" />
			</div>

			<div class="mt-16 max-w-md border-l-2 border-neutral-200 pl-6">
				<p class="text-xs font-medium uppercase tracking-widest text-neutral-400">
					Trusted Solar Integrators
				</p>
				<p class="mt-3 text-sm leading-relaxed text-neutral-600">
					Sustainable development is the creed that underpins Daystar Solar's bespoke initiatives to
					protect the environment, strengthen communities and propel responsible growth.
				</p>
			</div>
		</div>

		<div class="col-span-12 lg:col-span-7">
			<Carousel {heroProjects} />
		</div>
	</div>
</section>

<!-- ───────────────────── STATS ───────────────────── -->
<section class="mx-auto px-6 py-16 md:px-12 md:py-24 lg:px-20">
	<div class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
		{#each stats as stat, i}
			<div
				use:animateIn={{ y: 10, blur: 4, delay: i / 3 }}
				class="opacity-0">
				<p class="text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
					{stat.number}<span class="font-light text-neutral-300">+</span>
				</p>
				<p class="mt-2 text-sm font-medium uppercase tracking-widest text-neutral-400">
					{stat.label}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- ───────────────────── CALCULATOR ───────────────────── -->
<div
	class="mx-auto px-6 py-8 opacity-0 md:px-12 md:py-12 lg:px-20"
	use:animateIn={{ y: 25 }}
	bind:this={calculator}>
	<Calculator />
</div>

<!-- ───────────────────── REVIEWS ───────────────────── -->
<section class="bg-neutral-50 py-20">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
			What Our Customers Say
		</h2>
		<ScrollingReviews />
	</div>
</section>

<!-- ───────────────────── BANNER ───────────────────── -->
<section class="bg-neutral-900 px-6 py-20 md:py-28 lg:px-20">
	<p class="mx-auto max-w-4xl text-center text-xl font-light leading-relaxed tracking-tight text-neutral-100 md:text-3xl lg:text-4xl">
		We specialize in end-to-end solar power plant projects.
		Since 2012, we've been a trusted solar power integrator, partnering with
		<span class="font-normal text-amber-400">Panasonic Solar</span>
		for premium panels and using top-quality imported inverters.
	</p>
</section>

<!-- ───────────────────── SERVICES ───────────────────── -->
<section class="mx-auto grid w-full grid-cols-1 gap-16 px-6 py-20 md:px-12 lg:grid-cols-3 lg:gap-8 lg:px-20">
	<!-- Left card -->
	<div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }} class="space-y-6 opacity-0">
		<p class="text-xs font-medium uppercase tracking-widest text-amber-500">Services</p>
		<h3 class="text-2xl font-semibold tracking-tight text-neutral-900">
			Comprehensive Solar Services
		</h3>
		<p class="text-base leading-relaxed text-neutral-500">
			From initial consulting and innovative concept design to flawless execution and ongoing
			maintenance, we handle every aspect of your solar journey. Our bespoke solutions are tailored
			for residential villas, apartments, and commercial industries.
		</p>
		<div class="overflow-hidden rounded-xl">
			<img
				src={landingImage1}
				alt="Rooftop solar panel installation in Chennai by Daystar Solar"
				class="aspect-[4/3] w-full object-cover" />
		</div>
	</div>

	<!-- Center quote -->
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
		class="flex flex-col items-center justify-center space-y-6 text-center opacity-0 lg:px-4">
		<div class="rounded-full bg-neutral-100 p-4">
			<img src={quotationMark} class="size-4" alt="quote" />
		</div>
		<h2 class="text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
			Ignite your future with
			<span class="text-amber-500">solar</span> energy
		</h2>
		<div class="rotate-180 rounded-full bg-neutral-100 p-4">
			<img src={quotationMark} class="size-4" alt="quote" />
		</div>
		<a href="/products" class="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-amber-500">
			Explore our Solar Products →
		</a>
	</div>

	<!-- Right card -->
	<div use:animateIn={{ blur: 8, duration: 0.5, delay: 0.9 }} class="space-y-6 opacity-0">
		<p class="text-xs font-medium uppercase tracking-widest text-amber-500">Quality</p>
		<h3 class="text-2xl font-semibold tracking-tight text-neutral-900">Quality Components</h3>
		<p class="text-base leading-relaxed text-neutral-500">
			We refuse to compromise on quality. By using Panasonic Solar panels and premium inverters, we
			set the industry benchmark for design and engineering, ensuring your investment pays off for
			decades.
		</p>
		<div class="overflow-hidden rounded-xl">
			<img
				loading="lazy"
				src={landingImage3}
				alt="Commercial solar plant installation surrounded by nature"
				class="aspect-[4/3] w-full object-cover" />
		</div>
	</div>
</section>

<!-- ───────────────────── FEATURES STRIP ───────────────────── -->
<section class="mx-auto w-full px-6 py-12 md:px-12 lg:px-20">
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
		class="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-neutral-200 opacity-0 lg:grid-cols-4">
		{#each [
			'Zero pollution with high efficiency for maximum positive impact',
			'100% fully automatic operation in sync with all power sources',
			'Rugged heavy-duty design to produce power for years to come',
			'Built-in MPPT & battery-less system with zero recurring costs'
		] as feature, i}
			<div
				use:animateIn={{ blur: 4, delay: 0.1 + i * 0.15 }}
				class="flex items-center justify-center p-8 text-center opacity-0 lg:p-10">
				<p class="text-sm font-medium leading-relaxed text-neutral-700 md:text-base">
					{feature}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- ───────────────────── WHY CHENNAI + PROCESS ───────────────────── -->
<section class="mx-auto bg-neutral-50 px-6 py-20 md:px-12 lg:px-20">
	<div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
		<!-- Why Chennai -->
		<div>
			<p class="text-xs font-medium uppercase tracking-widest text-amber-500">Why Us</p>
			<h2 class="mb-8 mt-2 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
				Why Chennai Chooses Daystar Solar?
			</h2>
			<ul class="space-y-6">
				<li class="flex items-start gap-4">
					<span class="mt-1 text-lg text-amber-500">●</span>
					<div>
						<p class="font-semibold text-neutral-900">Government Subsidy Experts</p>
						<p class="mt-1 text-sm text-neutral-500">
							We guide you through the Surya Ghar scheme to maximize your savings.
						</p>
					</div>
				</li>
				<li class="flex items-start gap-4">
					<span class="mt-1 text-lg text-amber-500">●</span>
					<div>
						<p class="font-semibold text-neutral-900">Premium Partnerships</p>
						<p class="mt-1 text-sm text-neutral-500">
							Authorized partners for Panasonic panels, ensuring Tier-1 quality.
						</p>
					</div>
				</li>
				<li class="flex items-start gap-4">
					<span class="mt-1 text-lg text-amber-500">●</span>
					<div>
						<p class="font-semibold text-neutral-900">20+ Year Warranty</p>
						<p class="mt-1 text-sm text-neutral-500">
							Peace of mind with long-term performance guarantees.
						</p>
					</div>
				</li>
			</ul>
			<div class="mt-10">
				<a
					href="/projects"
					class="inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700">
					View Our Projects
				</a>
			</div>
		</div>

		<!-- Process -->
		<div>
			<p class="text-xs font-medium uppercase tracking-widest text-amber-500">Process</p>
			<h2 class="mb-8 mt-2 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
				Our 4-Step Installation Process
			</h2>
			<div class="space-y-8">
				{#each [
					{ n: 1, t: 'Site Survey & Consultation', d: 'We analyze your roof and energy bills to recommend the perfect KW capacity.' },
					{ n: 2, t: 'Design & Subsidy Approval', d: 'We create the structural design and handle all TNEB/Government paperwork.' },
					{ n: 3, t: 'Installation & Commissioning', d: 'Our expert team installs the panels, inverters, and net metering system.' },
					{ n: 4, t: 'Lifetime Support', d: 'Remote monitoring setup and regular maintenance services.' }
				] as step}
					<div class="flex gap-5">
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
							{step.n}
						</div>
						<div>
							<h3 class="font-semibold text-neutral-900">{step.t}</h3>
							<p class="mt-1 text-sm text-neutral-500">{step.d}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ───────────────────── IMAGE SHOWCASE ───────────────────── -->
<section class="mx-auto grid w-full grid-cols-1 gap-6 px-6 py-16 md:px-12 lg:grid-cols-2 lg:px-20">
	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.1 }}
		class="relative col-span-1 overflow-hidden rounded-2xl opacity-0 lg:col-span-2">
		<img
			src={landingImage3}
			class="aspect-[16/9] w-full object-cover"
			alt="High output solar panels working on a cloudy day"
			loading="lazy" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="absolute bottom-0 p-8">
			<p class="text-lg font-medium text-white">
				Our panels provide maximum energy output even on cloudy days.
			</p>
		</div>
	</div>

	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.3 }}
		class="relative col-span-1 overflow-hidden rounded-2xl opacity-0 lg:col-span-1">
		<img
			src={landingImage4}
			class="aspect-[16/9] w-full object-cover"
			alt="Residential rooftop solar installation reducing grid dependency"
			loading="lazy" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="absolute bottom-0 p-6">
			<p class="text-base font-medium text-white">
				Reduce grid reliance and embrace renewable solar energy.
			</p>
		</div>
	</div>

	<div
		use:animateIn={{ blur: 8, duration: 0.5, delay: 0.5 }}
		class="relative col-span-1 overflow-hidden rounded-2xl opacity-0 lg:col-span-1">
		<img
			src={landingImage5}
			class="aspect-[16/9] w-full object-cover"
			alt="Durable solar panels capable of withstanding harsh weather"
			loading="lazy" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="absolute bottom-0 p-6">
			<p class="text-base font-medium text-white">
				Built to withstand harsh weather with a 20-year warranty.
			</p>
		</div>
	</div>
</section>

<!-- ───────────────────── FAQ ───────────────────── -->
<section class="mx-auto bg-neutral-50 px-6 py-20 md:px-12 lg:px-20">
	<div class="mx-auto max-w-3xl">
		<p class="text-xs font-medium uppercase tracking-widest text-amber-500">FAQ</p>
		<h2 class="mb-10 mt-2 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
			Common Questions Regarding Solar
		</h2>
		<div class="space-y-4">
			{#each faqs as faq}
				<div class="rounded-xl bg-white p-6 md:p-8">
					<h3 class="text-lg font-semibold text-neutral-900">{faq.question}</h3>
					<p class="mt-3 text-sm leading-relaxed text-neutral-500 md:text-base">{faq.answer}</p>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href="/faq" class="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-amber-500">
				Read more FAQs →
			</a>
		</div>
	</div>
</section>

<!-- ───────────────────── VIDEO ───────────────────── -->
<section class="mx-auto px-6 py-12 md:px-12 lg:px-20">
	<video
		bind:this={vid}
		autoplay
		muted
		playsinline
		loop
		preload="metadata"
		on:click={toggle}
		poster="/preview.jpg"
		class="aspect-video w-full cursor-pointer rounded-2xl object-cover">
		<source
			src="https://res.cloudinary.com/dlq8wuvji/video/upload/v1745575578/Daystar_Projects_Showreel_esvxpw.mp4"
			type="video/mp4" />
	</video>
</section>

<CTA />