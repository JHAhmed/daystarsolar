<script>
	import { page } from '$app/state';
	import { SITE } from '$data/site.js';
	import { absolute, serializeJsonLd } from '$lib/seo/schema.js';

	/**
	 * Every page's head tags, in one place.
	 *
	 * The previous site deliberately kept titles and descriptions out of the
	 * root layout, because Svelte merges `<svelte:head>` blocks rather than
	 * overriding them — a default in the layout meant every page shipped two
	 * <title> tags and two descriptions, and search engines picked the wrong
	 * one. That constraint still holds. This component doesn't break it: it is
	 * rendered by the page, not the layout, so exactly one of each is emitted.
	 *
	 * `ogTitle` and `ogDescription` exist because several pages intentionally
	 * differ between what search results show and what a shared link shows.
	 * The homepage, for instance, has a descriptive meta description but uses
	 * the tagline for og:description.
	 */
	let {
		/** The complete <title>, suffix included. Never auto-composed. */
		title,
		description,
		/** Site-relative path. Defaults to the current route. */
		path,
		image = SITE.defaultOgImage,
		type = 'website',
		robots,
		ogTitle,
		ogDescription,
		/** A schema object, or an array of them. */
		schema
	} = $props();

	const url = $derived(absolute(path ?? page.url.pathname));
	const imageUrl = $derived(absolute(image));

	const blocks = $derived(schema ? (Array.isArray(schema) ? schema : [schema]) : []);
	const jsonLd = $derived(
		blocks
			.map((block) => `<script type="application/ld+json">${serializeJsonLd(block)}<\/script>`)
			.join('')
	);
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if robots}
		<meta name="robots" content={robots} />
	{/if}
	<link rel="canonical" href={url} />

	<meta property="og:title" content={ogTitle ?? title} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	{#if ogDescription ?? description}
		<meta property="og:description" content={ogDescription ?? description} />
	{/if}

	{@html jsonLd}
</svelte:head>
