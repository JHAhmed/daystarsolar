export async function load({ fetch, params }) {
	const res = await fetch(`/api/getEntries`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ contentType: 'project' })
	});

	const projects = await res.json();

    return { projects };
}

