module.exports = {
  setupFiles: [
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleNameMapper: {
    '\\.(scss|css)$': '<rootDir>/node_modules/jest-css-modules',
  },
};
