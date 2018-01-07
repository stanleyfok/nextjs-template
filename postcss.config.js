const postcssEasyImport = require('postcss-easy-import');
const autoPrefixer = require('autoprefixer');
const cssNano = require('cssnano');

module.exports = {
  plugins: [
    postcssEasyImport({ prefix: '_' }), // keep this first
    autoPrefixer({ /* ...options */ }), // so imports are auto-prefixed too
    cssNano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    }),
  ],
};
