const dotenv = require('dotenv');
const fs = require('fs');

// load dotenv if file exists
if (fs.existsSync('./.env')) {
  dotenv.config();
}

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
