const path = require("path");

const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    port: 8000,
    hot: true,
    publicPath: "/",
    host: "localhost",
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/react"],
              cacheDirectory: true,
              plugins: ["react-hot-loader/babel"],
            },
          },
        ],
      },

      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
          "img-loader",
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        devServer: true,
      },
    }),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
