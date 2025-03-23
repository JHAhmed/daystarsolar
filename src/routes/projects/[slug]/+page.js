export async function load({ params, url, fetch }) {

    let id = url.searchParams.get('id');

	const res = await fetch(`/api/getEntry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    });

	const post = await res.json();

    return { post };
}
