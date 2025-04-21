import * as contentful from 'contentful';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

const client = contentful.createClient({
	space: env.CONTENTFUL_SPACE_ID,
	accessToken: env.CONTENTFUL_ACCESS_TOKEN
});

export async function load({ params }) {
	const slug = params.slug.split('/').pop();  

	try {
		const response = await client.getEntries({
			content_type: 'blogPost',
			'fields.slug': slug,
			limit: 1
		});

		if (response.items && response.items.length > 0) {
			const post = response.items[0];

			return {
				post: {
					title: post.fields.title,
					summary: post.fields.summary,
					image: post.fields.image?.fields?.file?.url
						? `https:${post.fields.image.fields.file.url}`
						: '',
					date: post.fields.publishDate,
					content: post.fields.content,
					slug: post.fields.slug,
				}
			};
		} else {
			console.warn(`No post found for slug: ${params.slug}`);
			throw error(404, 'Not Found');
		}
	} catch (err) {
		console.error('Error fetching post from Contentful:', err);
		throw error(500, 'Failed to load blog post');
	}
}
