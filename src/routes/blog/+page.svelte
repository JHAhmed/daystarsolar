<script>
	import { Seo, CTA, PageHeader, Button } from '$components';
	import { revealGroup } from '$motion';
	import { pageSchema } from '$lib/seo/schema.js';

	let { data } = $props();

	function formatDate(value) {
		if (!value) return '';
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return value;
		return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<Seo
	title="Blog | Daystar Solar"
	description="Knowledge that powers better decisions. Explore the latest solar insights, guides, and tips from Day Star Solar."
	ogTitle="Blogs | Daystar Solar"
	ogDescription="Read the latest blogs and articles from Daystar Solar, a leading solar energy solutions provider in south india"
	path="/blog"
	schema={pageSchema('Blog', {
		path: '/blog',
		name: 'Daystar Solar Blog',
		description:
			'Read the latest blogs and articles from Daystar Solar, a leading solar energy solutions provider in south india'
	})}
/>

<section class="container-page pt-6 section-bottom md:pt-10">
	<PageHeader eyebrow="Latest Posts" eyebrowPosition="above">
		Benefits of<br />
		Solar Energy
	</PageHeader>

	{#if data.posts.length}
		<div
			class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
			{@attach revealGroup({ variant: 'blur', y: 18 })}
		>
			{#each data.posts as post (post.slug)}
				<article
					data-reveal
					class="group/post flex flex-col overflow-hidden rounded-panel bg-ink-50 transition-shadow duration-[240ms] ease-out hover:shadow-lift"
				>
					<div class="aspect-video overflow-hidden">
						<img
							src={post.image}
							alt={post.title}
							loading="lazy"
							class="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover/post:scale-[1.04]"
						/>
					</div>

					<div class="flex flex-1 flex-col gap-3 p-6">
						{#if post.publishDate}
							<p class="text-eyebrow text-ink-500 uppercase">{formatDate(post.publishDate)}</p>
						{/if}

						<h2 class="font-display text-heading-sm text-night-900">{post.title}</h2>

						{#if post.summary}
							<p class="line-clamp-4 text-sm leading-relaxed text-ink-600">{post.summary}</p>
						{/if}

						<div class="mt-auto pt-4">
							<Button href="/blog/{post.slug}" variant="subtle" size="sm" chip>Read More</Button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<p class="mt-14 text-lead text-ink-500">
			New articles are on the way. Please check back shortly.
		</p>
	{/if}
</section>

<CTA />
