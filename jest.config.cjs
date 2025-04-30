module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(@web3-storage)/)"
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};