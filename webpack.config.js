const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: "./src/index.js",
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),	
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				filename: "index.html",
				title: "Mortgage Overpayment Calculator",
				template: "./src/index.html",
				
			}
		)
	]
	
};