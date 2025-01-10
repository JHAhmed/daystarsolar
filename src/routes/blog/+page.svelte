<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1, aboutImage2, aboutImage3 } from '$lib';

	import {
		CheckBadgeIcon,
		CogIcon,
		CubeIcon,
		GlobeAmericasIcon,
		LightBulbIcon,
		ShieldCheckIcon,
		SunIcon,
		WrenchIcon
	} from '@fvilers/heroicons-svelte/24/solid';

	const blogs = [
		{
			title: 'The Benefits of Solar Energy',
			date: 'June 1, 2021',
			image: aboutImage1,
			excerpt:
				'Solar energy is a renewable and sustainable source of power that can help reduce your electricity bills and carbon footprint.'
		},
		{
			title: 'How Solar Panels Work',
			date: 'June 15, 2021',
			image: aboutImage2,
			excerpt:
				'Solar panels convert sunlight into electricity through the photovoltaic effect. Learn how this process works.'
		},
		{
			title: 'The Future of Solar Energy',
			date: 'July 1, 2021',
			image: aboutImage3,
			excerpt:
				'Solar energy is becoming more affordable and efficient, making it a viable alternative to traditional power sources.'
		}
	];
</script>

<svelte:head>
	<title>Blog | Daystar Solar</title>
	<meta
		name="description"
		content="Read the latest blogs and articles from Daystar Solar, a leading solar energy solutions provider in South India."
	/>
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
			<div use:animateIn={{ delay: 0.7 + i / 4, blur: 8, y: 10, rotate: 1 }} class="opacity-0">
				<div class="aspect-square overflow-hidden">
					<img
						src={blog.image}
						alt="Solar panels on various buildings"
						class="h-full w-full rounded-xl object-cover"
					/>
				</div>
				<div class="mt-4">
					<p class="text-sm text-gray-500">{blog.date}</p>
					<h2 class="mt-2 text-lg font-semibold">{blog.title}</h2>
					<p class="mt-2 text-gray-600">{blog.excerpt}</p>
				</div>

				<div class="mt-4">
					<a href="/blog/{blog.title}" class="text-blue-500">Read More</a>
				</div>
			</div>
		{/each}
	</div>
</section>
