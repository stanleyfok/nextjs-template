const path = require('path');
const glob = require('glob');
const md5 = require('md5');
const fs = require('fs');
const dotenv = require('dotenv');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { IgnorePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pkg = require('./package.json');

const analyze = process.env.ANALYZE;
const nodeEnv = process.env.NODE_ENV || 'dev';
const versionHash = md5(pkg.version);

// load dotenv if file exists
if (fs.existsSync('./.env')) {
  dotenv.config();
}

module.exports = {
  assetPrefix: process.env.ASSET_PREFIX,

  // disabling file-system routing
  useFileSystemPublicRoutes: false,

  webpack: (config) => {
    // analyzer tool
    if (analyze) {
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
          includePaths: ['styles', 'node_modules']
            .map(d => path.join(__dirname, d))
            .map(g => glob.sync(g))
            .reduce((a, c) => a.concat(c), []),
        },
      },
    ];

    if (nodeEnv !== 'dev') {
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
        path.join(__dirname, 'static', versionHash),
      ]),
      // assets copying
      new CopyWebpackPlugin([
        // add more rules here if you have more folderes to copy
        {
          from: path.join(__dirname, 'assets', 'images'),
          to: path.join(__dirname, 'static', versionHash, 'images'),
        },
      ], {
        copyUnmodified: true,
      }),
      new ExtractTextPlugin(path.join(__dirname, 'static', versionHash, 'styles', 'bundle.css')),
    );

    return config;
  },
};
