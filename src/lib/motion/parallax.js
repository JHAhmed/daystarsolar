import { browser } from '$app/environment';
import { useGsap, prefersReducedMotion } from './gsap.js';

/**
 * Scroll-linked parallax for background imagery.
 *
 * The element must be oversized relative to its clipping parent (roughly
 * `scale-110`), otherwise the travel exposes an edge. `scrub` ties progress to
 * scroll position rather than playing on a timer, so it tracks the page
 * instead of running away from it.
 *
 *   <div class="overflow-hidden" data-parallax-root>
 *     <img class="scale-110" {@attach parallax()} />
 *   </div>
 *
 * Mark the scrolling container with `data-parallax-root`. It matters most for
 * <enhanced:img>, which wraps its <img> in a <picture> — that wrapper measures
 * 0×0 once the image inside is absolutely positioned, so falling back to the
 * direct parent would hand ScrollTrigger a zero-height trigger and the effect
 * would fire at meaningless scroll positions.
 *
 * @param {{ amount?: number, scrub?: number }} [options] `amount` is total
 *   travel as a percentage of the element's own height.
 * @returns {(element: Element) => (() => void) | void}
 */
export function parallax({ amount = 12, scrub = 0.5 } = {}) {
	return (element) => {
		if (!browser || prefersReducedMotion()) return;

		const { gsap } = useGsap();
		const container = element.closest('[data-parallax-root]') ?? element.parentElement ?? element;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				element,
				{ yPercent: -amount / 2 },
				{
					yPercent: amount / 2,
					ease: 'none',
					scrollTrigger: {
						trigger: container,
						start: 'top bottom',
						end: 'bottom top',
						scrub
					}
				}
			);
		});

		return () => ctx.revert();
	};
}
