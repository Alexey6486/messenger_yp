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
				configure: (proxy, options) => {
					options.changeOrigin = true;
					proxy.on('proxyRes', (proxyRes) => {
						const setCookie = proxyRes.headers['set-cookie'];
						if (setCookie) {
							proxyRes.headers['set-cookie'] = setCookie.map(cookie =>
								cookie
									.replace(/Domain=([^;,]+)/i, 'Domain=localhost')
									.replace(/SameSite=None/i, 'SameSite=Lax'), // Для localhost
							);
						}
					});
				},
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/ws': {
				target: 'wss://ya-praktikum.tech/ws',
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/ws/, ''),
				// secure: true,
				// configure: (proxy, options) => {
				// 	console.log('WS Proxy:', { proxy, options });
				// 	proxy.on('proxyReqWs', (proxyReq, req, socket, options, head) => {
				// 		console.log('WS proxyReqWs:', { req, proxyReq, options, socket, head });
				// 		const setCookie = req.headers['set-cookie'];
				// 		if (setCookie) {
				// 			req.headers['set-cookie'] = setCookie.map(cookie =>
				// 				cookie
				// 					.replace(/Domain=([^;,]+)/i, 'Domain=localhost')
				// 					.replace(/SameSite=None/i, 'SameSite=Lax'), // Для localhost
				// 			);
				// 		}
				// 	});
				// },
			},
		},
	},
	base: process.env.VITE_BASE || '/',
	build: {
		outDir: 'dist',
	},
});
