import { formatIndianNumber } from '$lib/utils.js';

/**
 * Every number the solar report prints.
 *
 * Extracted from the four page components, which each recomputed overlapping
 * figures from the raw rows — the average kW appeared in three of them with
 * three slightly different expressions. The formulas themselves are unchanged:
 * they are the client's, and the constants in them (the ₹4/unit post-solar
 * rate, the /60/4*2 capacity factor, the /8 savings divisor) are deliberate.
 */

/** 'DD/MM/YYYY' → 'Jan-Feb 2025', matching the billing period it covers. */
export function formatPeriod(dateString) {
	const [, month, year] = (dateString || '01/01/1970').split('/').map(Number);
	if (!month || !year) return dateString;

	const start = new Date(year, month - 3, 1).toLocaleString('en-US', { month: 'short' });
	const end = new Date(year, month - 2, 1).toLocaleString('en-US', { month: 'short' });
	return `${start}-${end} ${year}`;
}

/** Normalises the stored rows into numbers with a display period. */
export function normalise(rows = []) {
	return rows
		.map((row) => ({
			assessmentDate: row.assessmentDate ?? '',
			consumptionUnits: Number.parseInt(row.consumptionUnits, 10) || 0,
			totalCharges: Number.parseInt(row.totalCharges, 10) || 0,
			formattedDate: formatPeriod(row.assessmentDate)
		}))
		.filter((row) => row.consumptionUnits > 0);
}

function sum(rows, key) {
	return rows.reduce((total, row) => total + row[key], 0);
}

/** Peak, trough, totals and averages for a slice of the history. */
export function analyse(rows) {
	if (!rows.length) {
		return { peak: null, min: null, totalUnits: 0, totalCost: 0, avgUnits: 0, avgCost: 0 };
	}

	const peak = rows.reduce((a, b) => (b.consumptionUnits > a.consumptionUnits ? b : a));
	const min = rows.reduce((a, b) => (b.consumptionUnits < a.consumptionUnits ? b : a));
	const totalUnits = sum(rows, 'consumptionUnits');
	const totalCost = sum(rows, 'totalCharges');

	return {
		peak,
		min,
		totalUnits,
		totalCost,
		avgUnits: totalUnits / rows.length,
		avgCost: totalCost / rows.length
	};
}

/** Groups the history into calendar quarters, most recent first, capped at 12. */
export function byQuarter(rows) {
	const buckets = new Map();

	for (const row of rows) {
		const [day, month, year] = row.assessmentDate.split('/').map(Number);
		const date = new Date(year, (month || 1) - 1, day || 1);
		if (Number.isNaN(date.getTime())) continue;

		const key = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`;
		const bucket = buckets.get(key) ?? { period: key, consumptionUnits: 0, totalCharges: 0 };

		bucket.consumptionUnits += row.consumptionUnits;
		bucket.totalCharges += row.totalCharges;
		buckets.set(key, bucket);
	}

	return [...buckets.values()]
		.sort((a, b) => b.period.localeCompare(a.period))
		.slice(0, 12)
		.map((bucket) => ({
			...bucket,
			// Post-solar running cost, assumed at ₹4 per unit.
			savings: Math.round(bucket.totalCharges - bucket.consumptionUnits * 4)
		}));
}

/** The full set of figures the report renders. */
export function buildReport(rawRows) {
	const rows = normalise(rawRows);
	const overall = analyse(rows);

	// Two halves, so the report can compare the earlier year with the later one.
	const evenRows = rows.length % 2 === 0 ? rows : rows.slice(0, -1);
	const mid = evenRows.length / 2;
	const recent = analyse(evenRows.slice(0, mid));
	const earlier = analyse(evenRows.slice(mid));

	const perUnitCost = overall.totalUnits ? overall.totalCost / overall.totalUnits : 0;
	const unitsOffset = Math.ceil(overall.totalUnits / 8);

	const quarters = byQuarter(rows);

	return {
		rows,
		recent,
		earlier,
		quarters,
		totalUnits: overall.totalUnits,
		totalCost: overall.totalCost,
		perUnitCost,
		/** Headline "TOTAL SAVINGS" figure. */
		totalSavings: Math.round(perUnitCost * unitsOffset),
		/** Headline "REQUIRED SOLAR KW" figure. */
		requiredKw: Math.ceil((overall.avgUnits / 60 / 4) * 2),
		/** Same capacity, unrounded, quoted as KW/Hr in the prose. */
		averageKwHr: (overall.avgUnits / 60 / 4) * 2,
		quarterTotals: {
			units: quarters.reduce((total, q) => total + q.consumptionUnits, 0),
			charges: quarters.reduce((total, q) => total + q.totalCharges, 0),
			savings: quarters.reduce((total, q) => total + q.savings, 0)
		}
	};
}

export { formatIndianNumber };

/** '4th August 2026' */
export function formatLongDate(date = new Date()) {
	const day = date.getDate();
	const month = date.toLocaleString('en-GB', { month: 'long' });
	const suffix =
		day % 10 === 1 && day !== 11
			? 'st'
			: day % 10 === 2 && day !== 12
				? 'nd'
				: day % 10 === 3 && day !== 13
					? 'rd'
					: 'th';

	return `${day}${suffix} ${month} ${date.getFullYear()}`;
}
