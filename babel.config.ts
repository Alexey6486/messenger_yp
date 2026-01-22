import type {
	ConfigAPI,
	TransformOptions,
} from '@babel/core';

export default function (api: ConfigAPI): TransformOptions {
	api.cache(true);
	return {
		presets: [
			// Modern JavaScript
			[
				'@babel/preset-env',
				{
					targets: {
						node: 'current',
						browsers: ['>0.2%', 'not dead', 'not op_mini all'],
					},
					//useBuiltIns: 'usage',
					useBuiltIns: false,
					//corejs: '3.32',
					modules: 'commonjs',
				},
			],

			// TypeScript
			'@babel/preset-typescript',
		],

		plugins: [
			// Handle Vite's import.meta
			'babel-plugin-transform-import-meta',

			// Transform dynamic imports for Jest
			['babel-plugin-dynamic-import-node'],

			// Class properties and private methods
			// ['@babel/plugin-proposal-class-properties', { loose: true }],
			// ['@babel/plugin-proposal-private-methods', { loose: true }],
			// ['@babel/plugin-proposal-private-property-in-object', { loose: true }],

			// Object rest spread
			// '@babel/plugin-proposal-object-rest-spread',

			// Optional chaining and nullish coalescing
			// '@babel/plugin-proposal-optional-chaining',
			// '@babel/plugin-proposal-nullish-coalescing-operator',

			// Babel runtime
			[
				'@babel/plugin-transform-runtime',
				{
					// regenerator: true,
					// helpers: true,

					corejs: false, // ← Set to 3 if you want runtime polyfills
					helpers: true,
					regenerator: true,
					useESModules: false,
				},
			],
		],

		assumptions: {
			setPublicClassFields: true,
			privateFieldsAsProperties: true,
		},
	};
}
