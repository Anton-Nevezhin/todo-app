
const path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'server', 'public')
  },
   devtool: 'cheap-eval-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: /js/,
        use: 'babel-loader'
      }
    ]
  }
};