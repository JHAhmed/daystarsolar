<script>
	import { Seo, CTA, PageHeader } from '$components';
	import { revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';
	import { MARKETPLACES } from '$data/site.js';
	import { ArrowIcon } from '$icons';
	import AmazonLogo from '$lib/assets/AmazonLogo.svelte';
	import IndiaMartLogo from '$lib/assets/IndiaMartLogo.svelte';

	import solarPanels from '$lib/assets/images/solar-panels.jpg?enhanced';
	import distributionBoxes from '$lib/assets/images/distribution-boxes.jpg?enhanced';
	import bos from '$lib/assets/images/bos.jpg?enhanced';
	import others from '$lib/assets/images/others.jpg?enhanced';

	const PRODUCTS = [
		{
			title: 'Panels & Inverters',
			image: solarPanels,
			byDaystar: false,
			alt: 'Large solar panel array in a field during cloudy day'
		},
		{
			title: 'Solar Distribution Boxes',
			image: distributionBoxes,
			byDaystar: true,
			alt: 'Solar distribution box mounted on red brick wall'
		},
		{
			title: 'Balance of System',
			image: bos,
			byDaystar: true,
			alt: 'Solar powered street light against blue cloudy sky'
		},
		{
			title: 'Solar Accessories',
			image: others,
			byDaystar: false,
			alt: 'Worker installing solar panels on a roof'
		}
	];
</script>

<Seo
	title="Products | Daystar Solar"
	description="Discover premium Panasonic panels, inverters, mounting structures, distribution boxes, and cables for complete solar solutions."
	ogDescription="Buy premium Panasonic solar panels, solar cables, distribution boxes (ACDB/DCDB), and inverters in chennai. Authorized deale."
	path="/products"
	schema={pageSchema('CollectionPage', {
		path: '/products',
		name: 'Solar Products',
		description:
			'Explore our range of high-efficiency solar panels, inverters, batteries, and accessories.'
	})} />

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader>Our Products</PageHeader>

	<div class="mt-8 max-w-3xl space-y-4 text-lead text-ink-600">
		<p>
			We supply high-performance solar components for residential and commercial installations
			across South India. As authorized partners for <strong class="font-medium text-night-900"
				>Panasonic Solar</strong
			>, we ensure you get Tier-1 panels with 25-year warranties.
		</p>
		<p>
			Our inventory includes On-grid/Off-grid Inverters, customized ACDB/DCDB Distribution Boxes,
			and durable mounting structures designed to withstand Chennai's weather conditions.
		</p>
	</div>

	<div class="mt-14 grid gap-5 md:grid-cols-2" {@attach revealGroup({ variant: 'blur', y: 16 })}>
		{#each PRODUCTS as product (product.title)}
			<article data-reveal class="group/product relative overflow-hidden rounded-panel">
				<div class="aspect-4/3 sm:aspect-video lg:aspect-3/2">
					<enhanced:img
						src={product.image}
						alt={product.alt}
						loading="lazy"
						class="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover/product:scale-[1.04]" />
				</div>

				<div
					class="absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/35 to-transparent">
				</div>

				<div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
					<h2 class="font-display text-heading-lg text-white md:text-display">
						{product.title}
					</h2>
					{#if product.byDaystar}
						<p class="mt-1 text-sm text-white/70">By Daystar Solar</p>
					{/if}

					<div class="mt-5 flex flex-wrap gap-2 sm:gap-3">
						<a
							href={MARKETPLACES.amazon}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm transition-[background-color,transform] duration-160 ease-out hover:bg-white/25 active:scale-[0.97]">
							<AmazonLogo class="h-4 w-auto" />
							<span>Amazon</span>
							<ArrowIcon class="size-3 -rotate-[135deg]" strokeWidth="2" />
						</a>

						<a
							href={MARKETPLACES.indiamart}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm transition-[background-color,transform] duration-160 ease-out hover:bg-white/25 active:scale-[0.97]">
							<IndiaMartLogo class="h-4 w-auto" />
							<span>IndiaMART</span>
							<ArrowIcon class="size-3 -rotate-[135deg]" strokeWidth="2" />
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<CTA />
