"use strict";

const PATHS = require('./webpack-paths');

exports.css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  include: PATHS.css
}

exports.babel = {
  test: /\.jsx?$/,
  use: ['babel-loader'],
  exclude: /node_modules/
};

exports.eslint = (path) => {
  return {
    test: /\.jsx?$/,
    loaders: ['eslint-loader'],
    enforce: 'pre',
    include: path
  };
};
