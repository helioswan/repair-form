/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupFilesAfterEnv.ts'],
  setupFiles: ["dotenv/config"],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};