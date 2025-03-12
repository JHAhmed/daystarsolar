<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1, aboutImage2, aboutImage3 } from '$lib';

	import { logo } from '$lib';

	const imageFiles = import.meta.glob('/src/lib/images/projects/**/*.{png,jpg,jpeg,webp}', { eager: true });

const projects = Object.entries(imageFiles).map(([path, module]) => {
  const filename = path.split('/').pop().split('.')[0];
  return {
    title: filename.replace(/-/g, ' '),
    image: module.default
  };
});


	console.log(projects);
</script>

<svelte:head>
	<title>Gallery | Daystar Solar</title>
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
            Gallery
		</h1>
	</div>

	<div class="grid grid-cols-3 gap-2">
		{#each projects as project}
			<div class="project-card">
				<img src={project.image} class="rounded-lg" alt={project.title} loading="lazy"/>
				<!-- <h3>{project.title}</h3> -->
			</div>
		{/each}
	</div>

</section>