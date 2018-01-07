const path = require('path');
const glob = require('glob');
const md5 = require('md5');
const dotenv = require('dotenv');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const analyze = process.env.ANALYZE;
const nodeEnv = process.env.NODE_ENV || 'development';
const pkg = require('./package.json');

const versionHash = md5(pkg.version);

dotenv.config({ path: '.env' });

// customize the rules based on what you want to configure
const stringReplacePlugin = StringReplacePlugin.replace({
  replacements: [
    {
      pattern: /\{versionHash\}/g, replacement: () => versionHash,
    },
    {
      pattern: /\{nodeEnv\}/g, replacement: () => nodeEnv,
    },
  ],
});

module.exports = {
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

    // config file handling
    config.module.rules.push({
      test: /configs\/config\.js$/,
      loader: stringReplacePlugin,
    });

    // scss handling
    let scssLoaders = ['babel-loader', 'raw-loader', 'postcss-loader',
      { loader: stringReplacePlugin },
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

    if (nodeEnv !== 'development') {
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
      // clean up
      new CleanWebpackPlugin([
        path.join(__dirname, 'static', versionHash),
      ]),
      // resources copying
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'resources', 'images'),
          to: path.join(__dirname, 'static', versionHash, 'images'),
        },
      ], {
        copyUnmodified: true,
      }),
      new ExtractTextPlugin(path.join(__dirname, 'static', versionHash, 'styles', 'bundle.css')),
      new StringReplacePlugin(),
    );

    return config;
  },
};
