import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { CONTACT } from '$data/site.js';
import { guardedWrite } from './guard.js';

/**
 * Outbound email.
 *
 * Note the escaping: the previous template interpolated the visitor's name and
 * message straight into the HTML body, so anything typed into the contact form
 * was rendered as markup in the client's inbox. Every interpolated value is
 * now escaped, and newlines in the message are converted to <br> afterwards so
 * multi-line messages still read correctly.
 */

let resend;

function getClient() {
	resend ??= new Resend(env.RESEND_API_KEY);
	return resend;
}

function escapeHtml(value) {
	return String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function contactTemplate({ firstName, lastName, email, number, message }) {
	const name = escapeHtml(`${firstName} ${lastName}`.trim());
	const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

	return `
	<body style="font-family: 'Inter', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333; line-height: 1.6;">
		<div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
			<div style="padding: 32px; background-color: #f8fafc; border-bottom: 1px solid #eaeaea;">
				<h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a202c;">Message from ${name}</h1>
			</div>

			<div style="padding: 32px;">
				<div style="margin-bottom: 24px;">
					<p style="margin: 0 0 6px; font-size: 14px; color: #718096; font-weight: 500;">Contact Information</p>
					<p style="margin: 0 0 4px; font-size: 16px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
					<p style="margin: 0; font-size: 16px;"><strong>Phone:</strong> ${escapeHtml(number)}</p>
				</div>

				<div style="margin-top: 24px;">
					<p style="margin: 0 0 6px; font-size: 14px; color: #718096; font-weight: 500;">Message</p>
					<div style="padding: 16px; background-color: #f8fafc; border-radius: 6px; font-size: 16px;">${safeMessage}</div>
				</div>
			</div>

			<div style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #eaeaea; font-size: 14px; color: #718096; text-align: center;">
				<p style="margin: 0;">This message was sent through your contact form.</p>
			</div>
		</div>
	</body>`;
}

/** Sends the contact form notification to the sales and service inboxes. */
export async function sendContactNotification(submission) {
	const { firstName, lastName, email, number, message } = submission;

	const text = `Message from ${firstName} ${lastName}\n\nContact Information\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`;

	return guardedWrite(
		'contact notification email',
		{ to: [CONTACT.emails.sales, CONTACT.emails.service], from: email },
		async () => {
			const { error } = await getClient().emails.send({
				from: 'Daystar Solar <updates@daystarsolar.co.in>',
				to: [CONTACT.emails.sales, CONTACT.emails.service],
				subject: 'New Message Received from Contact Form',
				html: contactTemplate(submission),
				text
			});

			if (error) throw new Error(`Resend failed: ${error.message ?? 'unknown error'}`);
			return true;
		},
		true
	);
}
