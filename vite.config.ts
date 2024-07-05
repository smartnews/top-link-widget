import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					return 'vendor';
				}
			}
		},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
