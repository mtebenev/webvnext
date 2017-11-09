const path = require('path');

module.exports = {
  entry: './Scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'wwwroot/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }

    ]
  }
};
