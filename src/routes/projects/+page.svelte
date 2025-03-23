<script>
	import { CTA, ProjectCard } from '$components';
	import { ArrowIcon } from '$icons';
	import { animateIn } from '$lib';

	let { data } = $props();
	let projects = $state(data.projects);

</script>

<svelte:head>
	<title>Projects | Daystar Solar</title>
	<meta
		name="description"
		content="View the latest solar installations and projects from Daystar Solar, a leading solar energy solutions provider in South India."
	/>
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

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		{#each projects as project}

		<div class="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-gray-100 md:flex-row">
			<div class="flex flex-col justify-center p-8 md:w-1/2 space-y-8">
				<h2 class="text-4xl font-normal tracking-tighter">{project.title}</h2>
		
				<p class="text-gray-700">{project.summary}</p>
		
				<div>
					<a href="/projects/{project.slug}?id={project.id}" class="inline-flex items-center rounded-lg bg-white p-3">
						<span class="mr-6 ml-2 tracking-tighter">View More</span>
						<span class="flex items-center justify-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
							<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth=2/>
						</span> 
					</a>
				</div>
			</div>
		
			<!-- Image Section -->
			<div class="md:w-1/2 p-4">
				<img src={project.image} alt={project.title} class="h-full w-full object-cover rounded-lg" />
			</div>
		</div>


		{/each}
	</div>
</section>
