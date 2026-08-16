import { createClient } from '@supabase/supabase-js';
import { env as publicEnv } from '$env/dynamic/public';
import { guardedWrite } from './guard.js';

/**
 * Supabase access, server-side only.
 *
 * The previous build imported this client from universal load functions and
 * component code, which shipped the SDK to the browser and let the report
 * pages query the database straight from the client. Every query now runs on
 * the server, so pages receive data rather than credentials.
 *
 * The env vars keep their PUBLIC_ prefix because that is what the Vercel
 * project already has configured, and because the anon key is safe to publish
 * by design — row-level security governs access, not secrecy of the key.
 */

let client;

function getClient() {
	client ??= createClient(publicEnv.PUBLIC_SUPABASE_URL, publicEnv.PUBLIC_SUPABASE_ANON_KEY);
	return client;
}

/** Adds an address to the newsletter list. */
export async function addToMailingList(email) {
	return guardedWrite(
		'mailing_list insert',
		{ email },
		async () => {
			const { error } = await getClient().from('mailing_list').insert([{ email }]);
			if (error) throw new Error(`Supabase insert failed: ${error.message}`);
			return true;
		},
		true
	);
}

/** Records a contact form submission. */
export async function saveContactSubmission({ name, email, phone, message }) {
	return guardedWrite(
		'contact_form insert',
		{ name, email, phone, message },
		async () => {
			const { error } = await getClient()
				.from('contact_form')
				.insert([{ name, email, phone_no: phone, message }]);
			if (error) throw new Error(`Supabase insert failed: ${error.message}`);
			return true;
		},
		true
	);
}

/**
 * Creates a report row and returns its id.
 * Under the write guard this returns null, and the calculator falls back to
 * holding the report in the session instead of persisting it.
 */
export async function createReport({ name, consumerNumber, phone, source }) {
	return guardedWrite(
		'reports insert',
		{ name, consumerNumber, phone, source },
		async () => {
			const { data, error } = await getClient()
				.from('reports')
				.insert([{ name, consumer_no: consumerNumber, phone_no: phone }])
				.select()
				.single();
			if (error) throw new Error(`Supabase insert failed: ${error.message}`);
			return data.id;
		},
		null
	);
}

/** Attaches the billing data to an existing report row. */
export async function attachReportData(id, data) {
	if (id == null) return true;

	return guardedWrite(
		'reports update',
		{ id, rows: Array.isArray(data) ? data.length : data },
		async () => {
			const { error } = await getClient().from('reports').update({ data }).eq('id', id);
			if (error) throw new Error(`Supabase update failed: ${error.message}`);
			return true;
		},
		true
	);
}

/** Reads a report for display or PDF rendering. Always live — reads are safe. */
export async function getReport(id) {
	const { data, error } = await getClient().from('reports').select().eq('id', id).single();

	if (error) {
		console.error(`Supabase: failed to read report ${id}`, error);
		return null;
	}
	return data;
}
