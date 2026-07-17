import * as contentful from 'contentful';
import { env } from '$env/dynamic/private';

// Initialize client
const client = contentful.createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN
});

export async function fetchContentfulData(contentType) {
    try {
        const response = await client.getEntries({ content_type: contentType });

        return response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            summary: item.fields.summary,
            // Use updatedAt for sitemap accuracy, fallback to publishDate
            updatedAt: item.sys.updatedAt || item.fields.publishDate, 
            slug: item.fields.slug,
            image: item.fields.image?.fields?.file?.url
                ? `https:${item.fields.image.fields.file.url}`
                : '/fallback-image.jpg'
        }));

    } catch (error) {
        console.error(`Error fetching ${contentType}:`, error);
        return [];
    }
}