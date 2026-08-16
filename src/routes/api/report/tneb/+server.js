import { json } from '@sveltejs/kit';
import { REGION_CODES } from '$data/regions.js';
import { fetchBillingHistory } from '$server/tneb.js';

export const config = { maxDuration: 60 };

/**
 * Optional TNEB lookup. Returns the billing history for the calculator to fold
 * into its manual table, so the visitor reviews what came back before a report
 * is created — the old flow committed a database row before scraping and left
 * an orphaned record behind whenever the scrape then failed.
 */
export async function POST({ request }) {
	const body = await request.json().catch(() => null);
	const consumerNumber = String(body?.consumerNumber ?? '').replace(/\s/g, '');

	if (consumerNumber.length < 10 || !/^\d+$/.test(consumerNumber)) {
		return json(
			{ success: false, message: 'Please enter a valid consumer number.' },
			{ status: 400 }
		);
	}

	if (!REGION_CODES.includes(consumerNumber.slice(0, 2))) {
		return json(
			{ success: false, message: 'Invalid region code in consumer number!' },
			{ status: 400 }
		);
	}

	try {
		const { readings, solar } = await fetchBillingHistory(consumerNumber);

		if (solar) {
			return json({ success: true, solar: true, readings: [] });
		}

		if (!readings.length) {
			return json(
				{
					success: false,
					message: 'No bills were found for that consumer number. Please enter them manually.'
				},
				{ status: 404 }
			);
		}

		return json({ success: true, solar: false, readings });
	} catch (err) {
		console.error('TNEB lookup failed:', err);
		return json(
			{
				success: false,
				message: 'The TNEB portal did not respond. Please enter your bills manually.'
			},
			{ status: 502 }
		);
	}
}
