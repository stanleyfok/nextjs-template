const env = require('./env.config.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['transform-define', env],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          actions: './redux/actions',
          assets: './assets',
          components: './components',
          configs: './configs',
          lib: './lib',
          reducers: './redux/reducers',
        },
      },
    ],
  ],
  ignore: [],
};
