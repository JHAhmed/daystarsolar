import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// inlineStyleThreshold: Infinity,
		adapter: adapter({
			maxDuration: 55,
		  }),
		alias: {
			$components: 'src/lib/components',
			$icons: 'src/lib/icons',
			$shadcn: 'src/lib/ui',
			$report: 'src/lib/report',
		},
	},
	preprocess: vitePreprocess(),
};
export default config;