import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import OpenAI from 'openai';
import contentfulManagement from 'contentful-management';

function titleToSlug(title) {
	const slug = title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-'); // Collapse multiple hyphens

	// Enforce min and max length
	const trimmedSlug = slug.slice(0, 50).replace(/-+$/g, ''); // Trim trailing hyphens after slicing
	return trimmedSlug.length >= 3 ? trimmedSlug : '';
}

async function getTitle(openai, content) {
	const prompt = `Write a catchy short title for the given blog post about solar energy and solar power. Make it short and catchy. Return the title in plain text without quotes.
    The content is: \n ${content}.`;

	const response = await openai.responses.create({
		model: 'gpt-4o-mini',
		input: prompt
	});

	let title = response.output_text;
	return title;
}

async function getBlogPost(openai) {
	const prompt = `Write a short blog post (400 - 500 words) about solar energy and solar power. Include a little bit of advertising/marketing for Daystar Solar at the end. Make it very short and catchy. Make it sound like a blog post.
`;

	const response = await openai.responses.create({
		model: 'gpt-4o-mini',
		input: prompt
	});

	let content = response.output_text;
	return content;
}

async function formatContent(openai, content) {
	const template = `
                    {
                    'en-US': {
                        nodeType: 'document', // The main container
                        data: {},
                        content: [
                            {
                                nodeType: 'paragraph', // A paragraph node
                                data: {},
                                content: [
                                    {
                                        nodeType: 'text', // The actual text
                                        value: 'This is a sample text',
                                        marks: [], // For bold, italic, etc.
                                        data: {}
                                    }
                                ]
                            }
                        ]
                    }
                }
    `;
	const prompt = `Format the following content as a JSON object that can be used to create a blog post in Contentful. The content is: \n ${content}. \n The JSON object should be formatted as follows: \n ${template}`;

	const response = await openai.responses.create({
		model: 'gpt-4o',
		input: prompt,
		text: { format: { type: 'json_object' } }
	});

	let formattedContent = response.output_text;
	return formattedContent;
}

export async function POST({ request }) {
	const client = contentfulManagement.createClient({
		space: env.CONTENTFUL_SPACE_ID,
		accessToken: env.CONTENTFUL_CMA_TOKEN
	});

	try {
		const client = contentfulManagement.createClient({
			accessToken: env.CONTENTFUL_CMA_TOKEN
		});

		const space = await client.getSpace(env.CONTENTFUL_SPACE_ID);
		const environment = await space.getEnvironment('master');

		const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
		const resend = new Resend(env.RESEND_API_KEY);

		const content = await getBlogPost(openai);
		const title = await getTitle(openai, content);
		const slug = titleToSlug(title);
		const formattedContent = JSON.parse(await formatContent(openai, content));

		const entry = await environment.createEntry('blogPost', {
			fields: {
				title: {
					'en-US': title
				},
				slug: {
					'en-US': slug
				},
				content: formattedContent
			}
		});

		// await entry.publish();

		const draftsLink = `https://app.contentful.com/spaces/sip8decrwvhb/views/entries?id=Wb25K1EIJ8OppYiH&order.fieldId=updatedAt&order.direction=descending&searchText=&contentTypeId=&displayedFieldIds=contentType&displayedFieldIds=updatedAt&displayedFieldIds=author&contentTypeIds=blogPost&filters.0.key=__status&filters.0.op=&filters.0.val=draft`;
        const emailText = `A new blog post has been created! \n Title: ${title} \n Slug: ${slug} \n Content: ${content} \n View the draft here: ${draftsLink}`; 

		const { data, error } = await resend.emails.send({
			from: 'Jamal Haneef <marketing@wurks.studio>',
			to: 'jamalhascientist@gmail.com',
			subject: `New Blog: ${title}`,
            text: emailText,
		});

		return json({ success: true, message: 'Blog post added successfully' });
	} catch (error) {
		console.error('Error updating blogs:', error);
		return json(
			{ success: false, message: 'Failed to add blog post', error: error.message },
			{ status: 500 }
		);
	}
}
