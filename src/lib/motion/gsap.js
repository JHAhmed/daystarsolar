import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Registers GSAP plugins exactly once. Every module that needs GSAP goes
 * through here rather than calling registerPlugin itself, which is how the old
 * site ended up with Motion One, tailwindcss-motion and Svelte transitions all
 * animating the same pages.
 */
export function useGsap() {
	if (browser && !registered) {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}
	return { gsap, ScrollTrigger };
}

/** True when the visitor has asked their OS to reduce motion. */
export function prefersReducedMotion() {
	return browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger };
