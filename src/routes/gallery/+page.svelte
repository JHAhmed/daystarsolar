<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1, aboutImage2, aboutImage3 } from '$lib';
	import { Dialog } from 'bits-ui';
	import { ArrowIcon } from '$icons';

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
		'aruns-castle': '/projects/aruns-castle?id=7rp1mGK0OH67t0BBNvSCPO'
	};

	let modal;
	let isModal = false;
	let modalImage;

    function closeModal() {
        isModal = false;
    }

	function viewImage(image) {
		isModal = true;
		modalImage = image;
	}

	   // Function to handle clicks on the backdrop
	   function handleBackdropClick(event) {
        // Check if the click target is the backdrop div itself
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
</script>

<svelte:head>
	<title>Gallery | Daystar Solar</title>
	<meta
		name="description"
		content="View the latest solar installations and projects from Daystar Solar, a leading solar energy solutions provider in South India."
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"url": "https://daystarsolar.co.in/gallery",
			"name": "Gallery",
			"description": "Browse our visual portfolio of completed solar installations and projects."
		}
	</script>
</svelte:head>

<!-- <a class="project-card" href={linkMap[image.project]}>
</a> -->

<section class="my-18 mx-auto mt-8 max-w-7xl px-4 py-12">
	<div class="mx-4 mb-16 text-left">
		<h1
			use:animateIn={{ delay: 0.2 }}
			class="text-5xl leading-tight tracking-[-0.07em] opacity-0 md:text-6xl lg:text-7xl"
		>
			Gallery
		</h1>
	</div>

	<div class="grid grid-cols-3 gap-2">
		{#each galleryItems as image}
			<button onclick={() => {viewImage(image)}}>
				<img
					src={image.src}
					alt="Image for project {image.project}"
					class="rounded-lg"
					loading="lazy"
				/>
			</button>
		{/each}
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	{#if isModal}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={handleBackdropClick} class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
			<dig class="mx-auto my-auto flex h-1/2 w-1/2 flex-col items-center justify-center gap-2">
				<img
					src={modalImage.src}
					alt="Image for project {modalImage.project}"
					class="rounded-lg border-2 border-black"
					loading="lazy"
				/>
				<div class="flex space-x-2">
					<button
						onclick={closeModal}
						class="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-red-200 p-3"
					>
					<span
					class="justi fy-center flex items-center rounded-lg bg-red-400 p-2 drop-shadow-md"
				>
					<ArrowIcon className="rotate-90 size-4 text-white" strokeWidth="2" />
				</span>
						<span class="ml-2 mr-6 tracking-tighter">Close</span>
					</button>
					<a
						href={linkMap[modalImage.project]}
						class="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-white p-3"
					>
						<span class="ml-2 mr-6 tracking-tighter">View Project</span>
						<span
							class="justi fy-center flex items-center rounded-lg bg-orange-400 p-2 drop-shadow-md"
						>
							<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
						</span>
					</a>
				</div>
			</dig>
		</div>
	{/if}
</section>
