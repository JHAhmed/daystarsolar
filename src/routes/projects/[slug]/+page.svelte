<script>
	import { Seo, Article } from '$components';
	import { entrySchema, pageTitle } from '$lib/seo/schema.js';

	let { data } = $props();
	const post = $derived(data.post);
</script>

<Seo
	title={pageTitle(post.title)}
	description={post.summary}
	ogTitle={post.title}
	type="article"
	path="/projects/{post.slug}"
	image={post.image || '/oghome.png'}
	schema={entrySchema('CreativeWork', {
		path: `/projects/${post.slug}`,
		name: post.title,
		description: post.summary
	})}
/>

<Article {post} backHref="/projects" backLabel="Back" />
