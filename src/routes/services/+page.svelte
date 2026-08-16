<script>
	import { Seo, CTA, PageHeader, Accordion } from '$components';
	import { reveal, revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';
	import { SERVICES, PROCESS_STEPS, WHY_US } from '$data/services.js';

	import {
		UserGroupIcon,
		MapIcon,
		PencilSquareIcon,
		TruckIcon,
		CheckBadgeIcon,
		AcademicCapIcon,
		ChartBarIcon,
		WrenchScrewdriverIcon
	} from '@fvilers/heroicons-svelte/24/outline';

	import servicesImage1 from '$lib/assets/images/servicesImage1.jpg?enhanced';
	import servicesImage2 from '$lib/assets/images/servicesImage2.jpg?enhanced';
	import servicesImage3 from '$lib/assets/images/servicesImage3.jpg?enhanced';

	const STEP_ICONS = [
		UserGroupIcon,
		MapIcon,
		PencilSquareIcon,
		TruckIcon,
		CheckBadgeIcon,
		AcademicCapIcon,
		ChartBarIcon,
		WrenchScrewdriverIcon
	];

	const WHY_IMAGES = [servicesImage1, servicesImage2, servicesImage3];

	const SEGMENTS = [
		{
			title: 'Residential Rooftop Solar',
			body: 'Save up to 90% on electricity bills with our <strong>rooftop solar installation</strong> services. We specialize in 3kW to 10kW systems ideal for villas and apartments in Chennai, fully covered under the <strong>PM Surya Ghar Scheme</strong>.'
		},
		{
			title: 'Commercial Solar Systems',
			body: 'Reduce your operational costs with our high-efficiency <strong>commercial solar systems</strong>. Perfect for schools, hospitals, and office buildings looking for sustainable power and tax depreciation benefits.'
		},
		{
			title: 'Industrial Solar Projects',
			body: 'We design rugged <strong>industrial solar solutions</strong> for factories and warehouses. Our on-grid and hybrid systems ensure power continuity and rapid ROI for high-consumption industries.'
		}
	];
</script>

<Seo
	title="Solar Services | Daystar Solar"
	description="Your solar partner for life, from consultation to installation and beyond, with services for residential, commercial, and industrial needs."
	ogDescription="Daystar Solar offers a wide range of solar services including consultation, installation, and maintenance for industrial and commercial clients."
	path="/services"
	schema={pageSchema('WebPage', {
		path: '/services',
		name: 'Solar Services',
		description:
			'Discover our full range of solar services including installation, maintenance, and consultation.'
	})}
/>

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader
		align="center"
		lead="From cozy homes to large factories, we provide end-to-end solar execution."
	>
		Solar Panel Installation In Chennai
	</PageHeader>

	<div class="mt-14 grid gap-5 md:grid-cols-3" {@attach revealGroup({ y: 16 })}>
		{#each SEGMENTS as segment (segment.title)}
			<div data-reveal class="rounded-panel bg-ink-50 p-6 md:p-8">
				<h2 class="mb-3 font-display text-heading-sm text-solar-600">{segment.title}</h2>
				<p class="text-sm leading-relaxed text-ink-600">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html segment.body}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- ── What we offer ───────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<div data-reveal {@attach reveal()} class="mb-10">
			<h2 class="font-display text-display text-night-900">Our Services</h2>
			<p class="mt-3 text-lead text-ink-600">What we offer</p>
		</div>

		<div data-reveal {@attach reveal({ y: 16, delay: 0.1 })}>
			<Accordion items={SERVICES} html class="services-accordion" />
		</div>
	</div>
</section>

<!-- ── Why choose us ───────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<h2 data-reveal {@attach reveal()} class="mb-10 font-display text-display text-night-900">
			Why Choose Us?
		</h2>

		<div class="grid gap-5 md:grid-cols-3" {@attach revealGroup({ variant: 'blur', y: 16 })}>
			{#each WHY_US as card, i (card.title)}
				<article data-reveal class="overflow-hidden rounded-panel bg-ink-50">
					<enhanced:img
						src={WHY_IMAGES[i]}
						alt={card.alt}
						loading="lazy"
						class="h-48 w-full object-cover"
					/>
					<div class="p-6 md:p-8">
						<h3 class="mb-3 font-display text-heading-sm text-night-900">{card.title}</h3>
						<p class="text-sm leading-relaxed text-ink-600">{card.body}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ── Process ─────────────────────────────────────────────────────────── -->
<section class="section-bottom">
	<div class="container-page">
		<h2 data-reveal {@attach reveal()} class="mb-12 font-display text-display text-night-900">
			Our Process
		</h2>

		<ol
			class="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4"
			{@attach revealGroup({ y: 16, stagger: 0.06 })}
		>
			{#each PROCESS_STEPS as step, i (step.title)}
				{@const Icon = STEP_ICONS[i]}
				<li data-reveal class="relative">
					<!-- The connector runs to the next item and is hidden on the last
					     column of each row so it never trails off into the margin. -->
					<div class="mb-5 flex items-center">
						<span class="size-2.5 shrink-0 rounded-full bg-solar-400"></span>
						<span
							class="connector ml-2 h-px flex-1 bg-ink-200"
							class:is-last={i === PROCESS_STEPS.length - 1}
						></span>
					</div>

					<div class="mb-3 flex items-center gap-3">
						<span
							class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-night-900 p-1.5"
						>
							<Icon class="size-full text-white" />
						</span>
						<h3 class="font-display text-heading-sm text-night-900">{step.title}</h3>
					</div>
					<p class="text-sm leading-relaxed text-ink-600">{step.description}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<CTA />

<style>
	.connector.is-last {
		display: none;
	}

	/* The service copy is authored HTML, so it needs its own typography rather
	   than inheriting only the accordion's paragraph styling. */
	.services-accordion :global(p + p),
	.services-accordion :global(p + ul),
	.services-accordion :global(ul + p) {
		margin-top: 0.85rem;
	}

	.services-accordion :global(ul) {
		list-style: disc;
		padding-left: 1.25rem;
	}

	.services-accordion :global(li) {
		margin-block: 0.3rem;
	}

	.services-accordion :global(strong) {
		color: var(--color-night-900);
		font-weight: 500;
	}
</style>
