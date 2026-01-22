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
			'@': path.resolve(__dirname, 'src'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@block': path.resolve(__dirname, 'src/block'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@utils': path.resolve(__dirname, 'src/utils'),
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
	base: process.env.VITE_BASE || '/',
	build: {
		outDir: 'dist',
	},
});
