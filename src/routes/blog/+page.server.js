import { listEntries } from '$server/contentful.js';

export async function load() {
	return { posts: await listEntries('blogPost') };
}
