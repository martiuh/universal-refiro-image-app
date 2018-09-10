const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const { vendor } = require('./config')
const dev = require('./client.dev')
const production = require('./client.prod')

const isProduction = process.env.NODE_ENV === 'production'

let webpackConfig = dev

if (isProduction) {
  webpackConfig = production
}

const baseConfig = {
  name: 'client',
  target: 'web',
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractCssChunks.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `!!raw-loader!${path.join(
        __dirname,
        '../server/template.ejs'
      )}`,
      filename: 'render.ejs',
      chunks: [], // No bootstrap.js nor main.js
      inject: true
    }),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: `[name].${isProduction ? '[chunkhash].' : ''}.js`,
      minChunks: Infinity
    })
  ]
}

module.exports = merge(baseConfig, webpackConfig)
