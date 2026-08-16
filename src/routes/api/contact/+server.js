import { json } from '@sveltejs/kit';
import { saveContactSubmission } from '$server/supabase.js';
import { sendContactNotification } from '$server/mail.js';
import { validateContact, ValidationError } from '$server/validation.js';

/**
 * Contact form submission. Replaces /api/send-contact-email.
 *
 * The email and the database row are independent: if Resend is down the
 * enquiry is still recorded, and vice versa. The previous version awaited them
 * in sequence inside one try block, so a Supabase failure after a successful
 * send returned a 500 and the visitor was told their message had failed when
 * it had already arrived.
 */
export async function POST({ request }) {
	let submission;

	try {
		submission = validateContact(await request.json().catch(() => null));
	} catch (err) {
		if (err instanceof ValidationError) {
			return json({ success: false, message: err.message }, { status: 400 });
		}
		throw err;
	}

	const [notified, recorded] = await Promise.allSettled([
		sendContactNotification(submission),
		saveContactSubmission({
			name: `${submission.firstName} ${submission.lastName}`,
			email: submission.email,
			phone: submission.number,
			message: submission.message
		})
	]);

	if (notified.status === 'rejected') {
		console.error('Contact notification failed:', notified.reason);
	}
	if (recorded.status === 'rejected') {
		console.error('Contact submission not recorded:', recorded.reason);
	}

	// Only a total failure is worth telling the visitor about — if either path
	// succeeded, the enquiry reached the business.
	if (notified.status === 'rejected' && recorded.status === 'rejected') {
		return json(
			{ success: false, message: 'Could not send your message right now. Please try again.' },
			{ status: 500 }
		);
	}

	return json({ success: true });
}
