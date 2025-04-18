import * as contentful from 'contentful';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const { id } = await request.json();

	let post;

	try {
		const client = contentful.createClient({
			space: env.CONTENTFUL_SPACE_ID,
			accessToken: env.CONTENTFUL_ACCESS_TOKEN
		});

		const response = await client.getEntry(id);

		post = {
			title: response.fields.title,
			summary: response.fields.summary,
			date: response.fields.publishDate,
			content: response.fields.content,
			location: response.fields.location ?? '',
			projectType: response.fields.projectType ?? '',
			image: response.fields.image?.fields?.file?.url
				? `https:${response.fields.image.fields.file.url}`
				: '' // Handle missing images
		};
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		post = {
			title: 'Error fetching blog posts',
			location: '',
			projectType: '',
			summary: 'An error occurred while fetching blog posts. Please try again later.',
			content: 'An error occurred while fetching blog posts. Please try again later.',
			date: new Date().toISOString(),
			image: '',
			slug: '/404'
		};
	}

	return new Response(JSON.stringify(post));
}
