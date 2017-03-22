"use strict";

const webpack = require('webpack');

const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: ['babel-polyfill', PATHS.src],
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	module: {
    rules: [
      loaders.babel,
      loaders.css,
      loaders.eslint(PATHS.src)
    ]
  },
	resolve: {
    alias: {
      components: PATHS.components
    },
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval-source-map',
  devServer:{
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: process.env.host,
    port: process.env.port,
    contentBase: './dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multistep: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html'
    })
  ]
};

module.exports = config;
