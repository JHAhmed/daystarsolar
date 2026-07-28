import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { supabase } from '$lib/supabaseClient.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Verifies the reCAPTCHA v3 token with Google. Requires RECAPTCHA_SECRET_KEY env var
// (from the same reCAPTCHA admin console entry as the public site key).
async function verifyRecaptcha(token) {
	if (!env.RECAPTCHA_SECRET_KEY || !token) {
		return { success: false, score: 0 };
	}
	try {
		const params = new URLSearchParams();
		params.append('secret', env.RECAPTCHA_SECRET_KEY);
		params.append('response', token);

		const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: params
		});
		return await res.json();
	} catch (err) {
		console.error('reCAPTCHA verification request failed:', err);
		return { success: false, score: 0 };
	}
}

export async function POST({ request }) {
	const { firstName, lastName, email, number, message, company, recaptchaToken } =
		await request.json();

	// --- Honeypot check ---
	// "company" is a hidden field real users never fill in. Bots that auto-fill every
	// field will trip this. Return a fake success so the bot doesn't learn anything.
	if (company) {
		console.warn('Contact form: honeypot triggered, dropping submission silently.');
		return json({ success: true, message: 'Message sent successfully' });
	}

	// --- Server-side validation ---
	// The frontend validates too, but that can be bypassed by anyone posting directly
	// to this endpoint (which is exactly what most spam bots do).
	if (
		!firstName?.trim() ||
		firstName.trim().length < 2 ||
		!lastName?.trim() ||
		!email?.trim() ||
		!EMAIL_REGEX.test(email) ||
		!number?.trim() ||
		number.replace(/\D/g, '').length < 10 ||
		!message?.trim() ||
		message.trim().length < 10 ||
		message.length > 3000
	) {
		return json({ success: false, message: 'Invalid form data' }, { status: 400 });
	}

	// --- reCAPTCHA v3 verification ---
	// Only enforced if RECAPTCHA_SECRET_KEY is configured, so the form doesn't break
	// before the developer sets up the Google reCAPTCHA keys.
	if (env.RECAPTCHA_SECRET_KEY) {
		const recaptchaResult = await verifyRecaptcha(recaptchaToken);
		const score = recaptchaResult.score ?? 0;
		if (!recaptchaResult.success || score < 0.5) {
			console.warn('Contact form: reCAPTCHA check failed.', recaptchaResult);
			return json(
				{ success: false, message: 'Could not verify you are human. Please try again.' },
				{ status: 400 }
			);
		}
	}

	try {
		const resend = new Resend(env.RESEND_API_KEY);

        const emailHtml = `
            <body style="font-family: 'Inter', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333; line-height: 1.6;">
                <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    <div style="padding: 32px; background-color: #f8fafc; border-bottom: 1px solid #eaeaea;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a202c;">Message from ${firstName} ${lastName}</h1>
                    </div>
                    
                    <div style="padding: 32px;">
                    <div style="margin-bottom: 24px;">
                        <p style="margin: 0 0 6px; font-size: 14px; color: #718096; font-weight: 500;">Contact Information</p>
                        <p style="margin: 0 0 4px; font-size: 16px;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 0; font-size: 16px;"><strong>Phone:</strong> ${number}</p>
                    </div>
                    
                    <div style="margin-top: 24px;">
                        <p style="margin: 0 0 6px; font-size: 14px; color: #718096; font-weight: 500;">Message</p>
                        <div style="padding: 16px; background-color: #f8fafc; border-radius: 6px; font-size: 16px;">
                        ${message}
                        </div>
                    </div>
                    </div>
                    
                    <div style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #eaeaea; font-size: 14px; color: #718096; text-align: center;">
                    <p style="margin: 0;">This message was sent through your contact form.</p>
                    </div>
                </div>
            </body>`

        const emailText = `Message from ${firstName} ${lastName}\n\nContact Information\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`;

		const { data, error } = await resend.emails.send({
			from: 'Daystar Solar <updates@daystarsolar.co.in>',
			// to: ['products@daystarsolar.co.in', 'jamalhascientist@gmail.com'],
			to: ['products@daystarsolar.co.in', 'info@daystarsolar.co.in'],
			subject: 'New Message Received from Contact Form',
			html: emailHtml,
            text: emailText,
		});
        // console.log('Email sent successfully:', data);

        const { data: supabaseResult, error: supabaseError } = await supabase
            .from('contact_form') // Ensure 'reports' table exists with 'name' (text) and 'data' (jsonb) columns
            .insert([{ name: `${firstName} ${lastName}`, email: email, phone_no: number, message: message }])
            .select();

        if (supabaseError) {
            console.error('Supabase insert error:', supabaseError);
            throw new Error(`Failed to save report to database: ${supabaseError.message}`);
        }

		return json({ success: true, message: 'Message sent successfully' });
	} catch (error) {
		console.error('Error sending message:', error);
		return json(
			{ success: false, message: 'Failed to send message', error: error.message },
			{ status: 500 }
		);
	}
}
