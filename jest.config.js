const { compilerOptions } = require('./tsconfig.json')

const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/*.spec.ts',
    '<rootDir>/src/**/__tests__/*.test.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
