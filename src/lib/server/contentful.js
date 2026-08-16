import * as contentful from 'contentful';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

/**
 * Contentful access.
 *
 * Previously this lived in three places — a per-request client inside
 * /api/get-entries, another in projects/[slug]/+page.server.js, and a third in
 * lib/server/contentful.js for the sitemap — each mapping fields slightly
 * differently. One client, one mapping, used by every caller.
 */

const FALLBACK_IMAGE = '/fallback-image.jpg';

let client;

function getClient() {
	client ??= contentful.createClient({
		space: env.CONTENTFUL_SPACE_ID,
		accessToken: env.CONTENTFUL_ACCESS_TOKEN
	});
	return client;
}

function imageUrl(image) {
	const url = image?.fields?.file?.url;
	return url ? `https:${url}` : '';
}

/** Shape used by the projects and blog index pages. */
function toSummary(item) {
	return {
		id: item.sys.id,
		title: item.fields.title ?? '',
		summary: item.fields.summary ?? '',
		publishDate: item.fields.publishDate ?? '',
		slug: item.fields.slug ?? '',
		image: imageUrl(item.fields.image) || FALLBACK_IMAGE,
		updatedAt: item.sys.updatedAt ?? item.fields.publishDate ?? ''
	};
}

/**
 * All entries of a content type, newest first.
 * Returns an empty array rather than throwing — an index page with no cards
 * beats a 500, and the previous version's approach of returning a fake entry
 * titled "Error fetching blog posts" put an error message in the card grid.
 *
 * @param {'project' | 'blogPost'} contentType
 */
export async function listEntries(contentType) {
	try {
		const response = await getClient().getEntries({
			content_type: contentType,
			order: ['-fields.publishDate']
		});
		return response.items.map(toSummary);
	} catch (err) {
		console.error(`Contentful: failed to list "${contentType}"`, err);
		return [];
	}
}

/**
 * A single entry by slug, including its rich-text body.
 * Throws a 404 when nothing matches so SvelteKit renders the error page.
 *
 * @param {'project' | 'blogPost'} contentType
 * @param {string} slug
 */
export async function getEntryBySlug(contentType, slug) {
	let response;

	try {
		response = await getClient().getEntries({
			content_type: contentType,
			'fields.slug': slug,
			limit: 1
		});
	} catch (err) {
		console.error(`Contentful: failed to fetch "${contentType}/${slug}"`, err);
		error(500, 'Failed to load content');
	}

	const item = response.items?.[0];
	if (!item) error(404, 'Not Found');

	return {
		...toSummary(item),
		content: item.fields.content ?? null,
		location: item.fields.location ?? '',
		projectType: item.fields.projectType ?? ''
	};
}

/** Slugs and modification dates, for sitemap.xml. */
export async function listForSitemap(contentType) {
	const entries = await listEntries(contentType);
	return entries.map(({ slug, updatedAt }) => ({ slug, updatedAt }));
}
