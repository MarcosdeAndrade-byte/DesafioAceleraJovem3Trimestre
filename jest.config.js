/* eslint-disable no-undef */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
