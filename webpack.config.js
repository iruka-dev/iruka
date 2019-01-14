const path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'main-bundled.js',
  },
  module: {
    rules: [{
      test: /\.hbs$/,
      use: [{
        loader: 'handlebars-loader',
        options: {
          helperDirs: path.resolve(__dirname, './js/helpers'),
        },
      }],
    },
    ],
  },
};
