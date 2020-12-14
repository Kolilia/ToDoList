const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

module.exports = {
	devtool: "source-map",
	entry: ["./src/index.jsx"],
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "[name].js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.m?(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
					},
				],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	devServer: {
		index: "index.html",
		contentBase: path.join(__dirname, "./build/"),
		publicPath: "/",
		port: 8000,
		host: "localhost",
		historyApiFallback: {
			disableDotRule: true,
		},
		hot: true,
		hotOnly: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html",
		}),
	],
}
