// // src/routes/[...wp]/+server.js
// export function GET({ params }) {
// 	const wpPath = params.wp?.join('/') || '';
// 	throw redirect(301, wpPath.includes('wp-content') ? '/assets/' + wpPath.split('/').pop() : '/');
// }
