<script>
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { animateIn } from '$lib';
	import { ArrowIcon } from '$icons';
	import { browser } from '$app/environment';

	var defaults = {
		spread: 360,
		ticks: 50,
		gravity: 0,
		decay: 0.94,
		startVelocity: 30,
		colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
	};

	const confettiType = {
		particleCount: 100,
		spread: 70,
		origin: { y: 0.6 }
	};

	onMount(async () => {
		const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

		if (browser) {
			await sleep(700);
			confetti(confettiType);
		}
	});
</script>

<svelte:head>
	<title>Email Sent! | Daystar Solar</title>
	<meta name="description" content="" />
</svelte:head>

<section class="my-18 mx-auto mt-8 max-w-7xl px-4 py-12">
	<div class="mx-4 mb-16 space-y-12 text-center">
		<h1
			use:animateIn={{ delay: 0.2, y: 5 }}
			class="text-2xl leading-tight tracking-tighter opacity-0 md:text-3xl lg:text-5xl"
		>
			Your email has been sent! <br />We'll get back to your shortly
		</h1>

		<div use:animateIn={{ delay: 0.4, y: 5 }} class="opacity-0">
			<a
				href="/projects"
				class="mt-auto inline-flex w-fit items-center justify-center rounded-lg bg-gray-100 p-3"
			>
				<span class="ml-2 mr-6 tracking-tighter">Explore More</span>
				<span class="justi fy-center flex items-center rounded-lg bg-orange-400 p-2 drop-shadow-md">
					<ArrowIcon className="-rotate-90 size-4 text-white" strokeWidth="2" />
				</span>
			</a>
		</div>
	</div>
</section>
