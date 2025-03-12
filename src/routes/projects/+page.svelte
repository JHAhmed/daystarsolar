<script>
	import { CTA, ProjectCard } from '$components';
	import { animateIn } from '$lib';

	const imageFiles = import.meta.glob('/src/lib/images/projects/**/*.{png,jpg,jpeg,webp}', {
		eager: true
	});

	const images = Object.entries(imageFiles).map(([path, module]) => {
		const filename = path.split('/').pop().split('.')[0];
		return {
			title: filename.replace(/-/g, ' '),
			image: module.default
		};
	});

	const projects = [
		{
			title: 'Marina Mall, OMR',
			description: 'A short description on the project. Location, amount of KWh, and such maybe.',
			image: images[0].image,
			link: '/projects/marina-mall'
		},
		{
			title: 'Vestas, Chromepet',
			description: 'A short description on the project. Location, amount of KWh, and such maybe.',
			image: images[4].image,
			link: '/projects/vestas'
		},

	];
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
			<ProjectCard
				title={project.title}
				description={project.description}
				image={project.image}
				link={project.link}
			/>
		{/each}
		<!-- <ProjectCard
			title="Marina Mall"
			description="A short description on the project. Location, amount of KWh, and such maybe."
			image={aboutImage1}
			link="/projects/marina-mall"
		/> -->
	</div>
</section>
