// module.exports = {
// 	preset: 'ts-jest',
// 	testEnvironment: 'node',
// 	transform: {
// 		'^.+\\.tsx$': [
// 			'ts-jest',
// 			{
// 				useESM: true,
// 				tsconfig: '<rootDir>/tsconfig.json',
// 			},
// 		],
// 	},
// 	moduleNameMapper: {
// 		'^@/(.*)$': '<rootDir>/src/$1',
// 	},
// 	// moduleFileExtensions: ['js', 'ts'],
// 	// testPathIgnorePatterns: ['/node_modules/', '/dist/'],
// 	// clearMocks: true,
// 	// testMatch: ['**/*.test.{ts,js}'],
// 	extensionsToTreatAsEsm: ['.ts'],
// 	resetModules: true
// };
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
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
		'^@block/(.*)$': '<rootDir>/src/block/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1'
	},
	testMatch: [
		'**/*.test.ts',
		'**/*.spec.ts'
	],
	verbose: true
};
