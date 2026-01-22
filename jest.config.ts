import type { Config } from 'jest';

const config: Config = {
	// Test environment
	testEnvironment: 'jsdom',

	// Roots and test patterns
	roots: ['<rootDir>/src'],
	testMatch: [
		'**/*.{spec,test}.{js,jsx,ts,tsx}',
	],

	// Module name mapping (Vite aliases)
	moduleNameMapper: {
		// Vite aliases
		'^@/(.*)$': '<rootDir>/src/$1',
		'^~/(.*)$': '<rootDir>/src/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',

		// Handle .js extensions in imports (Vite ESM)
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},

	// Transform with Babel
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'babel-jest',
			{
				configFile: './babel.config.ts',
			},
		],
	},

	// Transform ignore patterns
	transformIgnorePatterns: [
		'node_modules/(?!(react|react-dom|@testing-library)/)',
	],

	// Module resolution
	moduleDirectories: ['node_modules', '<rootDir>/src'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

	// Clear mocks
	clearMocks: true,
	resetMocks: true,
};

export default config;
