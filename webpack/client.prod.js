const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { vendor, uglifyOpts } = require('./config')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, '../polyfills.js'),
    path.resolve(__dirname, '../src/index.js')
  ],
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new StatsPlugin('stats.json'),
    new ExtractCssChunks(),
    new webpack.optimize.UglifyJsPlugin(uglifyOpts),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      inject: true,
      filename: '[name].[hash].js',
      entry: {
        vendor
      },
      plugins: [
        // new BundleAnalyzerPlugin({ analyzerPort: 8889 }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin(uglifyOpts)
      ]
    })
  ]
}
