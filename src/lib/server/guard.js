import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

/**
 * The development write guard.
 *
 * Reads always hit the real services so local pages render real Contentful
 * content. Anything with a side effect — a Supabase insert, an outbound email —
 * is suppressed and logged in development unless ENABLE_WRITES is explicitly
 * turned on. Without this, ordinary local testing puts junk rows in
 * mailing_list and reports, and mails the client's real inboxes.
 */
export const writesEnabled = !dev || env.ENABLE_WRITES === 'true';

/**
 * Runs `perform` when writes are enabled; otherwise logs what would have
 * happened and returns `fallback`.
 *
 * @template T
 * @param {string} label What the write is, for the dev log.
 * @param {unknown} payload What would have been written or sent.
 * @param {() => Promise<T>} perform
 * @param {T} [fallback] Returned in place of the real result when suppressed.
 * @returns {Promise<T>}
 */
export async function guardedWrite(label, payload, perform, fallback = undefined) {
	if (writesEnabled) return perform();

	console.info(
		`[write-guard] suppressed "${label}" — set ENABLE_WRITES=true to perform it for real.\n`,
		payload
	);
	return fallback;
}
