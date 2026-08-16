<script>
	import { page } from '$app/state';
	import { Button } from '$components';
	import { reveal } from '$motion';

	const heading = $derived(page.status === 404 ? 'Page not found' : 'Something went wrong');
	const body = $derived(
		page.status === 404
			? "The page you're looking for doesn't exist or has moved."
			: (page.error?.message ?? 'An unexpected error occurred. Please try again.')
	);
</script>

<svelte:head>
	<title>{page.status} | Daystar Solar</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="container-page flex min-h-[60vh] items-center py-24">
	<div class="max-w-xl">
		<p
			data-reveal
			{@attach reveal({ trigger: 'load' })}
			class="font-display text-display-xl text-solar-400 lg:text-display-2xl">
			{page.status}
		</p>

		<h1
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.08 })}
			class="mt-4 font-display text-display text-night-900">
			{heading}
		</h1>

		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.16 })}
			class="mt-4 text-lead text-ink-600">
			{body}
		</p>

		<div
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.24 })}
			class="mt-9 flex flex-wrap gap-3">
			<Button href="/" variant="primary" size="lg" chip>Back to home</Button>
			<Button href="/contact" variant="subtle" size="lg">Contact us</Button>
		</div>
	</div>
</section>
