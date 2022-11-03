const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",

	module: {
		rules: [
			{
				test: /\.(png|svg|jpeg|jpg|gif|webp)$/i,
				type: "asset/resource",
			},
		]
	},
	
	output: {
		assetModuleFilename: "[name][ext]",
	},
		
	plugins: [
		new HtmlWebpackPlugin(
			{
				filename: "index.html",
				title: "Mortgage Overpayment Calculator",
				template: "./src/template.html",
			}
		),
	]
	
};