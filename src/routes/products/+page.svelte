<script>
	import { ArrowIcon } from '$icons';
	import { solarImage1, solarImage2, solarImage3, solarImage4 } from '$lib';
	// import AmazonLogo from '$lib/components/AmazonLogo.svelte';
	// import IndiaMartLogo from '$lib/components/IndiaMartLogo.svelte';

	const products = [
		{
			title: 'Solar Street Lights',
			image: solarImage1,
			byds: true,
			alt: 'Solar powered street light against blue cloudy sky'
		},
		{
			title: 'Solar Distribution Boxes',
			image: solarImage2,
			byds: true,
			alt: 'Solar distribution box mounted on red brick wall'
		},
		{
			title: 'Solar Panels',
			image: solarImage3,
			byds: false,
			alt: 'Large solar panel array in a field during cloudy day'
		},
		{
			title: 'Others',
			image: solarImage4,
			byds: false,
			alt: 'Worker installing solar panels on a roof'
		}
	];
</script>

<section class="mx-auto max-w-7xl px-4 py-16">
	<div class="grid gap-6 md:grid-cols-2">
		{#each products as product}
			<div class="group relative h-96 overflow-hidden rounded-2xl">
				<img src={product.image} alt={product.alt} class="h-full w-full object-cover" />

				<div class="absolute inset-0 bg-black/40"></div>

				<div class="absolute -inset-4 flex flex-col justify-between p-8">
					<div class="flex justify-end">
						<div class="rounded-full bg-white p-2">
							<ArrowIcon className="h-4 w-4 text-black -rotate-[135deg]" />
						</div>
					</div>

					<div class="p-4">
						<h3 class="my-2 text-5xl font-semibold tracking-tight text-white">{product.title}</h3>
						{#if product.byds}
							<p class="text-md mb-4 pl-1 text-white/80">By Daystar Solar</p>
						{/if}

						<div class="my-4 flex gap-3">
							<button
								class="flex items-center gap-2 rounded-full border-2 border-white bg-white/20 px-4 py-2 backdrop-blur-sm"
							>
								<ArrowIcon class="h-4 w-4" />
								<span class="text-sm text-white">Amazon</span>
							</button>

							<button
								class="flex items-center gap-2 rounded-full border-2 border-white bg-white/20 px-4 py-2 backdrop-blur-sm"
							>
								<ArrowIcon class="h-4 w-4" />
								<span class="text-sm text-white">IndiaMART</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
