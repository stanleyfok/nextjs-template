const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoPrefixer = require('autoprefixer');

const envConfig = require('./env.config');

module.exports = {
  assetPrefix: envConfig.ASSET_PREFIX,

  // disabling file-system routing
  useFileSystemPublicRoutes: false,

  webpack: (config, { dev, isServer }) => {
    // analyzer tool
    if (envConfig.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true,
      }));
    }

    // polyfills
    const originalEntry = config.entry;
    // eslint-disable-next-line no-param-reassign
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift('core-js/fn/object/assign');
        entries['main.js'].unshift('core-js/fn/array/includes');
      }

      return entries;
    };

    config.module.rules.push({
      test: /\.(scss|png|jpg|svg|ico)$/,
      use: [
        {
          loader: 'emit-file-loader',
          options: {
            name: './[path][name].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(jpg|png)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: dev
              ? `/static/${envConfig.VERSION_HASH}/webpack/[name]-[hash].[ext]`
              : `/static/${envConfig.VERSION_HASH}/webpack/[hash].[ext]`,
            outputPath: dev ? path.join(__dirname, '/') : undefined,
            publicPath: url => url,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(svg|mp4|ico)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: dev
              ? `/static/${envConfig.VERSION_HASH}/webpack/[name]-[hash].[ext]`
              : `/static/${envConfig.VERSION_HASH}/webpack/[hash].[ext]`,
            outputPath: dev ? path.join(__dirname, '/') : undefined,
            publicPath: url => url,
          },
        },
      ],
    });

    // scss handling
    config.module.rules.push({
      test: /\.scss$/,
      use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
        use: [
          'babel-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: !dev,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoPrefixer({
                  /* options */
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      })),
    });

    config.plugins.push(
      new CopyWebpackPlugin(
        [
          {
            // locales copying
            from: path.join(__dirname, 'assets', 'locales'),
            to: path.join(__dirname, 'static', envConfig.VERSION_HASH, 'locales'),
          },
        ],
        {
          copyUnmodified: true,
        },
      ),
      new ExtractTextPlugin({
        filename: path.join(
          dev ? __dirname : '.',
          'static',
          envConfig.VERSION_HASH,
          'styles',
          'main.css',
        ),
      }),
    );

    return config;
  },
};
