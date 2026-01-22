module.exports = {
	// Test environment
	testEnvironment: 'jsdom',

	// Roots and test patterns
	roots: ['<rootDir>/src'],
	testMatch: [
		'**/__tests__/**/*.{js,jsx,ts,tsx}',
		'**/*.{spec,test}.{js,jsx,ts,tsx}',
	],

	// Module name mapping (aliases)
	moduleNameMapper: {
		// Vite aliases
		'^@/(.*)$': '<rootDir>/src/$1',
		'^~/(.*)$': '<rootDir>/src/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',

		// Static assets
		'\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},

	// Transform configurations
	transform: {
		// Handle both JavaScript and TypeScript
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
				useESM: true,
			},
		],
	},

	// Transform ignore patterns
	transformIgnorePatterns: [
		'node_modules/(?!(react|react-dom|@testing-library)/)',
	],

	// Setup files
	// setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

	// Coverage configuration
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!src/main.{js,jsx,ts,tsx}',
		'!src/vite-env.d.ts',
	],

	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],

	// Clear mocks
	clearMocks: true,
	resetMocks: true,
	resetModules: true,

	// Module file extensions
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
