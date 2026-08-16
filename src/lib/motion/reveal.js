import { browser, dev } from '$app/environment';
import { useGsap, prefersReducedMotion } from './gsap.js';
import { DURATION, EASE, TRAVEL, STAGGER, TRIGGER_START } from './tokens.js';

/**
 * Entrance animations.
 *
 * Replaces the old `use:animateIn` action, which created a fresh Motion One
 * `inView` observer per element, never cleaned any of them up, and left
 * `opacity-0` in the markup so anything it failed to reach stayed invisible.
 *
 * Usage — the `data-reveal` attribute is required. It is what hides the
 * element before the animation runs, and it is written in the markup rather
 * than applied by this function so there is no flash of visible content:
 *
 *   <div data-reveal {@attach reveal()}>…</div>
 *   <div data-reveal {@attach reveal({ variant: 'blur', delay: 0.15 })}>…</div>
 *
 * For a run of siblings, mark the container and let it stagger its children:
 *
 *   <ul {@attach revealGroup()}>
 *     <li data-reveal>…</li>
 *   </ul>
 */

const VARIANTS = {
	fade: { opacity: 0 },
	up: { opacity: 0, y: TRAVEL.base },
	'up-lg': { opacity: 0, y: TRAVEL.lg },
	down: { opacity: 0, y: -TRAVEL.base },
	left: { opacity: 0, x: TRAVEL.base },
	right: { opacity: 0, x: -TRAVEL.base },
	blur: { opacity: 0, y: TRAVEL.sm, filter: 'blur(8px)' },
	scale: { opacity: 0, scale: 0.96 }
};

const TO_VARS = {
	opacity: 1,
	x: 0,
	y: 0,
	scale: 1,
	rotate: 0,
	filter: 'blur(0px)'
};

function resolveOptions(options) {
	return {
		variant: 'up',
		delay: 0,
		duration: DURATION.reveal,
		ease: EASE.reveal,
		start: TRIGGER_START,
		/** 'scroll' waits until the element enters the viewport; 'load' runs immediately. */
		trigger: 'scroll',
		...options
	};
}

function fromVars(options) {
	const base = VARIANTS[options.variant] ?? VARIANTS.up;
	const vars = { ...base };

	// Explicit overrides win over the variant, so a one-off tweak never needs
	// a new variant.
	for (const key of ['x', 'y', 'scale', 'rotate']) {
		if (options[key] !== undefined) vars[key] = options[key];
	}
	if (options.blur !== undefined) vars.filter = `blur(${options.blur}px)`;

	return vars;
}

function warnMissingMarker(element) {
	if (dev && !element.hasAttribute('data-reveal')) {
		console.warn(
			'[motion] reveal() was attached to an element without a `data-reveal` attribute. ' +
				'It will animate, but it is visible beforehand and will appear to jump.',
			element
		);
	}
}

/**
 * Reveals a single element.
 * @param {object} [options]
 * @returns {(element: Element) => (() => void) | void}
 */
export function reveal(options = {}) {
	return (element) => {
		if (!browser) return;

		const { gsap } = useGsap();

		if (prefersReducedMotion()) {
			gsap.set(element, { opacity: 1, clearProps: 'transform,filter' });
			return;
		}

		warnMissingMarker(element);
		const o = resolveOptions(options);

		const ctx = gsap.context(() => {
			gsap.fromTo(element, fromVars(o), {
				...TO_VARS,
				duration: o.duration,
				delay: o.delay,
				ease: o.ease,
				clearProps: 'filter,willChange',
				...(o.trigger === 'scroll'
					? { scrollTrigger: { trigger: element, start: o.start, once: true } }
					: {})
			});
		});

		return () => ctx.revert();
	};
}

/**
 * Reveals a container's children in sequence off a single trigger, so a grid
 * cascades instead of every card firing its own observer.
 * @param {object} [options]
 * @returns {(element: Element) => (() => void) | void}
 */
export function revealGroup(options = {}) {
	return (element) => {
		if (!browser) return;

		const { gsap } = useGsap();
		const selector = options.selector ?? ':scope > [data-reveal]';
		const targets = element.querySelectorAll(selector);
		if (!targets.length) return;

		if (prefersReducedMotion()) {
			gsap.set(targets, { opacity: 1, clearProps: 'transform,filter' });
			return;
		}

		const o = resolveOptions(options);
		const stagger = options.stagger ?? STAGGER.base;

		const ctx = gsap.context(() => {
			gsap.fromTo(targets, fromVars(o), {
				...TO_VARS,
				duration: o.duration,
				delay: o.delay,
				ease: o.ease,
				stagger,
				clearProps: 'filter,willChange',
				...(o.trigger === 'scroll'
					? { scrollTrigger: { trigger: element, start: o.start, once: true } }
					: {})
			});
		}, element);

		return () => ctx.revert();
	};
}
