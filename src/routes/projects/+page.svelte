<script>
	import { ArrowIcon } from '$icons';
	import { animateIn } from '$lib';
	import { inView } from 'motion';

	let { data } = $props();
	let projects = $state(data.projects);
</script>

<svelte:head>
	<title>Projects | Daystar Solar</title>
	<meta
		name="description"
		content="View the latest solar installations and projects from Daystar Solar, a leading solar energy solutions provider in South India."
	/>
	<meta property="og:title" content="Projects | Daystar Solar" />
	<meta property="og:description" content="View the latest solar installations and projects from Daystar Solar, a leading solar energy solutions provider in South India."/>
	<meta property="og:image" content="$lib/assets/meta-home.jpg" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"url": "https://daystarsolar.co.in/projects",
			"name": "Our Projects",
			"description": "A showcase of successful solar installations across residential and commercial sectors."
		}
	</script>
</svelte:head>

<section class="my-18 mx-auto mt-8 max-w-7xl px-4 py-12">
	<div class="mx-4 mb-16 text-left">
		<h1
			use:animateIn={{ delay: 0.2 }}
			class="text-5xl leading-tight tracking-[-0.07em] opacity-0 md:text-6xl lg:text-7xl"
		>
			Projects
		</h1>
	</div>

	<div class="grid grid-cols-1 gap-2 md:gap-6 lg:grid-cols-2">
		{#each projects as project, i}
			<div
				use:animateIn={{ delay: 0.7 + i / 4, blur: 8, y: 10, rotate: 1, inView: false }}
				class="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-gray-100 opacity-0 md:flex-row md:rounded-2xl"
			>
				<div class="flex flex-col justify-center space-y-4 p-4 md:w-1/2 md:space-y-8 md:p-6">
					<h2 class="text-2xl font-normal tracking-tighter md:text-4xl">{project.title}</h2>

					<p class="text-sm text-gray-700 md:text-base">{project.summary}</p>

					<div>
						<a
							href="/projects/{project.slug}"
							class="inline-flex items-center rounded-lg bg-white p-2"
						>
							<span class="ml-2 mr-6 tracking-tighter">View More</span>
							<span
								class="flex items-center justify-center rounded-lg bg-orange-400 p-2 drop-shadow-md"
							>
								<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
							</span>
						</a>
					</div>
				</div>

				<!-- Image Section -->
				<div class="p-4 md:w-1/2">
					<img
						src={project.image}
						alt={project.title}
						class="h-full w-full rounded-lg object-cover"
					/>
				</div>
			</div>
		{/each}
	</div>
</section>
