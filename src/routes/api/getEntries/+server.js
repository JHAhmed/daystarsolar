import * as contentful from 'contentful';
import { env } from '$env/dynamic/private'; 

export async function POST({ request }) {
    const { contentType } = await request.json();
    let entries = [];

    try {
        const client = contentful.createClient({
            space: env.CONTENTFUL_SPACE_ID,
            accessToken: env.CONTENTFUL_ACCESS_TOKEN
        });

        const response = await client.getEntries({ content_type: contentType });

        entries = response.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            summary: item.fields.summary,
            date: item.fields.publishDate,
            slug: item.fields.slug,
            image: item.fields.image?.fields?.file?.url
                ? `https:${item.fields.image.fields.file.url}`
                : '/fallback-image.jpg' // Handle missing images
        }));

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        entries = [
            {
                id: 'error',
                title: 'Error fetching blog posts',
                summary: 'An error occurred while fetching blog posts. Please try again later.',
                date: new Date().toISOString(),
                image: '/fallback-image.jpg',
                slug: '/404'
            }
        ];
    }
    
    
	return new Response(JSON.stringify(entries));
}