export async function load({ fetch, params }) {
	const res = await fetch(`/api/get-entries`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ contentType: 'blogPost' })
	});

	const blogs = await res.json();

    return { blogs };
}

