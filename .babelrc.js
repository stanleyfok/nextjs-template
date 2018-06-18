const alias = require('./alias');
const env = require('./env.config.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [['transform-define', env], ['module-resolver', alias]],
  ignore: [],
};
