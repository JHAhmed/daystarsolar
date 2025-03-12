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
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-16">

	<div class="mx-4 mb-16 text-left">

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
				class="group relative h-96 overflow-hidden rounded-2xl opacity-0"
			>
				<img
					src={product.image}
					alt={product.alt}
					class="h-full w-full object-cover"
					loading="lazy"
				/>

				<div class="absolute inset-0 bg-black/40"></div>

				<div class="absolute -inset-4 flex flex-col justify-between p-8">
					<div class="flex justify-end">
						<a href="/" class="group/arrow rounded-full bg-white p-2">
							<ArrowIcon
								className="h-4 w-4 group-hover/arrow:text-blue-600 text-black -rotate-[135deg]"
							/>
						</a>
					</div>

					<div class="p-4">
						<h3 class="my-2 text-5xl font-semibold tracking-tight text-white">{product.title}</h3>
						{#if product.byds}
							<p class="text-md mb-4 pl-1 text-white/80">By Daystar Solar</p>
						{/if}

						<div class="my-4 flex gap-3">
							<button
								class="flex items-center gap-2 rounded-full border-2 border-white bg-white/20 px-2 py-2 backdrop-blur-sm"
							>
								<AmazonLogo />
								<span class="mx-2 text-sm text-white">Amazon</span>
							</button>

							<button
								class="flex items-center gap-2 rounded-full border-2 border-white bg-white/20 px-2 py-2 backdrop-blur-sm"
							>
								<IndiaMartLogo />
								<span class="mx-2 text-sm text-white">IndiaMART</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
