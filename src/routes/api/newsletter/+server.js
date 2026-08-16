import { json } from '@sveltejs/kit';
import { addToMailingList } from '$server/supabase.js';
import { validateEmail, ValidationError } from '$server/validation.js';

/** Newsletter signup, from the footer. Replaces /api/update-email. */
export async function POST({ request }) {
	let email;

	try {
		({ email } = validateEmail(await request.json().catch(() => null)));
	} catch (err) {
		if (err instanceof ValidationError) {
			return json({ success: false, message: err.message }, { status: 400 });
		}
		throw err;
	}

	try {
		await addToMailingList(email);
		return json({ success: true });
	} catch (err) {
		console.error('Newsletter signup failed:', err);
		return json(
			{ success: false, message: 'Could not add that email right now.' },
			{ status: 500 }
		);
	}
}
