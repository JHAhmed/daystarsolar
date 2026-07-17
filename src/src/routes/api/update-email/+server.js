import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { supabase } from '$lib/supabaseClient';

export async function POST({ request }) {
	const { email } = await request.json();

	try {
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('mailing_list')
			.insert([{ email: email }])
			.select()
			.single();

		if (supabaseError) {
			console.error('Supabase insert error:', supabaseError);
			throw new Error(`Failed to save report to database: ${supabaseError.message}`);
		}
		return json({ success: true, message: 'Email added successfully' });
	} catch (error) {
		console.error('Error updating mailing list:', error);
		return json(
			{ success: false, message: 'Failed to add email', error: error.message },
			{ status: 500 }
		);
	}
}

