var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './math_helpers.js',
    './vector2d.js',
    './color.js',
    './topiary.js'
  ],
  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      library: 'Topiary',
      libraryTarget: 'umd',
      umdNamedDefine: true
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin()
  ],
  stats: {
      // Nice colored output
      colors: true
  },
  debug: true,
};