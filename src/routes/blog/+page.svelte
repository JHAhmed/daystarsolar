<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1 } from '$lib';
	import { ArrowIcon } from '$icons';

	let { data } = $props();
	let blogs = $state(data.blogs);
</script>

<svelte:head>
	<title>Blog | Daystar Solar</title>
	<meta
		name="description"
		content="Read the latest blogs and articles from Daystar Solar, a leading solar energy solutions provider in South India."
	/>
	<meta property="og:title" content="Blogs | Daystar Solar" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://daystarsolar.co.in/blog" />
	<meta
		property="og:description"
		content="Read the latest blogs and articles from Daystar Solar, a leading solar energy solutions provider in South India."
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Blog",
			"url": "https://daystarsolar.co.in/blog",
			"name": "Daystar Solar Blog",
			"description": "Latest news, insights, and tips about solar energy, sustainability, and our projects."
		}
	</script>
</svelte:head>

<section class="my-18 mx-auto mt-8 max-w-7xl px-4 py-12">
	<div class="mx-4 mb-16 text-left">
		<p
			use:animateIn={{ delay: 0.5 }}
			class="text-md mb-2 pl-2 uppercase tracking-widest text-gray-600 opacity-0"
		>
			Latest Posts
		</p>
		<h1
			use:animateIn={{ delay: 0.2 }}
			class="text-5xl leading-tight tracking-[-0.07em] opacity-0 md:text-6xl lg:text-7xl"
		>
			Recent Blogs<br />
			& Articles
		</h1>
	</div>

	<div class="mt-6 grid grid-cols-1 gap-6 p-4 md:grid-cols-3">
		{#each blogs as blog, i}
			<div
				use:animateIn={{ delay: 0.7 + i / 4, blur: 8, y: 10, rotate: 1, inView: false }}
				class="flex flex-col rounded-xl bg-gray-50 p-2 opacity-0"
			>
				<div class="aspect-video overflow-hidden md:aspect-square">
					<img
						src={blog.image}
						alt="Solar panels on various buildings"
						class="h-full w-full rounded-xl object-cover"
					/>
				</div>
				<div class="my-4 grow">
					<p class="text-sm text-gray-500">{blog.date}</p>
					<h2 class="mt-2 text-base font-semibold md:text-lg">{blog.title}</h2>
					<p class="mt-2 text-sm text-gray-600 md:text-base">{blog.summary}</p>
				</div>

				<div>
					<a
						href="/blog/{blog.slug}"
						class="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-gray-100 p-3"
					>
						<span class="ml-2 mr-6 tracking-tighter">Read More</span>
						<span
							class="flex items-center justify-center rounded-lg bg-orange-400 p-2 drop-shadow-md"
						>
							<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
						</span>
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>
