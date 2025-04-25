<script>
	import { onMount } from 'svelte';
	import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
	import { ArrowIcon } from '$icons';
	import { animateIn } from '$lib';
	import { inView } from 'motion';

	let { data } = $props();
	let post = $state(data.post);

	// let richText = $state(post.content.content[0].content[0].value);
	let richText = $state(post.content);
	let mardkdownContent = $state(documentToHtmlString(richText));

	onMount(async () => {
		const { marked } = await import('marked');
		mardkdownContent = marked.parse(mardkdownContent);
	});
</script>

<svelte:head>
	<title>{post.title} | Daystar Solar</title>
	<meta name="description" content={post.summary} />
	<meta property="og:title" content={post.title} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://daystar.co.in/projects/${post.slug}`} />
	<meta property="og:description" content={post.summary} />
	<script type="application/ld+json">
		{`
			{
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				"url": "https://daystarsolar.co.in/projects/${post.slug}",
				"name": "${post.title}",
				"description": "${post.summary}"
			}
		`}
	</script>
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-8">
	<header use:animateIn={{ blur: 2, y: 5, delay: 0.2, inView: false }} class="mb-8 opacity-0">
		<div class="mb-2 text-sm font-medium text-gray-500">
			{post.publishDate}
		</div>

		<h1
			class="mb-4 text-3xl leading-tight tracking-[-0.07em] text-gray-900 md:text-4xl lg:text-5xl"
		>
			{post.title}
		</h1>

		{#if post.location}
			<p class="mb-4 text-lg leading-relaxed text-gray-600">
				{post.location}
			</p>
		{/if}

		{#if post.summary}
			<p class="text-xl leading-relaxed tracking-tight text-gray-600">
				{post.summary}
			</p>
		{/if}
	</header>

	{#if post.image}
		<div
			use:animateIn={{ blur: 2, y: 5, delay: 0.4, inView: false }}
			class="mb-8 overflow-hidden rounded-lg opacity-0"
		>
			<img src={post.image} alt={post.title} class="h-auto w-full object-cover" />
		</div>
	{/if}

	<div
		use:animateIn={{ blur: 2, y: 5, delay: 0.6, inView: false }}
		class="prose prose-lg max-w-none opacity-0"
	>
		{@html mardkdownContent}
	</div>

	<div class="mt-12 flex justify-between">
		<div class="">
			<a href="/projects" class="inline-flex items-center rounded-lg bg-gray-100 p-2">
				<span class="flex items-center justify-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
					<ArrowIcon className="rotate-90 size-4 text-white" strokeWidth="2" />
				</span>
				<span class="ml-2 mr-6 tracking-tight">Back</span>
			</a>
		</div>
		<div class="text-right">
			<a href="/contact" class="inline-flex items-center rounded-lg bg-gray-100 p-2">
				<span class="ml-2 mr-6 tracking-tight">Contact</span>
				<span class="flex items-center justify-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
					<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
				</span>
			</a>
		</div>
	</div>
</article>

<style>
</style>
