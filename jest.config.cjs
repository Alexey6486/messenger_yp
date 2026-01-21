module.exports = {
	rootDir: '.',
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	moduleNameMapper: {
		// '^@/(.*)$': '<rootDir>/src/$1',
		// '^@components/(.*)$': '<rootDir>/src/components/$1',
		// '^@block/(.*)$': '<rootDir>/src/block/$1',
		// '^@pages/(.*)$': '<rootDir>/src/pages/$1',
		// '^@constants/(.*)$': '<rootDir>/src/constants/$1',
		// '^@utils/(.*)$': '<rootDir>/src/utils/$1',
		// '^@store/(.*)$': '<rootDir>/src/store/$1',
		// '^@api/(.*)$': '<rootDir>/src/api/$1',
		// '^@styles/(.*)$': '<rootDir>/src/styles/$1',
		// '^@types/(.*)$': '<rootDir>/src/types/$1',

		// Core alias
		'^@/(.*)$': '<rootDir>/src/$1',

		// Vite specific
		'^~/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	clearMocks: true,
	testMatch: ['**/*.test.{ts,tsx,js,jsx}'],
	extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};
