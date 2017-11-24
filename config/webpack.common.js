const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
var helpers = require('./helpers')

module.exports = {
  entry: {
    app: [
        'webpack-dev-server/client?http://localhost:8000', // live reload
        helpers.root('src/index.js'),
    ]    
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [
      helpers.root('node_modules'),
      helpers.root('bower_components')
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'polymer-webpack-loader' }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.ejs$/,
        use: 'html-loader',
        exclude: helpers.root('index.ejs')
      },
      {
        test: /\.scss$/,
        use: [
          'css-to-string-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: helpers.root('index.ejs'),
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: helpers.root('bower_components/webcomponentsjs/*.js'),
      to: 'bower_components/webcomponentsjs/[name].[ext]'
    }])
  ]
};