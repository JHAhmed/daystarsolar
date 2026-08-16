import { getEntryBySlug } from '$server/contentful.js';
import { renderRichText } from '$server/rich-text.js';

export async function load({ params }) {
	const entry = await getEntryBySlug('blogPost', params.slug);

	return {
		post: {
			...entry,
			body: renderRichText(entry.content),
			content: undefined
		}
	};
}
