<script>
	import { reveal } from '$motion';
	import Button from './ui/Button.svelte';

	/**
	 * Long-form layout shared by /projects/[slug] and /blog/[slug].
	 *
	 * This page was one of the ones already worth keeping, so the structure is
	 * unchanged — date, title, location, summary, hero image, body, then the
	 * back and contact pair. What changed is that the body arrives as HTML
	 * rendered on the server rather than being parsed in onMount, and the type
	 * comes from the shared scale instead of a per-page tracking value.
	 */
	let { post, backHref, backLabel = 'Back' } = $props();

	const formattedDate = $derived.by(() => {
		if (!post.publishDate) return '';
		const date = new Date(post.publishDate);
		if (Number.isNaN(date.getTime())) return post.publishDate;
		return date.toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	});
</script>

<article class="container-prose pt-6 section-bottom md:pt-10">
	<header data-reveal {@attach reveal({ variant: 'blur', trigger: 'load' })} class="mb-10">
		{#if formattedDate}
			<p class="mb-4 text-eyebrow text-ink-500 uppercase">{formattedDate}</p>
		{/if}

		<h1 class="font-display text-display text-night-900 md:text-display-lg">{post.title}</h1>

		{#if post.location}
			<p class="mt-4 text-lead text-ink-500">{post.location}</p>
		{/if}

		{#if post.summary}
			<p class="mt-5 text-lead text-ink-600">{post.summary}</p>
		{/if}
	</header>

	{#if post.image}
		<div
			data-reveal
			{@attach reveal({ variant: 'blur', trigger: 'load', delay: 0.12 })}
			class="mb-12 overflow-hidden rounded-panel"
		>
			<img
				src={post.image}
				width="1280"
				height="720"
				alt={post.title}
				class="h-auto w-full object-cover"
			/>
		</div>
	{/if}

	<!-- Body HTML comes from the client's own Contentful space, rendered
	     server-side. It is authored content, not request input. -->
	<div
		data-reveal
		{@attach reveal({ trigger: 'load', delay: 0.2 })}
		class="article-body max-w-none"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html post.body}
	</div>

	<div class="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-8">
		<Button href={backHref} variant="subtle" size="md" class="flex-row-reverse">
			{backLabel}
		</Button>
		<Button href="/contact" variant="primary" size="md" chip>Contact</Button>
	</div>
</article>

<style>
	/* Typography for CMS-authored markup. Written here rather than reaching for
	   the prose plugin so the article inherits the site's own type scale and
	   ink ramp instead of a second, parallel set of defaults. */
	.article-body {
		color: var(--color-ink-700);
		font-size: 1.0625rem;
		line-height: 1.75;
	}

	.article-body :global(h2) {
		margin-top: 2.5rem;
		margin-bottom: 0.85rem;
		font-family: var(--font-display);
		font-size: var(--text-heading-lg);
		line-height: var(--text-heading-lg--line-height);
		letter-spacing: var(--text-heading-lg--letter-spacing);
		font-weight: 500;
		color: var(--color-night-900);
	}

	.article-body :global(h3) {
		margin-top: 2rem;
		margin-bottom: 0.6rem;
		font-family: var(--font-display);
		font-size: var(--text-heading);
		line-height: var(--text-heading--line-height);
		letter-spacing: var(--text-heading--letter-spacing);
		font-weight: 500;
		color: var(--color-night-900);
	}

	.article-body :global(h4) {
		margin-top: 1.75rem;
		margin-bottom: 0.5rem;
		font-family: var(--font-sans);
		font-size: 1.0625rem;
		font-weight: 600;
		color: var(--color-night-900);
	}

	.article-body :global(p) {
		margin-block: 1.15rem;
	}

	.article-body :global(ul),
	.article-body :global(ol) {
		margin-block: 1.15rem;
		padding-left: 1.35rem;
	}

	.article-body :global(ul) {
		list-style: disc;
	}

	.article-body :global(ol) {
		list-style: decimal;
	}

	.article-body :global(li) {
		margin-block: 0.4rem;
	}

	.article-body :global(li::marker) {
		color: var(--color-solar-400);
	}

	.article-body :global(strong) {
		font-weight: 600;
		color: var(--color-night-900);
	}

	.article-body :global(a) {
		color: var(--color-solar-700);
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: color var(--duration-fast) ease;
	}

	.article-body :global(a:hover) {
		color: var(--color-solar-600);
	}

	.article-body :global(blockquote) {
		margin-block: 1.75rem;
		border-left: 2px solid var(--color-solar-300);
		padding-left: 1.25rem;
		font-style: italic;
		color: var(--color-ink-600);
	}

	.article-body :global(img) {
		margin-block: 2rem;
		width: 100%;
		border-radius: var(--radius-card);
	}

	.article-body :global(table) {
		margin-block: 1.75rem;
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9375rem;
	}

	.article-body :global(th),
	.article-body :global(td) {
		border: 1px solid var(--color-ink-200);
		padding: 0.6rem 0.75rem;
		text-align: left;
	}

	.article-body :global(th) {
		background: var(--color-ink-50);
		font-weight: 600;
		color: var(--color-night-900);
	}

	.article-body :global(hr) {
		margin-block: 2.5rem;
		border-color: var(--color-ink-200);
	}
</style>
