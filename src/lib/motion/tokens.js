/**
 * Motion tokens, mirrored from the CSS custom properties in app.css.
 *
 * CSS transitions and GSAP timelines both read from this vocabulary so a
 * "slow" fade means the same thing whether it was written in a class or in a
 * timeline. The old site had durations of 0.1s, 0.5s, 0.2s, 100ms, 200ms and
 * 700ms scattered across components with no relationship to each other.
 */

/** Seconds — GSAP works in seconds, CSS in milliseconds. */
export const DURATION = {
	instant: 0.1,
	fast: 0.18,
	base: 0.28,
	slow: 0.48,
	reveal: 0.8
};

/**
 * GSAP easing names chosen to sit as close as possible to the cubic-beziers
 * defined in app.css, so JS-driven and CSS-driven motion feel identical.
 */
export const EASE = {
	/** General purpose exit-fast, settle-slow. Matches --ease-out-quart. */
	out: 'power3.out',
	/** Long entrances. Matches --ease-out-expo. */
	reveal: 'expo.out',
	/** Symmetrical movement, e.g. carousel slides. Matches --ease-in-out-quart. */
	inOut: 'power3.inOut',
	/** Slight overshoot for playful chips and counters. Matches --ease-out-back. */
	back: 'back.out(1.6)'
};

/** Distance a revealing element travels, in pixels. */
export const TRAVEL = {
	sm: 12,
	base: 20,
	lg: 36
};

/** Gap between staggered siblings, in seconds. */
export const STAGGER = {
	tight: 0.05,
	base: 0.08,
	loose: 0.14
};

/** Where in the viewport a reveal fires, as a ScrollTrigger `start` string. */
export const TRIGGER_START = 'top 85%';
