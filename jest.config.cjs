module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: '<rootDir>/tsconfig.json'
			}
		]
	},
	moduleNameMapper: {
		'^(\\.*/.*)\\.ts$': '$1',
	},
	moduleFileExtensions: ['js', 'ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	clearMocks: true,
	testMatch: [
		'**/*.test.ts',
		'**/*.spec.ts'
	],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	verbose: true
};

