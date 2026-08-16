import { browser } from '$app/environment';
import Lenis from 'lenis';
import { useGsap, prefersReducedMotion } from './gsap.js';

/**
 * Lenis smooth scrolling, driven off GSAP's ticker so that ScrollTrigger and
 * the scroll position never disagree. Running two independent RAF loops is the
 * usual cause of scroll-linked animations lagging a frame behind the page.
 *
 * Disabled entirely under prefers-reduced-motion — smooth scroll is exactly
 * the kind of motion that setting exists to switch off.
 */

/** @type {Lenis | null} */
let instance = null;

export function initSmoothScroll() {
	if (!browser || prefersReducedMotion()) return () => {};

	const { gsap, ScrollTrigger } = useGsap();

	instance = new Lenis({
		duration: 1.05,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		// Native scrolling on touch is better than anything we can emulate.
		syncTouch: false
	});

	const onScroll = () => ScrollTrigger.update();
	instance.on('scroll', onScroll);

	const tick = (time) => instance?.raf(time * 1000);
	gsap.ticker.add(tick);
	// Lenis manages its own delta; GSAP's lag smoothing would fight it.
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(tick);
		gsap.ticker.lagSmoothing(500, 33);
		instance?.off('scroll', onScroll);
		instance?.destroy();
		instance = null;
	};
}

/** The live Lenis instance, or null when smooth scrolling is off. */
export function getLenis() {
	return instance;
}

/**
 * Scrolls to an element or offset. Falls back to native scrolling when Lenis
 * is disabled, so callers never need to branch.
 * @param {Element | string | number} target
 * @param {{ offset?: number, immediate?: boolean }} [options]
 */
export function scrollTo(target, options = {}) {
	if (!browser) return;

	if (instance) {
		instance.scrollTo(target, { offset: options.offset ?? 0, immediate: options.immediate });
		return;
	}

	const node =
		typeof target === 'string'
			? document.querySelector(target)
			: target instanceof Element
				? target
				: null;

	if (node) {
		node.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth', block: 'start' });
	} else if (typeof target === 'number') {
		window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
	}
}

/** Resets scroll position on navigation without animating between pages. */
export function resetScroll() {
	if (instance) {
		instance.scrollTo(0, { immediate: true });
	} else if (browser) {
		window.scrollTo(0, 0);
	}
}
