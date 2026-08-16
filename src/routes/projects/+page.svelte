<script>
	import { Seo, CTA, PageHeader, Button } from '$components';
	import { revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';

	let { data } = $props();
</script>

<Seo
	title="Projects | Daystar Solar"
	description="View Day Star Solar's completed projects and discover the solar solutions delivered for different customer requirements."
	ogDescription="Real rooftops, real savings - a portfolio of solar projects built to perform for decades by Daystar Solar"
	path="/projects"
	image="/ogprojects.png"
	schema={pageSchema('CollectionPage', {
		path: '/projects',
		name: 'Our Projects',
		description:
			'A showcase of successful solar installations across residential and commercial sectors.'
	})}
/>

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader>Our Projects</PageHeader>

	{#if data.projects.length}
		<div class="mt-14 grid gap-5 lg:grid-cols-2" {@attach revealGroup({ variant: 'blur', y: 18 })}>
			{#each data.projects as project (project.slug)}
				<article
					data-reveal
					class="group/project flex flex-col overflow-hidden rounded-panel bg-ink-50 transition-shadow duration-[240ms] ease-out hover:shadow-lift md:flex-row"
				>
					<div class="flex flex-col justify-center gap-5 p-6 md:w-1/2 md:p-8">
						<h2 class="font-display text-heading text-night-900 md:text-heading-lg">
							{project.title}
						</h2>

						{#if project.summary}
							<p class="text-sm leading-relaxed text-ink-600">{project.summary}</p>
						{/if}

						<div>
							<Button href="/projects/{project.slug}" variant="subtle" size="sm" chip>
								View More
							</Button>
						</div>
					</div>

					<div class="p-3 md:w-1/2 md:py-6 md:pr-6 md:pl-0">
						<img
							src={project.image}
							alt={project.title}
							loading="lazy"
							class="h-56 w-full rounded-card object-cover transition-transform duration-[600ms] ease-out group-hover/project:scale-[1.02] md:h-full"
						/>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<p class="mt-14 text-lead text-ink-500">
			Projects are being updated. Please check back shortly.
		</p>
	{/if}
</section>

<CTA />
