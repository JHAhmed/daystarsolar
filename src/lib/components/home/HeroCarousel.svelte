<script>
	import { ArrowIcon } from '$icons';
	import { prefersReducedMotion } from '$motion';

	/**
	 * The hero's right column: a rotating view of finished projects, each one
	 * linking through to its case study.
	 *
	 * Crossfades are CSS transitions rather than GSAP. They can be interrupted
	 * and retargeted mid-flight when someone clicks through slides quickly,
	 * where a keyframe or a fresh tween would restart from zero. GSAP is kept
	 * for scroll-linked work, where it earns its place.
	 */

	const SLIDE_DURATION = 5200;

	const modules = import.meta.glob('/src/lib/images/hero-images/*.webp', {
		eager: true,
		query: { enhanced: true }
	});

	const slides = Object.entries(modules)
		.map(([path, module]) => {
			const slug = path.split('/').pop().replace('.webp', '');
			return {
				slug,
				src: module.default,
				title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
				href: `/projects/${slug}`
			};
		})
		.sort((a, b) => a.slug.localeCompare(b.slug));

	let index = $state(0);
	let paused = $state(false);

	const current = $derived(slides[index]);

	function go(next) {
		index = (next + slides.length) % slides.length;
	}

	// Auto-advance. Restarts whenever the index changes so a manual jump gives
	// the new slide a full turn rather than whatever was left of the old one.
	$effect(() => {
		index;
		if (paused || prefersReducedMotion()) return;

		const timer = setTimeout(() => go(index + 1), SLIDE_DURATION);
		return () => clearTimeout(timer);
	});
</script>

<div
	class="group/carousel relative"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
	role="region"
	aria-roledescription="carousel"
	aria-label="Recent projects"
>
	<div class="relative aspect-4/3 overflow-hidden rounded-panel bg-ink-100 sm:aspect-3/2">
		{#each slides as slide, i (slide.slug)}
			<div
				class="slide absolute inset-0"
				class:is-active={i === index}
				aria-hidden={i !== index}
				inert={i !== index || undefined}
			>
				<a href={slide.href} class="block h-full w-full" tabindex={i === index ? 0 : -1}>
					<enhanced:img
						src={slide.src}
						alt="Daystar Solar project at {slide.title}"
						class="h-full w-full object-cover"
						loading={i === 0 ? 'eager' : 'lazy'}
						fetchpriority={i === 0 ? 'high' : undefined}
					/>
					<div
						class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night-950/75 to-transparent"
					></div>

					<div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
						<div>
							<p class="text-eyebrow text-white/60 uppercase">Project</p>
							<p class="mt-1.5 font-display text-heading-sm text-white sm:text-heading">
								{slide.title}
							</p>
						</div>
						<span
							class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-[background-color,transform] duration-[200ms] ease-out group-hover/carousel:bg-solar-400 group-hover/carousel:text-night-900 sm:size-10"
						>
							<ArrowIcon class="size-4 -rotate-[135deg]" strokeWidth="2" />
						</span>
					</div>
				</a>
			</div>
		{/each}
	</div>

	<!-- Controls sit below the frame so they never cover the photograph. -->
	<div class="mt-4 flex items-center gap-4">
		<div class="flex gap-1.5">
			<button
				type="button"
				onclick={() => go(index - 1)}
				aria-label="Previous project"
				class="flex size-8 items-center justify-center rounded-full bg-ink-100 text-night-900 transition-[background-color,transform] duration-[160ms] ease-out hover:bg-ink-200 active:scale-[0.94]"
			>
				<ArrowIcon class="size-3.5 rotate-90" strokeWidth="2" />
			</button>
			<button
				type="button"
				onclick={() => go(index + 1)}
				aria-label="Next project"
				class="flex size-8 items-center justify-center rounded-full bg-ink-100 text-night-900 transition-[background-color,transform] duration-[160ms] ease-out hover:bg-ink-200 active:scale-[0.94]"
			>
				<ArrowIcon class="size-3.5 -rotate-90" strokeWidth="2" />
			</button>
		</div>

		<div class="flex flex-1 gap-1" role="tablist" aria-label="Choose project">
			{#each slides as slide, i (slide.slug)}
				<button
					type="button"
					role="tab"
					aria-selected={i === index}
					aria-label={slide.title}
					onclick={() => go(i)}
					class="group/tick relative h-4 min-w-0 flex-1"
				>
					<span
						class="absolute inset-x-0 top-1.5 block h-0.5 overflow-hidden rounded-full bg-ink-200 transition-colors duration-[160ms] group-hover/tick:bg-ink-300"
					>
						<span
							class="block h-full w-full origin-left rounded-full bg-night-900 transition-transform duration-[400ms] ease-out"
							style:transform="scaleX({i === index ? 1 : 0})"
						></span>
					</span>
				</button>
			{/each}
		</div>

		<p class="shrink-0 text-xs text-ink-400 tabular-nums">
			{String(index + 1).padStart(2, '0')}<span class="text-ink-300">/{slides.length}</span>
		</p>
	</div>

	<span class="sr-only" aria-live="polite">{current.title}</span>
</div>

<style>
	.slide {
		opacity: 0;
		visibility: hidden;
		transform: scale(1.03);
		transition:
			opacity var(--duration-slow) var(--ease-out-quart),
			transform 6s linear,
			visibility 0s linear var(--duration-slow);
	}

	.slide.is-active {
		opacity: 1;
		visibility: visible;
		transform: scale(1);
		transition:
			opacity var(--duration-slow) var(--ease-out-quart),
			transform 6s linear,
			visibility 0s;
	}

	@media (prefers-reduced-motion: reduce) {
		.slide,
		.slide.is-active {
			transform: none;
			transition:
				opacity var(--duration-fast) ease,
				visibility 0s;
		}
	}
</style>
