const path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "..", "server", "app", "assets", "javascripts"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/env", '@babel/react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  devtool: "source-map"
}