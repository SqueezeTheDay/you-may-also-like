const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]

  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'you-may-bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
