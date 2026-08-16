<script>
	import { reveal } from '$motion';
	import { ArrowIcon } from '$icons';
	import Button from './ui/Button.svelte';
	import ctaBackground from '$lib/assets/images/sample-2.webp?enhanced';

	/**
	 * Closing call to action, shared across pages.
	 *
	 * The first pass kept the original's flat grey panel with a diagonally
	 * clipped photo pinned to one corner — the crop was arbitrary and the panel
	 * had no weight against everything above it. This version makes the
	 * photograph the panel: full bleed, a scrim heavy enough to hold text on
	 * the left and clearing to the image on the right, and the heading at
	 * display scale. Copy is unchanged.
	 *
	 * The photograph is one of the firm's own installations rather than the
	 * previous stock rooftop, because that file is only 640x427 — a full-bleed
	 * panel renders it around 1300px wide, so it was being upscaled past 2x
	 * (past 4x on a retina screen) and looked soft. `enhanced:img` only ever
	 * scales down, so no build setting could have rescued it; the source had to
	 * change. `scale-110` went with it: it existed to hide the edge during the
	 * parallax travel, and that attachment is no longer applied.
	 */
</script>

<section class="container-page">
	<div
		data-reveal
		data-parallax-root
		{@attach reveal({ y: 24 })}
		class="relative isolate my-12 overflow-hidden rounded-panel bg-night-900">
		<enhanced:img
			src={ctaBackground}
			alt=""
			aria-hidden="true"
			loading="lazy"
			class="absolute inset-0 -z-10 h-full w-full object-cover" />

		<!-- Two scrims rather than one: a horizontal ramp that keeps the type
		     legible while letting the panels on the right stay visible, and a
		     flat wash underneath so the image never gets bright enough to
		     compete on small screens where the text sits over the middle. The
		     ramp runs heavier than it did for the old dusk photograph, which
		     was dark to begin with; this one is shot in daylight. -->
		<div
			class="absolute inset-0 -z-10 bg-linear-to-r from-night-950 via-night-950/88 to-night-950/30">
		</div>
		<div class="absolute inset-0 -z-10 bg-night-950/45 sm:bg-night-950/10"></div>

		<div class="relative flex flex-col gap-10 p-8 sm:p-12 lg:gap-12 lg:p-16 xl:p-20">
			<div class="max-w-xl space-y-3">
				<h2 class="font-display text-display text-white lg:text-display-lg xl:text-display-xl">
					Still have <span class="text-sky-300">questions</span>?
				</h2>
				<p class="text-lead text-white/70">Get in touch.</p>
			</div>

			<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
				<Button href="/contact" variant="accent" shape="pill" size="lg" chip>Contact Us</Button>

				<a
					href="/gallery"
					class="group/explore inline-flex items-center gap-1 rounded-lg px-2 py-2 text-base font-medium text-white/75 transition-colors duration-160 ease-out hover:text-white">
					Explore
					<span
						class="flex items-center justify-center transition-transform duration-200 ease-out group-hover/explore:translate-x-1">
						<ArrowIcon class="size-5 -rotate-90" strokeWidth="2" />
					</span>
				</a>
			</div>
		</div>
	</div>
</section>
