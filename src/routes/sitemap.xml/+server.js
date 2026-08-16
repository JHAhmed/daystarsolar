import { listForSitemap } from '$server/contentful.js';
import { SITE } from '$data/site.js';

/**
 * sitemap.xml
 *
 * Same URL set and priorities as before. The unused namespace declarations
 * (news, video, mobile, xhtml) are dropped — none of the entries used them —
 * and every value is escaped, since slugs come from the CMS.
 */

const STATIC_PAGES = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/services', priority: '0.9', changefreq: 'monthly' },
	{ path: '/products', priority: '0.9', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/calculator', priority: '0.8', changefreq: 'monthly' },
	{ path: '/about', priority: '0.7', changefreq: 'monthly' },
	{ path: '/projects', priority: '0.7', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.7', changefreq: 'weekly' },
	{ path: '/gallery', priority: '0.6', changefreq: 'monthly' },
	{ path: '/ar', priority: '0.5', changefreq: 'monthly' }
];

function escapeXml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
	return `<url><loc>${escapeXml(loc)}</loc><lastmod>${escapeXml(lastmod)}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export async function GET() {
	const [projects, posts] = await Promise.all([
		listForSitemap('project'),
		listForSitemap('blogPost')
	]);

	const today = new Date().toISOString().split('T')[0];
	const dated = (value) => (value ? String(value).split('T')[0] : today);

	const entries = [
		...STATIC_PAGES.map((page) => ({
			loc: page.path === '/' ? SITE.url : `${SITE.url}${page.path}`,
			lastmod: today,
			changefreq: page.changefreq,
			priority: page.priority
		})),
		...projects
			.filter((project) => project.slug)
			.map((project) => ({
				loc: `${SITE.url}/projects/${project.slug}`,
				lastmod: dated(project.updatedAt),
				changefreq: 'monthly',
				priority: '0.7'
			})),
		...posts
			.filter((post) => post.slug)
			.map((post) => ({
				loc: `${SITE.url}/blog/${post.slug}`,
				lastmod: dated(post.updatedAt),
				changefreq: 'monthly',
				priority: '0.6'
			}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(urlEntry).join('')}</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
