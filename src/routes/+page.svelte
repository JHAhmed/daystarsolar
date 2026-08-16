<script>
	import { Seo, Button, Stats, CTA } from '$components';
	import HeroCarousel from '$components/home/HeroCarousel.svelte';
	import SavingsCalculator from '$components/home/SavingsCalculator.svelte';
	import ReviewMarquee from '$components/home/ReviewMarquee.svelte';
	import { reveal, revealGroup, scrollTo } from '$motion';
	import { localBusinessSchema, faqSchema } from '$lib/seo/schema.js';
	import { HOME_FAQS } from '$data/faqs.js';
	import { ArrowIcon, SmartCubeIcon } from '$icons';

	import landingImage1 from '$lib/assets/images/landingImage1.jpg?enhanced';
	import landingImage3 from '$lib/assets/images/landingImage3.webp?enhanced';
	import landingImage4 from '$lib/assets/images/landingImage4.jpg?enhanced';
	import landingImage5 from '$lib/assets/images/landingImage5.jpg?enhanced';
	import sampleImage1 from '$lib/assets/images/sample-1.webp?enhanced';
	import quotationMark from '$lib/assets/quote.svg';

	const REASONS = [
		{
			title: 'Government Subsidy Experts',
			body: 'We guide you through the Surya Ghar scheme to maximize your savings.'
		},
		{
			title: 'Premium Partnerships',
			body: 'Authorized partners for Panasonic panels, ensuring Tier-1 quality.'
		},
		{
			title: '20+ Year Warranty',
			body: 'Peace of mind with long-term performance guarantees.'
		}
	];

	const PROCESS = [
		{
			title: 'Site Survey & Consultation',
			body: 'We analyze your roof and energy bills to recommend the perfect KW capacity.'
		},
		{
			title: 'Design & Subsidy Approval',
			body: 'We create the structural design and handle all TNEB/Government paperwork.'
		},
		{
			title: 'Installation & Commissioning',
			body: 'Our expert team installs the panels, inverters, and net metering system.'
		},
		{
			title: 'Lifetime Support',
			body: 'Remote monitoring setup and regular maintenance services.'
		}
	];

	const BENEFITS = [
		'Zero pollution with high efficiency for maximum positive impact',
		'100% fully automatic operation in sync with all power sources',
		'Rugged heavy-duty design to produce power for years to come',
		'Built-in MPPT & battery-less system with Zero recurring costs'
	];

	const SOLUTIONS = [
		{
			title: 'Residential Rooftop Solar',
			body: 'Generate clean electricity for your home with a rooftop solar system designed around your household power consumption and available roof area.'
		},
		{
			title: 'Commercial Solar Systems',
			body: 'Reduce operating costs and improve energy efficiency with scalable solar solutions for offices, shops, institutions, and commercial buildings.'
		},
		{
			title: 'Industrial Solar Projects',
			body: 'Power large facilities with engineered solar projects designed for high energy demand, reliable performance, and long-term operational efficiency.'
		}
	];

	let calculatorSection;
</script>

<Seo
	title="Solar Plant Company in Chennai | Daystar Solar "
	description="Discover Day Star Solar's solar solutions, products, projects, and services for homes, businesses, and industries."
	ogTitle="Solar Plant Company in Chennai | Daystar Solar"
	ogDescription="The sun sends the bill, we make it free."
	path="/"
	image="/oghome.png"
	robots="index, follow"
	schema={[localBusinessSchema(), faqSchema(HOME_FAQS)]}
/>

<!-- ── Hero ────────────────────────────────────────────────────────────── -->
<section class="container-page pt-6 section-bottom md:pt-10">
	<div class="grid gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
		<div class="flex flex-col justify-center lg:col-span-5">
			<h1
				data-reveal
				{@attach reveal({ variant: 'blur', trigger: 'load', duration: 0.9 })}
				class="font-display text-display-lg text-night-900 md:text-display-xl xl:text-display-2xl"
			>
				Solar <span class="text-solar-500">Plant</span> Company
			</h1>

			<p
				data-reveal
				{@attach reveal({ trigger: 'load', delay: 0.12, y: 14 })}
				class="mt-6 max-w-md text-lead text-ink-600"
			>
				Premium sustainable energy solutions for homes and businesses.
			</p>

			<div
				data-reveal
				{@attach reveal({ trigger: 'load', delay: 0.22, y: 14 })}
				class="mt-9 flex flex-wrap gap-3"
			>
				<button
					type="button"
					onclick={() => scrollTo(calculatorSection, { offset: -80 })}
					class="group/hero inline-flex items-center gap-3 rounded-xl bg-solar-400 py-3 pr-3 pl-6 text-base font-medium text-night-900 transition-[background-color,transform] duration-[160ms] ease-out hover:bg-solar-500 active:scale-[0.97]"
				>
					Solar Calculator
					<span
						class="flex size-9 items-center justify-center rounded-lg bg-white/90 transition-transform duration-[220ms] ease-out group-hover/hero:translate-y-0.5"
					>
						<ArrowIcon class="size-4" strokeWidth="2" />
					</span>
				</button>

				<a
					href="/ar"
					class="group/ar inline-flex items-center gap-3 rounded-xl bg-sky-200 py-3 pr-3 pl-6 text-base font-medium text-night-900 transition-[background-color,transform] duration-[160ms] ease-out hover:bg-sky-300 active:scale-[0.97]"
				>
					View in AR
					<span
						class="flex size-9 items-center justify-center rounded-lg bg-white/90 transition-transform duration-[220ms] ease-out group-hover/ar:scale-105"
					>
						<SmartCubeIcon class="size-5" />
					</span>
				</a>
			</div>

			<div
				data-reveal
				{@attach reveal({ trigger: 'load', delay: 0.34 })}
				class="mt-12 border-l-2 border-ink-200 pl-6"
			>
				<h2 class="mb-3 font-sans text-sm font-medium text-ink-500">Trusted Solar Integrators</h2>
				<p class="max-w-md text-sm leading-relaxed text-ink-600">
					Sustainable development is the creed that underpins Daystar Solar's bespoke initiatives to
					protect the environment, strengthen communities and propel responsible growth.
				</p>
			</div>
		</div>

		<div data-reveal {@attach reveal({ trigger: 'load', delay: 0.1, y: 24 })} class="lg:col-span-7">
			<HeroCarousel />
		</div>
	</div>
</section>

<!-- ── Stats ───────────────────────────────────────────────────────────── -->
<section class="container-page section-bottom">
	<Stats />
</section>

<!-- ── Positioning ─────────────────────────────────────────────────────── -->
<section class="bg-ink-50 section">
	<div class="container-prose">
		<p
			data-reveal
			{@attach reveal({ variant: 'blur' })}
			class="text-center text-lead leading-relaxed font-light text-ink-700 md:text-heading-sm md:leading-relaxed"
		>
			<span class="font-medium text-night-900"
				>We specialize in end-to-end solar power plant projects.</span
			>
			Since 2012, we've been a trusted solar power integrator, partnering with Panasonic Solar for premium
			panels and using top-quality imported inverters.
			<span class="font-medium text-night-900">
				Our focus on exceptional design and engineering ensures long-lasting, reliable systems.
			</span>
		</p>
	</div>
</section>

<!-- ── Savings calculator ──────────────────────────────────────────────── -->
<section bind:this={calculatorSection} class="section">
	<div class="container-page">
		<div data-reveal {@attach reveal({ y: 24 })}>
			<SavingsCalculator />
		</div>
	</div>
</section>

<!-- ── What we do ──────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container-page">
		<div
			class="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
			{@attach revealGroup({ variant: 'blur' })}
		>
			<div data-reveal class="space-y-6">
				<h3 class="font-display text-heading text-night-900">Comprehensive Solar Services</h3>
				<p class="leading-relaxed text-ink-600">
					From initial consulting and innovative concept design to flawless execution and ongoing
					maintenance, we handle every aspect of your solar journey. Our bespoke solutions are
					tailored for residential villas, apartments, and commercial industries.
				</p>
				<div class="overflow-hidden rounded-card">
					<enhanced:img
						src={landingImage1}
						alt="Rooftop solar panel installation in Chennai by Daystar Solar"
						loading="lazy"
						class="h-60 w-full object-cover"
					/>
				</div>
			</div>

			<div data-reveal class="flex flex-col items-center justify-center text-center">
				<div class="mb-6 rounded-full bg-ink-100 p-4">
					<img
						src={quotationMark}
						width="16"
						height="16"
						class="size-4"
						alt=""
						aria-hidden="true"
					/>
				</div>
				<h2 class="font-display text-heading-lg text-night-900 lg:text-display">
					Power your future with
					<span class="text-solar-500">solar</span> energy
				</h2>
				<div class="my-6 rounded-full bg-ink-100 p-4">
					<img
						src={quotationMark}
						width="16"
						height="16"
						class="size-4 rotate-180"
						alt=""
						aria-hidden="true"
					/>
				</div>
				<a
					href="/products"
					class="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors duration-[160ms] ease-out hover:text-night-900"
				>
					Explore our Solar Products
					<span
						class="transition-transform duration-[200ms] ease-out group-hover/link:translate-x-1"
						aria-hidden="true">&rarr;</span
					>
				</a>
			</div>

			<div data-reveal class="space-y-6 md:col-span-2 lg:col-span-1">
				<div class="overflow-hidden rounded-card">
					<enhanced:img
						src={landingImage3}
						alt="Commercial solar plant installation surrounded by nature"
						loading="lazy"
						class="h-60 w-full object-cover"
					/>
				</div>
				<h3 class="font-display text-heading text-night-900">Quality Components</h3>
				<p class="leading-relaxed text-ink-600">
					We refuse to compromise on quality. By using Panasonic Solar panels and premium inverters,
					we set the industry benchmark for design and engineering, ensuring your investment pays
					off for decades.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ── System benefits ─────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<div
			data-reveal
			{@attach reveal({ variant: 'blur' })}
			class="flex flex-col gap-8 rounded-panel bg-ink-50 p-8 md:flex-row md:items-center md:gap-12 md:p-12"
		>
			<div class="hidden shrink-0 overflow-hidden rounded-card md:block">
				<enhanced:img
					src={sampleImage1}
					alt="High efficiency solar inverter system"
					loading="lazy"
					class="size-44 object-cover"
				/>
			</div>
			<ul class="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each BENEFITS as benefit (benefit)}
					<li class="text-sm leading-relaxed font-medium text-ink-700">{benefit}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- ── Why us / process ────────────────────────────────────────────────── -->
<section class="section">
	<div class="container-page grid gap-14 md:grid-cols-2 md:gap-16">
		<div data-reveal {@attach reveal()}>
			<h2 class="mb-8 font-display text-heading-lg text-night-900">
				Why Choose Daystar Solar In Chennai ?
			</h2>
			<ul class="space-y-6">
				{#each REASONS as reason (reason.title)}
					<li class="flex items-start gap-4">
						<span
							class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink-100 text-xs font-medium text-ink-700"
							aria-hidden="true">✓</span
						>
						<div>
							<p class="font-medium text-night-900">{reason.title}</p>
							<p class="mt-1 text-sm text-ink-600">{reason.body}</p>
						</div>
					</li>
				{/each}
			</ul>
			<div class="mt-9">
				<Button href="/projects" variant="primary" size="lg">View Our Projects</Button>
			</div>
		</div>

		<div data-reveal {@attach reveal({ delay: 0.1 })}>
			<h2 class="mb-8 font-display text-heading-lg text-night-900">
				Our 4-Step Installation Process
			</h2>
			<ol class="space-y-7">
				{#each PROCESS as step, i (step.title)}
					<li class="flex gap-4">
						<span
							class="flex size-8 shrink-0 items-center justify-center rounded-full bg-solar-100 text-sm font-medium text-solar-600"
						>
							{i + 1}
						</span>
						<div>
							<h3 class="font-sans font-medium text-night-900">{step.title}</h3>
							<p class="mt-1 text-sm text-ink-600">{step.body}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- ── Evidence ────────────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page grid gap-5 md:grid-cols-2" {@attach revealGroup({ variant: 'blur' })}>
		<figure data-reveal class="relative overflow-hidden rounded-card">
			<enhanced:img
				src={landingImage3}
				alt="High output solar panels working on a cloudy day"
				loading="lazy"
				class="h-96 w-full object-cover"
			/>
			<figcaption
				class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/75 to-transparent p-6 text-sm font-medium text-white"
			>
				Our panels provide maximum energy output even on cloudy days.
			</figcaption>
		</figure>

		<figure data-reveal class="relative overflow-hidden rounded-card">
			<enhanced:img
				src={landingImage4}
				alt="Residential rooftop solar installation reducing grid dependency"
				loading="lazy"
				class="h-96 w-full object-cover"
			/>
			<figcaption
				class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/75 to-transparent p-6 text-sm font-medium text-white"
			>
				Our solar panels are designed to generate maximum energy output, allowing you to rely less
				on grid power and more on renewable solar energy.
			</figcaption>
		</figure>

		<figure data-reveal class="relative overflow-hidden rounded-card md:col-span-2">
			<enhanced:img
				src={landingImage5}
				alt="Durable solar panels capable of withstanding harsh weather"
				loading="lazy"
				class="h-64 w-full object-cover md:h-80"
			/>
			<figcaption
				class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/75 to-transparent p-6 text-sm font-medium text-white"
			>
				Built to withstand the harshest weather conditions, our solar panels are incredibly durable
				and come with a 20-year warranty.
			</figcaption>
		</figure>
	</div>
</section>

<!-- ── Showreel ────────────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<div data-reveal {@attach reveal({ y: 24 })} class="overflow-hidden rounded-panel bg-ink-100">
			<video
				autoplay
				muted
				playsinline
				loop
				preload="metadata"
				aria-label="Daystar Solar projects showreel"
				title="Daystar Solar projects showreel"
				class="h-auto w-full object-cover"
			>
				<source
					src="https://res.cloudinary.com/dlq8wuvji/video/upload/v1745575578/Daystar_Projects_Showreel_esvxpw.mp4"
					type="video/mp4"
				/>
			</video>
		</div>
	</div>
</section>

<!-- ── Testimonials ────────────────────────────────────────────────────── -->
<section class="bg-ink-50 section">
	<div class="container-page mb-10">
		<h2
			data-reveal
			{@attach reveal()}
			class="text-center font-display text-heading-lg text-night-900"
		>
			Customer Testimonials
		</h2>
	</div>
	<ReviewMarquee />
</section>

<!-- ── FAQ ─────────────────────────────────────────────────────────────── -->
<section class="section">
	<div class="container-page">
		<h2
			data-reveal
			{@attach reveal()}
			class="mb-10 text-center font-display text-heading-lg text-night-900"
		>
			Got Questions ?
		</h2>

		<div class="mx-auto max-w-3xl space-y-4" {@attach revealGroup()}>
			{#each HOME_FAQS as faq (faq.question)}
				<div data-reveal class="rounded-card border border-ink-200 p-6">
					<h3 class="mb-3 font-sans font-medium text-night-900">{faq.question}</h3>
					<p class="text-sm leading-relaxed text-ink-600">{faq.answer}</p>
				</div>
			{/each}
			<div class="pt-4 text-center">
				<a
					href="/faq"
					class="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors duration-[160ms] ease-out hover:text-night-900"
				>
					Read more FAQs
					<span
						class="transition-transform duration-[200ms] ease-out group-hover/link:translate-x-1"
						aria-hidden="true">&rarr;</span
					>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ── Solutions overview ──────────────────────────────────────────────── -->
<section class="bg-ink-50 section">
	<div class="container-page">
		<div data-reveal {@attach reveal()} class="mx-auto max-w-3xl space-y-6 text-center">
			<h2 class="font-display text-heading-lg text-night-900 lg:text-display">
				Complete Solar Solutions for Homes and Businesses
			</h2>
			<p class="leading-relaxed text-ink-600">
				Daystar Solar provides reliable solar energy solutions for residential, commercial, and
				industrial customers across Chennai and Tamil Nadu. Our team helps you choose the right
				solar system based on your electricity consumption, available space, energy goals, and
				budget.
			</p>
			<p class="leading-relaxed text-ink-600">
				From residential rooftop solar installations to large commercial and industrial solar
				projects, we manage the complete process from consultation and system design to
				installation, commissioning, and after-sales support. Our solar experts focus on safe
				installation, efficient system performance, and dependable long-term service.
			</p>
			<p class="leading-relaxed text-ink-600">
				A professionally designed solar power system can help reduce dependence on conventional
				electricity, improve energy efficiency, and support a cleaner future. We provide practical
				guidance on solar panels, inverters, mounting structures, net metering, government subsidy
				assistance, and maintenance requirements.
			</p>
		</div>

		<div class="mt-12 grid gap-5 md:grid-cols-3" {@attach revealGroup()}>
			{#each SOLUTIONS as solution (solution.title)}
				<div data-reveal class="rounded-card border border-ink-200 bg-white p-6">
					<h3 class="mb-3 font-display text-heading-sm text-night-900">{solution.title}</h3>
					<p class="text-sm leading-relaxed text-ink-600">{solution.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<CTA />
