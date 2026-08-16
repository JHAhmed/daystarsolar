import { getEntryBySlug } from '$server/contentful.js';
import { renderRichText } from '$server/rich-text.js';

export async function load({ params }) {
	// The old loader took the last path segment, which allowed a nested URL to
	// resolve to a valid page and produced duplicate URLs for one entry.
	const entry = await getEntryBySlug('project', params.slug);

	return {
		post: {
			...entry,
			body: renderRichText(entry.content),
			content: undefined
		}
	};
}
