import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names, with later Tailwind utilities beating earlier ones.
 * Needed wherever a component ships a default class a caller may override —
 * plain concatenation leaves both `size-4` and `size-6` in the attribute and
 * lets stylesheet order decide, which is not something a caller can reason about.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/** 1234567 → "12,34,567" (Indian digit grouping). */
export function formatIndianNumber(value) {
	const number = Math.round(Number(value) || 0);
	const negative = number < 0;
	const digits = Math.abs(number).toString();

	let formatted;
	if (digits.length <= 3) {
		formatted = digits;
	} else {
		const lastThree = digits.slice(-3);
		const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
		formatted = `${rest},${lastThree}`;
	}

	return negative ? `-${formatted}` : formatted;
}

/** 1234567 → "₹12,34,567" */
export function formatRupees(value) {
	return `₹${formatIndianNumber(value)}`;
}
