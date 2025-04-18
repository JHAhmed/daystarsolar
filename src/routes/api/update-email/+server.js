import contentfulManagement from 'contentful-management';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { email } = await request.json();

	try {
		const client = contentfulManagement.createClient({
			accessToken: env.CONTENTFUL_CMA_TOKEN
		});

		const space = await client.getSpace(env.CONTENTFUL_SPACE_ID);
		const environment = await space.getEnvironment('master');

		const entry = await environment.createEntry('mailingList', {
			fields: {
				emailId: {
					'en-US': email
				}
			}
		});

		await entry.publish();

		return json({ success: true, message: 'Email added successfully' });
	} catch (error) {
		console.error('Error updating mailing list:', error);
		return json(
			{ success: false, message: 'Failed to add email', error: error.message },
			{ status: 500 }
		);
	}
}
