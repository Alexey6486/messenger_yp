module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: ['js', 'ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	clearMocks: true,
	testMatch: ['**/*.test.{ts,js}'],
	extensionsToTreatAsEsm: ['.ts'],
};
