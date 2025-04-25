import { animate, inView, stagger, scroll } from 'motion';

export { default as logo } from './assets/logo.png';
export { default as quotationMark } from './icons/quote.svg';
export { default as logoSmall } from './assets/logo-small.png';

export { default as twitterLogo } from './assets/x.svg';
export { default as facebookLogo } from './assets/facebook.svg';
export { default as linkedinLogo } from './assets/linkedin.svg';

export { default as sampleImage1 } from './assets/images/sample-1.webp';
export { default as sampleImage2 } from './assets/images/sample-2.webp';
export { default as sampleImage3 } from './assets/images/sample-3.webp';

export { default as landingImage1 } from './assets/images/landingImage1.jpg';
export { default as landingImage2 } from './assets/images/landingImage2.jpg';
export { default as landingImage3 } from './assets/images/landingImage3.jpg';
export { default as landingImage4 } from './assets/images/landingImage4.jpg';
export { default as landingImage5 } from './assets/images/landingImage5.jpg';

export { default as aboutImage1 } from './assets/images/about-1.png';
export { default as aboutImage2 } from './assets/images/about-2.png';
export { default as aboutImage3 } from './assets/images/about-3.png';

export { default as servicesImage1 } from './assets/images/servicesImage1.jpg';
export { default as servicesImage2 } from './assets/images/servicesImage2.jpg';
export { default as servicesImage3 } from './assets/images/servicesImage3.jpg';

export { default as solarImage1 } from './assets/images/others.jpg';
export { default as solarImage2 } from './assets/images/solar-panels.jpg';
// export { default as solarImage3 } from './assets/images/street-lights.jpg';
export { default as solarImage3 } from './assets/images/bos.jpg';
export { default as solarImage4 } from './assets/images/distribution-boxes.jpg';

export { default as bgImage } from './assets/images/hero-background.jpg';
// export { default as metaHome } from './assets/meta-home.jpg';

export { default as CTABG } from './assets/images/cta-bg.jpg';

export function animateIn(element, args = {}) {
	const defaults = {
		duration: 0.5,
		delay: 0.5,
		scale: 1,
		x: 0,
		y: 0,
		blur: 0,
		rotate: 0,
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
						rotate: [finalArgs.rotate, 0],
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

