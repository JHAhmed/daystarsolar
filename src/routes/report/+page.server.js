import { loadReport } from '$server/report-loader.js';

export async function load({ url }) {
	return loadReport(url);
}
