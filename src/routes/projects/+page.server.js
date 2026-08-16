import { listEntries } from '$server/contentful.js';

/**
 * Loads on the server rather than fetching an internal API route from a
 * universal load, which is what the previous version did — that made the
 * server call itself over HTTP for data it already had in process, and shipped
 * the Contentful mapping to the browser.
 */
export async function load() {
	return { projects: await listEntries('project') };
}
