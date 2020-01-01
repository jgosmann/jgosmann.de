const path = require('path');

module.exports = {
  mode: 'production',
  output: {
    filename: 'bundle.js'
  },

  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        exclude: '/node_modules/'
      }, {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
};
