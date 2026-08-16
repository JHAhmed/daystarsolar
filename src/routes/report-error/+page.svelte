<script>
	import { page } from '$app/state';
	import { Seo, Button } from '$components';
	import { reveal } from '$motion';
	import { CONTACT } from '$data/site.js';

	const alreadySolar = $derived(page.url.searchParams.get('solar') === 'true');
</script>

<Seo
	title="Report unavailable | Daystar Solar"
	description="We could not generate your solar report."
	path="/report-error"
	robots="noindex, nofollow" />

<section class="container-page flex min-h-[60vh] items-center py-24">
	<div class="max-w-xl">
		<h1
			data-reveal
			{@attach reveal({ trigger: 'load' })}
			class="font-display text-display text-night-900">
			{alreadySolar ? "You're already on solar" : "We couldn't build your report"}
		</h1>

		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.1 })}
			class="mt-5 text-lead text-ink-600">
			{#if alreadySolar}
				Your connection already has a solar net metering service registered against it, so there is
				no savings estimate for us to calculate. If you'd like to expand your existing system, our
				team can help.
			{:else}
				We couldn't retrieve the billing history for that connection. You can enter your bill
				figures manually instead — it only takes a minute and gives the same report.
			{/if}
		</p>

		<div
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.18 })}
			class="mt-9 flex flex-wrap gap-3">
			{#if !alreadySolar}
				<Button href="/calculator" variant="primary" size="lg" chip>Enter bills manually</Button>
			{/if}
			<Button
				href="/contact"
				variant={alreadySolar ? 'primary' : 'subtle'}
				size="lg"
				chip={alreadySolar}>
				Talk to our team
			</Button>
		</div>

		<p
			data-reveal
			{@attach reveal({ trigger: 'load', delay: 0.26 })}
			class="mt-8 text-sm text-ink-500">
			Prefer to call? <a href={CONTACT.landline.href} class="text-sky-600 hover:underline"
				>{CONTACT.landline.label}</a>
		</p>
	</div>
</section>
