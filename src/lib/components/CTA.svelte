<script>
	import { reveal } from '$motion';
	import { ArrowIcon } from '$icons';
	import Button from './ui/Button.svelte';
	import ctaBackground from '$lib/assets/images/cta-bg.jpg?enhanced';
</script>

<section class="container-page">
	<div
		data-reveal
		{@attach reveal({ variant: 'blur' })}
		class="relative my-12 overflow-hidden rounded-panel bg-ink-50 p-8 sm:p-10 lg:p-14"
	>
		<!-- The diagonal crop is the original CTA's one real flourish; it stays,
		     but as a mask on a properly sized image rather than an absolutely
		     positioned `object-none` element that overflowed on small screens. -->
		<div class="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-1/2">
			<enhanced:img
				src={ctaBackground}
				alt=""
				aria-hidden="true"
				loading="lazy"
				class="diagonal h-full w-full object-cover opacity-35 sm:opacity-60 lg:opacity-100"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-ink-50 via-ink-50/40 to-transparent"></div>
		</div>

		<div class="relative flex flex-col gap-8 sm:gap-10">
			<div class="space-y-2">
				<h2 class="max-w-lg font-display text-display text-night-900 lg:text-display-lg">
					Still have <span class="text-sky-300">questions</span>?
				</h2>
				<p class="text-lead text-ink-700">Get in touch.</p>
			</div>

			<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
				<Button href="/contact" variant="accent" shape="pill" size="lg" chip>Contact Us</Button>

				<a
					href="/gallery"
					class="group/explore inline-flex items-center gap-1 rounded-lg px-2 py-2 text-base font-medium text-ink-700 transition-colors duration-[160ms] ease-out hover:text-night-900"
				>
					Explore
					<span
						class="flex items-center justify-center transition-transform duration-[200ms] ease-out group-hover/explore:translate-x-1"
					>
						<ArrowIcon class="size-5 -rotate-90" strokeWidth="2" />
					</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.diagonal {
		clip-path: polygon(22% 0, 100% 0, 100% 100%, 0 100%);
	}
</style>
