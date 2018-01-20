const path = require('path');
const glob = require('glob');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { IgnorePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envConfig = require('./env.config');

module.exports = {
  assetPrefix: envConfig.ASSET_PREFIX,

  // disabling file-system routing
  useFileSystemPublicRoutes: false,

  webpack: (config) => {
    // analyzer tool
    if (envConfig.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      }));
    }

    // scss handling
    let scssLoaders = ['babel-loader', 'raw-loader', 'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: ['node_modules']
            .map(d => path.join(__dirname, d))
            .map(g => glob.sync(g))
            .reduce((a, c) => a.concat(c), []),
        },
      },
    ];

    if (envConfig.NODE_ENV !== 'dev') {
      scssLoaders = ExtractTextPlugin.extract({
        use: scssLoaders,
      });
    }

    config.module.rules.push(
      {
        test: /\.scss$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
    );

    config.plugins.push(
      // ignore test files
      new IgnorePlugin(/\.test\.js/),
      // clean up
      new CleanWebpackPlugin([
        path.join(__dirname, 'static', envConfig.VERSION_HASH),
      ]),
      // assets copying
      new CopyWebpackPlugin([
        // add more rules here if you have more folderes to copy
        {
          from: path.join(__dirname, 'assets', 'images'),
          to: path.join(__dirname, 'static', envConfig.VERSION_HASH, 'images'),
        },
        {
          from: path.join(__dirname, 'assets', 'locales'),
          to: path.join(__dirname, 'static', envConfig.VERSION_HASH, 'locales'),
        },
      ], {
        copyUnmodified: true,
      }),
      new ExtractTextPlugin(path.join('static', envConfig.VERSION_HASH, 'styles', 'bundle.css')),
    );

    return config;
  },
};
