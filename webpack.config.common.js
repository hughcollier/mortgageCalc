const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	
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