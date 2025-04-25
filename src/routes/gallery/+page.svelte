<script>
	import { CTA } from '$components';
	import { animateIn, aboutImage1, aboutImage2, aboutImage3 } from '$lib';
	import { Dialog } from 'bits-ui';
	import { ArrowIcon } from '$icons';

	import { logo } from '$lib';
	import { goto } from '$app/navigation';

	const imageModules = import.meta.glob('/src/lib/images/gallery/**/*.webp', {
		eager: true,
		query: '?url', // Use query instead of as
		import: 'default' // Import the default export (the URL string)
	});

	const galleryItems = Object.entries(imageModules).map(([path, src]) => {
		const pathSegments = path.split('/');
		const project = pathSegments.length > 2 ? pathSegments[pathSegments.length - 2] : null;
		return { src, project };
	});

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
	<meta property="og:title" content="Gallery | Daystar Solar" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://daystar.co.in/gallery" />
	<meta
		property="og:description"
		content="Browse our visual portfolio of completed solar installations and projects showcasing the best of solar energy solutions."
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"url": "https://daystarsolar.co.in/gallery",
			"name": "Gallery",
			"description": "Browse our visual portfolio of completed solar installations and projects showcasing the best of solar energy solutions."
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

	<div class="grid grid-cols-2 gap-2 md:grid-cols-3">
		{#each galleryItems as image}
			<button
				onclick={() => {
					viewImage(image);
				}}
			>
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
		<div
			onclick={handleBackdropClick}
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
		>
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
						class="mt-auto inline-flex text-xs md:text-sm w-fit items-center justify-center rounded-lg bg-red-200 p-1 md:p-3"
					>
						<span
							class="justify-center flex items-center rounded-lg bg-red-400 p-2 drop-shadow-md"
						>
							<ArrowIcon className="rotate-90 size-4 text-white" strokeWidth="2" />
						</span>
						<span class="ml-2 mr-6 tracking-tighter">Close</span>
					</button>
					<a
						href={`projects/${modalImage.project}`}
						class="mt-auto inline-flex text-xs md:text-sm w-fit items-center justify-center rounded-lg bg-white p-1 md:p-3"
					>
						<span class="ml-2 mr-6 tracking-tighter">View Project</span>
						<span
							class="justify-center flex items-center rounded-lg bg-orange-400 p-2 drop-shadow-md"
						>
							<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
						</span>
					</a>
				</div>
			</dig>
		</div>
	{/if}
</section>
