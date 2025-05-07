export default {
  testMatch: ['**/tests/**/*.test.mjs'],
  testEnvironment: 'node',
  transform: {}, 
  transform: {
    "^.+\\.m?js$": "babel-jest"
  }
};