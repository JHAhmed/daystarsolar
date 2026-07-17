export async function load({ params, url }) {
    let solar = url.searchParams.get('solar');

    return {
        solar
    };
}