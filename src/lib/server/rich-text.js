import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { marked } from 'marked';

/**
 * Renders a Contentful rich-text document to HTML.
 *
 * Two passes, because that is genuinely what the content needs: the entries
 * are stored as rich-text documents whose text nodes contain Markdown, so the
 * rich-text renderer resolves the document structure and Markdown resolves
 * what is inside it. HTML already produced by the first pass passes through
 * the second untouched.
 *
 * This now runs on the server. Previously both passes ran in onMount, so the
 * server rendered raw Markdown into the page — crawlers indexed the unparsed
 * source and readers saw it flash before hydration replaced it.
 *
 * The HTML is trusted: it comes from the client's own Contentful space, not
 * from request input.
 */
export function renderRichText(document) {
	if (!document) return '';

	const html = documentToHtmlString(document);
	return marked.parse(html, { async: false });
}
