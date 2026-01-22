module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: '<rootDir>/tsconfig.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	// moduleFileExtensions: ['js', 'ts'],
	// testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	// clearMocks: true,
	// testMatch: ['**/*.test.{ts,js}'],
	extensionsToTreatAsEsm: ['.ts'],
};
