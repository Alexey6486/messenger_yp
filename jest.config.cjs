module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	extensionsToTreatAsEsm: ['.ts'],
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
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|pcss|hbs?.raw)$': 'identity-obj-proxy'
	},
	testMatch: [
		'**/*.test.ts',
		'**/*.spec.ts'
	],
	verbose: true
};
