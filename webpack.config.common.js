const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",

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
				template: "./src/template.html",
				
			}
		)
	]
	
};