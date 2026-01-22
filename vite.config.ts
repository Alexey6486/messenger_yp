import { defineConfig } from 'vite';
import * as path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
	plugins: [
		handlebars({
			include: ['src/**/*.hbs', 'src/**/*.html'],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'~': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@styles': path.resolve(__dirname, './src/styles'),
		},
	},
	css: {
		postcss: {
			plugins: [
				postcssPresetEnv({
					autoprefixer: {
						grid: true,
					},
					features: {
						'nesting-rules': true,
					},
					browsers: 'last 2 versions',
				}),
			],
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	base: '/',
	build: {
		outDir: 'dist',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
				},
			},
		},
	},
});
