var webpackMerge = require('webpack-merge')
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers')

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: helpers.root('dist'),
    hot: true,
    port: 8000,
  },
  output: {
    filename: '[name].js',
    path: helpers.root('dist'),
  }
})