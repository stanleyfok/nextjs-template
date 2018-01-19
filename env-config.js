const md5 = require('md5');
const pkg = require('./package.json');

// these variables will be compiled by babel in build time
module.exports = {
  ANALYZE: process.env.ANALYZE || false,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  VERSION_HASH: md5(pkg.version),
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.tvmaze.com',
  ASSET_PREFIX: process.env.ASSET_PREFIX || '',
};
