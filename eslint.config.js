import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig([
	includeIgnoreFile(gitignorePath),
	// Agent tooling shipped with the scaffold — not project source.
	{ ignores: ['.claude/**', '.gemini/**', '.github/**'] },
	js.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},

	{
		files: ['**/*.svelte', '**/*.svelte.js'],
		languageOptions: { parserOptions: {} }
	},

	{
		rules: {
			// The site is served from the domain root and has no `base` path, so
			// wrapping every internal href in resolve() adds ceremony without
			// changing a single URL. Re-enable if the app is ever moved to a
			// subpath deployment.
			'svelte/no-navigation-without-resolve': 'off',

			// `_` is the conventional throwaway binding in `{#each}` blocks that
			// only need the index.
			'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
		}
	}
]);
