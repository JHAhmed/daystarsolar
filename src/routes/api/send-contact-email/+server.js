import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { Resend } from 'resend';

export async function POST({ request }) {
	const { firstName, lastName, email, number, message } = await request.json();

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
			to: ['products@daystarsolar.co.in', 'info@daystarsolar.co.in', 'accounts@daystarsolar.co.in', 'jamalhascientist@gmail.com'],
			subject: 'Final Test (Automated/Prod) 3/3',
			html: emailHtml,
            text: emailText,
		});
        console.log('Email sent successfully:', data);
		return json({ success: true, message: 'Message sent successfully' });
	} catch (error) {
		console.error('Error sending message:', error);
		return json(
			{ success: false, message: 'Failed to send message', error: error.message },
			{ status: 500 }
		);
	}
}
