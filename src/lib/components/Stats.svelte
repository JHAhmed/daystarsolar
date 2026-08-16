<script>
	import { STATS } from '$data/site.js';
	import { useGsap, prefersReducedMotion, EASE, TRAVEL, STAGGER } from '$motion';

	/**
	 * The three headline figures, shown on the homepage and the about page.
	 *
	 * The numbers count up once as they scroll into view. This is a first-visit
	 * moment rather than a repeated interaction, so it can afford a little
	 * delight — and the count is bundled into the same timeline as the fade so
	 * the two can never drift out of sync.
	 */
	let { variant = 'row' } = $props();

	/** '13k' → { value: 13, suffix: 'k' } */
	function parseFigure(figure) {
		const match = /^(\d+)(.*)$/.exec(figure);
		return match ? { value: Number(match[1]), suffix: match[2] } : { value: 0, suffix: figure };
	}

	function countUp(figure, index) {
		const { value, suffix } = parseFigure(figure);

		return (element) => {
			if (prefersReducedMotion()) {
				element.textContent = figure;
				return;
			}

			const { gsap } = useGsap();
			const counter = { current: 0 };
			element.textContent = `0${suffix}`;

			// The element hidden by CSS is the [data-reveal] wrapper, not this
			// span — fading anything else leaves the wrapper at opacity 0 forever.
			const container = element.closest('[data-reveal]') ?? element;

			const ctx = gsap.context(() => {
				gsap
					.timeline({
						scrollTrigger: { trigger: container, start: 'top 90%', once: true },
						delay: index * STAGGER.loose
					})
					.fromTo(
						container,
						{ opacity: 0, y: TRAVEL.sm },
						{ opacity: 1, y: 0, duration: 0.6, ease: EASE.reveal }
					)
					.to(
						counter,
						{
							current: value,
							duration: 1.3,
							ease: 'power2.out',
							onUpdate: () => {
								element.textContent = `${Math.round(counter.current)}${suffix}`;
							}
						},
						0
					);
			});

			return () => ctx.revert();
		};
	}
</script>

<div
	class={variant === 'row'
		? 'grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8'
		: 'grid grid-cols-1 gap-10 md:grid-cols-3 md:divide-x md:divide-ink-200'}
>
	{#each STATS as stat, i (stat.label)}
		<div
			data-reveal
			class={variant === 'row'
				? 'flex flex-col items-center gap-2 text-center'
				: 'flex items-center justify-center gap-4 px-4 text-center'}
		>
			<p class="font-display text-display text-night-900 tabular-nums lg:text-display-lg">
				<span {@attach countUp(stat.number, i)}>{stat.number}</span><span
					class="font-normal text-solar-300">+</span
				>
			</p>
			<p
				class={variant === 'row'
					? 'text-sm text-ink-500'
					: 'max-w-28 text-left text-base font-light text-ink-600'}
			>
				{stat.label}
			</p>
		</div>
	{/each}
</div>
