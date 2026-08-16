import { json } from '@sveltejs/kit';
import { createReport, attachReportData } from '$server/supabase.js';
import { ValidationError } from '$server/validation.js';

/**
 * Creates a report from manually entered billing history.
 *
 * This is the calculator's primary path. It needs no third-party portal, no
 * headless browser and no CAPTCHA, so it answers in milliseconds rather than
 * the 10–20 seconds the scraper needed, and it cannot break when TNEB changes
 * their markup.
 */

const PERIOD = /^\d{2}\/\d{2}\/\d{4}$/;

function validate(body) {
	const name = String(body?.name ?? '').trim();
	const phone = String(body?.phone ?? '').trim();
	const consumerType = String(body?.consumerType ?? 'domestic').trim();
	const rows = Array.isArray(body?.readings) ? body.readings : [];

	if (name.length < 2) throw new ValidationError('Please enter your name.');
	if (phone.replace(/\D/g, '').length < 10)
		throw new ValidationError('Please enter a valid phone number.');

	const readings = rows
		.map((row) => ({
			assessmentDate: String(row?.assessmentDate ?? '').trim(),
			consumptionUnits: String(row?.consumptionUnits ?? '').trim(),
			totalCharges: String(row?.totalCharges ?? '').trim()
		}))
		.filter((row) => row.consumptionUnits && row.totalCharges);

	if (readings.length < 2) throw new ValidationError('Please enter at least two billing periods.');

	for (const row of readings) {
		if (!PERIOD.test(row.assessmentDate))
			throw new ValidationError('Each billing period needs a valid date.');
		if (!Number.isFinite(Number(row.consumptionUnits)) || Number(row.consumptionUnits) <= 0)
			throw new ValidationError('Units consumed must be a positive number.');
		if (!Number.isFinite(Number(row.totalCharges)) || Number(row.totalCharges) <= 0)
			throw new ValidationError('Bill amount must be a positive number.');
	}

	return { name, phone, consumerType, readings };
}

export async function POST({ request }) {
	let input;

	try {
		input = validate(await request.json().catch(() => null));
	} catch (err) {
		if (err instanceof ValidationError) {
			return json({ success: false, message: err.message }, { status: 400 });
		}
		throw err;
	}

	try {
		const id = await createReport({
			name: input.name,
			consumerNumber: null,
			phone: input.phone,
			source: 'manual'
		});

		await attachReportData(id, input.readings);

		// Under the development write guard there is no row to link to, so the
		// caller is told to hold the data client-side instead of redirecting to
		// a report id that was never persisted.
		return json({ success: true, id, persisted: id != null });
	} catch (err) {
		console.error('Report creation failed:', err);
		return json(
			{ success: false, message: 'Could not build your report right now. Please try again.' },
			{ status: 500 }
		);
	}
}
