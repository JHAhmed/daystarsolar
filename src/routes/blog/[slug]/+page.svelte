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
	<meta property="og:url" content={`https://daystarsolar.co.in/blog/${post.slug}`} />
	<meta property="og:description" content={post.summary} />
	<script type="application/ld+json">
		{`
			{
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				"url": "https://daystarsolar.co.in/blog/${post.slug}",
				"name": "${post.title}",
				"description": "${post.summary}"
			}
		`}
	</script>
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-8">
	<header use:animateIn={{ blur: 2, y: 5, delay: 0.2, inView: false }} class="opacity-0 mb-8">
		<div class="mb-2 text-sm font-medium text-gray-500">
			{post.publishDate}
		</div>

		<h1 class="mb-6 text-3xl leading-tight tracking-[-0.07em] md:text-4xl lg:text-5xl text-gray-900">
			{post.title}
		</h1>

		{#if post.summary}
			<p class="text-lg leading-relaxed tracking-tight text-gray-600">
				{post.summary}
			</p>
		{/if}
	</header>

	{#if post.image}
		<div use:animateIn={{ blur: 2, y: 5, delay: 0.4, inView: false }} class="opacity-0 mb-8 overflow-hidden rounded-lg">
			<img src={post.image} alt={post.title} class="h-auto w-full object-cover" />
		</div>
	{/if}


	<div use:animateIn={{ blur: 2, y: 5, delay: 0.6, inView: false }} class="opacity-0 prose prose-sm md:prose-lg max-w-none">
		{@html mardkdownContent}
	</div>

	<div class="mt-12 flex justify-between">
		<div class="">
			<a href="/blog" class="inline-flex items-center rounded-lg bg-gray-100 p-2">
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
	/* :global(.prose h1) {
	  font-size: 2.25rem;
	  font-weight: 700;
	  margin-top: 2rem;
	  margin-bottom: 1rem;
	  line-height: 1.2;
	}
	
	:global(.prose h2) {
	  font-size: 1.875rem;
	  font-weight: 600;
	  margin-top: 1.75rem;
	  margin-bottom: 0.75rem;
	  line-height: 1.3;
	}
	
	:global(.prose p) {
	  margin-top: 1rem;
	  margin-bottom: 1rem;
	}
	
	:global(.prose ul) {
	  list-style-type: disc;
	  padding-left: 1.5rem;
	  margin-top: 1rem;
	  margin-bottom: 1rem;
	}
	
	:global(.prose li) {
	  margin-top: 0.25rem;
	  margin-bottom: 0.25rem;
	} */
  </style>