<script>
	import { onMount } from 'svelte';

	let { data } = $props();
    let post = $state(data.post);

    let mardkdownContent = $state(post.content.content[0].content[0].value);
	
	onMount(async () => {
		const { marked } = await import('marked');
		mardkdownContent = marked.parse(mardkdownContent);
	});
</script>

<article class="mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<div class="mb-2 text-sm font-medium text-gray-500">
			{post.publishDate}
		</div>

		<h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900">
			{post.title}
		</h1>

		{#if post.summary}
			<p class="text-xl leading-relaxed text-gray-600">
				{post.summary}
			</p>
		{/if}
	</header>

	{#if post.image}
		<div class="mb-8 overflow-hidden rounded-lg">
			<img src={post.image} alt={post.title} class="h-auto w-full object-cover" />
		</div>
	{/if}


	<div class="prose prose-lg max-w-none">
		{@html mardkdownContent}
	</div>

</article>

<style>
	:global(.prose h1) {
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
	}
  </style>