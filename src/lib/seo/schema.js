import { SITE, ADDRESS, HOURS, CONTACT, AGGREGATE_RATING } from '$data/site.js';
import { REVIEWS } from '$data/reviews.js';

/**
 * JSON-LD builders.
 *
 * Every schema block the previous site emitted is reproduced here byte-for-byte
 * in output; the difference is that they are now generated from the same
 * company data as the rest of the site instead of being hand-typed into each
 * page's <svelte:head>.
 */

/** Absolute URL for a site-relative path. */
export function absolute(path = '/') {
	return new URL(path, SITE.url).href;
}

/**
 * Appends the site suffix to a CMS-supplied title, unless the title already
 * carries it. Several Contentful entries were authored with "| Daystar Solar"
 * baked into the title field, and the old template appended it unconditionally
 * — those pages shipped titles ending "| Daystar Solar | Daystar Solar".
 */
export function pageTitle(title, suffix = SITE.name) {
	const trimmed = String(title ?? '').trim();
	if (!trimmed) return suffix;

	const alreadySuffixed = trimmed.toLowerCase().endsWith(`| ${suffix}`.toLowerCase());
	return alreadySuffixed ? trimmed : `${trimmed} | ${suffix}`;
}

/**
 * Serialises a schema object for safe embedding in a <script> tag. Escaping
 * `<` means no value in the data can ever close the tag early.
 */
export function serializeJsonLd(data) {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** The homepage LocalBusiness block, including all eight reviews. */
export function localBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: SITE.name,
		description: 'Solar power plant integrator in Chennai',
		image: absolute('/oghome.png'),
		url: absolute('/'),
		priceRange: '₹₹',
		address: {
			'@type': 'PostalAddress',
			streetAddress: ADDRESS.street,
			addressLocality: ADDRESS.locality,
			postalCode: ADDRESS.postalCode,
			addressCountry: ADDRESS.country
		},
		telephone: CONTACT.primaryPhone,
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: HOURS.days,
			opens: HOURS.opens,
			closes: HOURS.closes
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: AGGREGATE_RATING.value,
			reviewCount: AGGREGATE_RATING.count
		},
		review: REVIEWS.map((review) => ({
			'@type': 'Review',
			author: { '@type': 'Person', name: review.name },
			reviewBody: review.schemaText ?? review.text,
			reviewRating: {
				'@type': 'Rating',
				ratingValue: String(review.rating),
				bestRating: '5'
			},
			url: review.link
		}))
	};
}

/**
 * Generic page-level schema.
 * @param {string} type e.g. 'WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'Blog'
 */
export function pageSchema(type, { path, name, description }) {
	return {
		'@context': 'https://schema.org',
		'@type': type,
		url: absolute(path),
		name,
		description
	};
}

/** The solar calculator, described as a web application. */
export function webApplicationSchema({ path, name, description, category }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		url: absolute(path),
		name,
		applicationCategory: category,
		description
	};
}

/** An individual project or blog entry. */
export function entrySchema(type, { path, name, description }) {
	return {
		'@context': 'https://schema.org',
		'@type': type,
		url: absolute(path),
		name,
		description
	};
}

/**
 * FAQPage schema. The homepage and /faq both render question/answer pairs as
 * visible content but never marked them up, which is the one obvious SEO win
 * available here — the content already exists and already qualifies.
 */
export function faqSchema(items) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: { '@type': 'Answer', text: item.answer }
		}))
	};
}
