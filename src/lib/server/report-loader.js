import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { getReport } from './supabase.js';

/**
 * Shared loader for /report and /report-view.
 *
 * `?id=demo` returns a fixture in development only. The old codebase kept a
 * `dataOld` array of dummy rows in a client-side state module for the same
 * purpose, which shipped to production and sat next to the real data with
 * nothing but a comment distinguishing them.
 */
const DEMO = {
	id: 'demo',
	name: 'Demo Customer',
	type: 'domestic',
	data: [
		{ assessmentDate: '08/03/2025', consumptionUnits: '1635', totalCharges: '11450' },
		{ assessmentDate: '08/01/2025', consumptionUnits: '1974', totalCharges: '14210' },
		{ assessmentDate: '08/11/2024', consumptionUnits: '2864', totalCharges: '22380' },
		{ assessmentDate: '09/09/2024', consumptionUnits: '3012', totalCharges: '24060' },
		{ assessmentDate: '08/07/2024', consumptionUnits: '2966', totalCharges: '23640' },
		{ assessmentDate: '09/05/2024', consumptionUnits: '3391', totalCharges: '28150' },
		{ assessmentDate: '08/03/2024', consumptionUnits: '2189', totalCharges: '15980' },
		{ assessmentDate: '08/01/2024', consumptionUnits: '1680', totalCharges: '11720' },
		{ assessmentDate: '09/11/2023', consumptionUnits: '2714', totalCharges: '20940' },
		{ assessmentDate: '08/09/2023', consumptionUnits: '2967', totalCharges: '23680' },
		{ assessmentDate: '10/07/2023', consumptionUnits: '3498', totalCharges: '29310' },
		{ assessmentDate: '09/05/2023', consumptionUnits: '3240', totalCharges: '26440' }
	]
};

export async function loadReport(url) {
	const id = url.searchParams.get('id');
	if (!id) error(400, 'Missing report id');

	if (dev && id === 'demo') return { report: DEMO };

	const report = await getReport(id);
	if (!report) error(404, 'Report not found');

	return { report };
}
