/**
 * Single source of truth for company details, navigation and contact points.
 *
 * All of this was previously duplicated across the footer, contact page,
 * report pages and three separate JSON-LD blocks — which is how the site ended
 * up advertising a phone number in the footer that the schema didn't list.
 */

export const SITE = {
	url: 'https://daystarsolar.co.in',
	name: 'Daystar Solar',
	legalName: 'Daystar Solar',
	tagline: 'The sun sends the bill, we make it free.',
	founded: '2012',
	defaultOgImage: '/oghome.png'
};

export const ADDRESS = {
	street: 'H-5, Second floor, Third avenue, Anna nagar east',
	locality: 'Chennai',
	region: 'Tamil Nadu',
	postalCode: '600102',
	country: 'IN',
	/** As printed on the PDF report and the contact page card. */
	full: 'H-5, Second Floor, Third Avenue, Anna Nagar East, Chennai - 600102, Tamil Nadu',
	mapsUrl: 'https://maps.app.goo.gl/uNk4gDxCLP1v62Aa8'
};

export const HOURS = {
	days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	opens: '09:30',
	closes: '18:30'
};

export const CONTACT = {
	primaryPhone: '+91 91766 68617',
	landline: { label: '044 4353 1021', href: 'tel:04443531021' },
	/** Mobile extensions shown as separate tiles on the contact page. */
	mobileSuffixes: ['17', '32'],
	mobilePrefix: '+91 91766 686',
	whatsapp:
		'https://api.whatsapp.com/send?phone=919176668664&text=Hi!%20I%20would%20like%20to%20know%20more%20about%20Daystar%20Solar!',
	/** Printed in the PDF report footer. */
	reportPhones: '+91 91766 68617/30/34/50/51/57/64',
	emails: {
		sales: 'products@daystarsolar.co.in',
		service: 'info@daystarsolar.co.in',
		procurement: 'procurement@daystarsolar.co.in',
		admin: 'coo@daystarsolar.co.in'
	}
};

export const SOCIALS = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/daystarsolar_official/',
		brandClass: 'bg-[#FF0069]'
	},
	{
		name: 'LinkedIn',
		href: 'https://in.linkedin.com/company/daystar-solar',
		brandClass: 'bg-[#0A66C2]'
	},
	{
		name: 'YouTube',
		href: 'https://www.youtube.com/@DaystarSolarOfficial/',
		brandClass: 'bg-[#FF0000]'
	},
	{
		name: 'Facebook',
		href: 'https://www.facebook.com/daystarsolarindia/',
		brandClass: 'bg-[#0866FF]'
	},
	{ name: 'X (Twitter)', href: 'https://x.com/DaystarSolar/', brandClass: 'bg-[#000000]' },
	{
		name: 'Pintrest',
		href: 'https://www.pinterest.com/fawaz05583438/',
		brandClass: 'bg-[#E60023]'
	}
];

export const MARKETPLACES = {
	amazon: 'https://www.amazon.in/stores/DaystarSolar/page/EEE44EC4-A6FA-4DDA-B319-B5711BA870CD/',
	indiamart: 'https://www.indiamart.com/daystarsolar/'
};

/** Primary navigation, in order. `/contact` is rendered separately as the CTA. */
export const NAV_LINKS = [
	{ name: 'Home', href: '/' },
	{ name: 'About Us', href: '/about' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Products', href: '/products' },
	{ name: 'Services', href: '/services' },
	{ name: 'Gallery', href: '/gallery' },
	{ name: 'Blog', href: '/blog' }
];

export const FOOTER_LINKS = [
	{
		heading: 'Learn More',
		links: [
			{ name: 'Products', href: '/products' },
			{ name: 'Services', href: '/services' },
			{ name: 'Gallery', href: '/gallery' }
		]
	},
	{
		heading: 'About Us',
		headingHref: '/about',
		links: [
			{ name: 'Contact', href: '/contact' },
			{ name: 'Blog', href: '/blog' },
			{ name: 'FAQ', href: '/faq' }
		]
	}
];

/** Shown on the homepage and the about page. */
export const STATS = [
	{ number: '1000', label: 'Customers Served' },
	{ number: '13k', label: 'Megawatt Hours Generated' },
	{ number: '14', label: 'Years Experience' }
];

export const AGGREGATE_RATING = { value: '4.9', count: '120' };
