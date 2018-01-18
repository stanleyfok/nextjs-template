const md5 = require('md5');
const pkg = require('./package.json');

// these variables will be compiled by babel in build time
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  VERSION_HASH: md5(pkg.version),
  API_BASE_URL: process.env.API_BASE_URL,
  STATIC_SERVER: process.env.STATIC_SERVER,
};
