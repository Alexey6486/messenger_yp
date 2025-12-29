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
		proxy: {
			'/api': {
				target: 'https://ya-praktikum.tech/api',
				changeOrigin: true,
				secure: false, // если целевой сервер использует самоподписанный сертификат
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	base: process.env.VITE_BASE || '/',
	build: {
		outDir: 'dist',
	},
});
