<script>
	import { onMount } from 'svelte';
	import { Seo, Button } from '$components';
	import { reveal, prefersReducedMotion } from '$motion';

	onMount(async () => {
		if (prefersReducedMotion()) return;

		const { default: confetti } = await import('canvas-confetti');

		const shoot = (particleRatio, options) =>
			confetti({
				origin: { y: 0.35 },
				colors: ['#fb923c', '#f97316', '#bfdbfe', '#93c5fd', '#fed7aa'],
				disableForReducedMotion: true,
				...options,
				particleCount: Math.floor(180 * particleRatio)
			});

		shoot(0.25, { spread: 26, startVelocity: 55 });
		shoot(0.2, { spread: 60 });
		shoot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
		shoot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
		shoot(0.1, { spread: 120, startVelocity: 45 });
	});
</script>

<Seo
	title="Message Sent | Daystar Solar"
	description="Thank you for getting in touch with Daystar Solar. Our team will be in contact shortly."
	path="/message-sent"
	robots="noindex, follow"
/>

<section class="container-page flex min-h-[60vh] items-center justify-center py-24 text-center">
	<div class="max-w-lg">
		<p
			data-reveal
			{@attach reveal({ variant: 'scale', trigger: 'load' })}
			class="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-solar-100"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-7 text-solar-600"
				aria-hidden="true"
			>
				<path d="M4 12.5 9.5 18 20 6.5" />
			</svg>
		</p>

		<h1
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.1 })}
			class="font-display text-display text-night-900"
		>
			Message sent
		</h1>

		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.18 })}
			class="mt-4 text-lead text-ink-600"
		>
			Thanks for reaching out. Our team will get back to you shortly.
		</p>

		<div
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.26 })}
			class="mt-9 flex flex-wrap justify-center gap-3"
		>
			<Button href="/" variant="primary" size="lg" chip>Back to home</Button>
			<Button href="/projects" variant="subtle" size="lg">View our projects</Button>
		</div>
	</div>
</section>
