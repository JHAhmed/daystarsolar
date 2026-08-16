import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			preprocess: [enhancedImages()],
			adapter: adapter({
				// The report PDF route drives a headless browser; it needs the headroom.
				maxDuration: 60
			}),
			alias: {
				$components: 'src/lib/components',
				$icons: 'src/lib/icons',
				$motion: 'src/lib/motion',
				$data: 'src/lib/data',
				$server: 'src/lib/server'
			}
		})
	]
});
