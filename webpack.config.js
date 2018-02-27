const path = require('path')

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-maps',
  module: {
    rules: [{
      test: /js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
}
