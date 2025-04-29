<script>
	import { ArrowIcon } from '$icons';
	import { animateIn, solarImage1, solarImage2, solarImage3, solarImage4 } from '$lib';
	import { IndiaMartLogo, AmazonLogo } from '$components';

	const products = [
		{
			title: 'Panels & Inverters',
			image: solarImage2,
			byds: false,
			alt: 'Large solar panel array in a field during cloudy day'
		},
		{
			title: 'Solar Distribution Boxes',
			image: solarImage4,
			byds: true,
			alt: 'Solar distribution box mounted on red brick wall'
		},
		{
			title: 'Balance of System',
			image: solarImage3,
			byds: true,
			alt: 'Solar powered street light against blue cloudy sky'
		},
		{
			title: 'Others',
			image: solarImage1,
			byds: false,
			alt: 'Worker installing solar panels on a roof'
		}
	];
</script>

<svelte:head>
	<title>Products | Daystar Solar</title>
	<meta
		name="description"
		content="Daystar Solar offers a wide range of solar products including street lights, distribution boxes, and solar panels for residential and commercial use."
	/>
	<meta property="og:title" content="Products | Daystar Solar" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://daystarsolar.co.in/products" />
	<meta
		property="og:description"
		content="Daystar Solar offers a wide range of solar products including street lights, distribution boxes, and solar panels for residential and commercial use."
	/>	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"url": "https://daystarsolar.co.in/products",
			"name": "Solar Products",
			"description": "Explore our range of high-efficiency solar panels, inverters, batteries, and accessories."
		}
	</script>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="mb-10 text-left md:mb-12 lg:mb-16">
		<h1
			use:animateIn={{ delay: 0.2 }}
			class="text-5xl leading-tight tracking-[-0.07em] opacity-0 md:text-6xl lg:text-7xl"
		>
			Shop Our Products
		</h1>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		{#each products as product, i}
			<div
				use:animateIn={{ blur: 8, delay: i / 4 }}
				class="group relative overflow-hidden rounded-2xl opacity-0"
			>
				<div class="aspect-[4/3] sm:aspect-video lg:aspect-[3/2]">
					<img
						src={product.image}
						alt={product.alt}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				<div
					class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
				></div>

				<div class="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
					<div class="flex justify-end">
						<a
							href="/"
							aria-label="View product details"
							class="group/arrow rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition hover:bg-white sm:p-2"
						>
							<ArrowIcon
								className="h-3 w-3 text-black transition duration-300 group-hover/arrow:text-blue-600 group-hover/arrow:-rotate-[135deg] sm:h-4 sm:w-4"
							/>
						</a>
					</div>

					<div>
						<h3
							class="my-1 text-2xl font-semibold tracking-tight text-white sm:my-2 md:text-3xl lg:text-5xl"
						>
							{product.title}
						</h3>
						{#if product.byds}
							<p class="mb-3 hidden pl-px text-sm text-white/80 sm:mb-4 sm:text-base lg:block">
								By Daystar Solar
							</p>
						{/if}

						<div class="my-2 flex flex-wrap gap-2 sm:my-4 sm:gap-3">
							<a
								href="https://www.amazon.in/stores/DaystarSolar/page/EEE44EC4-A6FA-4DDA-B319-B5711BA870CD/"
								target="_blank"
								class="flex items-center gap-1.5 rounded-full border border-white/50 bg-white/20 px-3 py-1.5 text-xs backdrop-blur-sm transition hover:bg-white/30 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
							>
								<AmazonLogo class="h-4 w-auto sm:h-5" />
								<span class="text-white">Amazon</span>
							</a>

							<a
								href="https://www.indiamart.com/daystarsolar/"
								target="_blank"
								class="flex items-center gap-1.5 rounded-full border border-white/50 bg-white/20 px-3 py-1.5 text-xs backdrop-blur-sm transition hover:bg-white/30 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
							>
								<IndiaMartLogo class="h-4 w-auto sm:h-5" />
								<span class="text-white">IndiaMART</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
