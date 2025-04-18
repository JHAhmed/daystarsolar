<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1, aboutImage2, aboutImage3 } from '$lib';

	import { logo } from '$lib';
	import { goto } from '$app/navigation';

	const imageModules = import.meta.glob('/src/lib/images/gallery/**/*.webp', {
		eager: true, 
		as: 'url' 
	});

	const galleryItems = Object.entries(imageModules).map(([path, src]) => {
		const pathSegments = path.split('/');
		const project = pathSegments.length > 2 ? pathSegments[pathSegments.length - 2] : null;
		return { src, project };
	});

	const linkMap = {
		'featherlite-sriperumbudur': '/projects/featherlite-sriperumbudur?id=59trDtEVM4IztoOauGELfl',
		'featherlite-the-address': '/projects/featherlite-the-address?id=2BpwPrejTnX1dXEfMcEtIm',
		'victoria-towers': '/projects/victoria-towers?id=1tVvmnnxH3veMCulOBAMOW',
		'vestas': '/projects/vestas?id=1iOb7yo0eJCzuZ7gtVvCnY',
		'trove': '/projects/trove?id=2TPzHsTRKMhtm4Jyz1KQWP',
		'therelek': '/projects/therelek?id=myhfxY9gmPonrspiTDbAl',
		'sana-school': '/projects/sana-school?id=3o9jHuaSgHyYmq3EZ7x4qM',
		'residence-2': '/projects/residence-2?id=QRNZ0S6QpqOOz5dB56Tfk',
		'residence-1': '/projects/residence-1?id=7aeLAWqe2jA8x2eC4JWrwc',
		'mylapore': '/projects/mylapore?id=2ENxO7XiMPph3MOd3JItig',
		'm-convention': '/projects/m-convention?id=2WdZPiNbGFSDkdJf5FybeJ',
		'marina-mall': '/projects/marina-mall?id=53aDknlFVpSnJg6QAz7ozZ',
		'aruns-castle': '/projects/aruns-castle?id=7rp1mGK0OH67t0BBNvSCPO',
	}

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
			class="text-5xl leading-tight tracking-[-0.07em] md:text-6xl lg:text-7xl opacity-0"
		>
			Gallery
		</h1>
	</div>

	<div class="grid grid-cols-3 gap-2">
		{#each galleryItems as image}
			<a class="project-card"
				href={linkMap[image.project]}>
				<img src={image.src} alt="Image for project {image.project}" class="rounded-lg" loading="lazy"/>
			</a>
		{/each}
	</div>
</section>
