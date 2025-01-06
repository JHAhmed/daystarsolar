import { animate, inView, stagger, scroll } from 'motion';

export { default as logo } from './assets/logo.png';
export { default as logoSmall } from './assets/logo-small.png';

export { default as twitterLogo } from './assets/x.svg';
export { default as facebookLogo } from './assets/facebook.svg';
export { default as linkedinLogo } from './assets/linkedin.svg';

export { default as sampleImage1 } from './assets/sample-1.jpeg';
export { default as sampleImage2 } from './assets/sample-2.jpeg';
export { default as sampleImage3 } from './assets/sample-3.jpeg';

export { default as solarImage1 } from './assets/others.jpg';
export { default as solarImage2 } from './assets/solar-panels.jpg';
export { default as solarImage3 } from './assets/street-lights.jpg';
export { default as solarImage4 } from './assets/distribution-boxes.jpg';

export { default as CTABG } from './assets/cta-bg.jpg';

export function animateIn(element, args = {}) {
	const defaults = {
		duration: 0.5,
		delay: 0.5,
		scale: 1,
		x: 0,
		y: 0,
		blur: 0,
		amount: 0.5,
		inView: true
	};

	const finalArgs = { ...defaults, ...args };

	if (finalArgs.inView) {
		inView(
			element,
			() => {
				const animation = animate(
					element,
					{
						opacity: 1,
						scale: [finalArgs.scale, 1],
						x: [finalArgs.x, 0],
						y: [finalArgs.y, 0],
						filter: [`blur(${finalArgs.blur}px)`, 'blur(0px)']
					},
					{
						duration: finalArgs.duration,
						delay: finalArgs.delay
					}
				);
			},
			{ amount: finalArgs.amount }
		);
	} else {
		animate(
			element,
			{
				opacity: 1,
				scale: [finalArgs.scale, 1],
				x: [finalArgs.x, 0],
				y: [finalArgs.y, 0],
				filter: [`blur(${finalArgs.blur}px)`, 'blur(0px)']
			},
			{
				duration: finalArgs.duration,
				delay: finalArgs.delay
			}
		);
	}
}
