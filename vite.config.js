import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Vite has no built-in handling for glTF binaries, so without this the AR
	// route's model import is parsed as JavaScript and the page 500s.
	assetsInclude: ['**/*.glb'],
	ssr: {
		/**
		 * GSAP ships ES modules as plain `.js` files from a package that declares
		 * no `"type": "module"`, so Node is entitled to read them as CommonJS.
		 * Node 22.7 and later sniff the syntax and get it right; older runtimes
		 * do not, and hand back a namespace with no named exports — which is the
		 * `does not provide an export named 'ScrollTrigger'` crash every route
		 * threw on Vercel while the same build ran locally.
		 *
		 * Left external, the SSR bundle keeps a bare `import ... from
		 * 'gsap/ScrollTrigger'` and the outcome depends on whichever Node the
		 * host happens to run. Bundling it resolves the module at build time
		 * instead, so the deployed server never has to make that call. Nothing
		 * about the browser build changes: GSAP is still imported statically, so
		 * it stays available synchronously and `data-reveal` elements are not
		 * left hidden waiting on a second request.
		 */
		noExternal: ['gsap']
	},
	plugins: [
		tailwindcss(),
		// Must come before sveltekit(). It is a Vite plugin that installs its own
		// Svelte preprocessor — passing it as `preprocess` silently does nothing
		// and every <enhanced:img> falls back to shipping the original file.
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
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
