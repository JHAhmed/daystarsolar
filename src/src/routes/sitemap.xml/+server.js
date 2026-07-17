import { fetchContentfulData } from '$lib/server/contentful';

export async function GET({ url }) {
    // 1. Fetch all dynamic data in parallel
    // CHECK: Ensure these strings match your actual Contentful Content Model IDs
    const [projects, posts] = await Promise.all([
        fetchContentfulData('project'), 
        // fetchContentfulData('product'), // Replace with your Product Model ID
        fetchContentfulData('blogPost') // Replace with your Blog/Post Model ID
    ]);

    const siteUrl = 'https://daystarsolar.co.in';
    const today = new Date().toISOString().split('T')[0];

    // 2. Define Static Pages
    const staticPages = [
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

    // 3. Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += `<urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >`;

    // Add Static Pages
    staticPages.forEach((page) => {
        const location = page.path === '/' ? siteUrl : `${siteUrl}${page.path}`;
        xml += `
        <url>
            <loc>${location}</loc>
            <lastmod>${today}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
        </url>`;
    });

    // Add Dynamic Projects
    projects.forEach(proj => {
        xml += `
        <url>
            <loc>${siteUrl}/projects/${proj.slug}</loc>
            <lastmod>${proj.updatedAt.split('T')[0]}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
        </url>`;
    });

    // Add Dynamic Products
    // products.forEach(prod => {
    //     xml += `
    //     <url>
    //         <loc>${siteUrl}/products/${prod.slug}</loc>
    //         <lastmod>${prod.updatedAt.split('T')[0]}</lastmod>
    //         <changefreq>monthly</changefreq>
    //         <priority>0.9</priority>
    //     </url>`;
    // });

    // Add Dynamic Blog Posts
    posts.forEach(post => {
        xml += `
        <url>
            <loc>${siteUrl}/blog/${post.slug}</loc>
            <lastmod>${post.updatedAt.split('T')[0]}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
        </url>`;
    });

    xml += '</urlset>';

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}