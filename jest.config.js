/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};