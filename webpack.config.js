const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.[contenthash].js'
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
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      map: (fd) => {
        if (/.js$/.test(fd.name)) {
          outPath = path.resolve(__dirname, 'layouts/partials/', 'script.' + fd.name + '.html');
          fs.writeFileSync(outPath, `<script src="{{ "/js/${fd.path}" | relURL }}" defer></script>`);
        }
        return fd;
      },
      fileName: 'webpack-manifest.json'
    })
  ]
};
