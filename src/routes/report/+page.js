import { supabase } from '$lib/supabaseClient';

export async function load({ params, url }) {
	let id = url.searchParams.get('id');

	const { data: report, error } = await supabase.from('reports').select().eq('id', id).single();

	if (error) {
		console.error(error);
	}
    
	return {
		report
	};
}
