const path = require("path");
const common = require("./webpack.config.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {merge} = require("webpack-merge");


module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
			},
		]
	},
	
	mode: "development",
	devtool: false,
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),	
		clean: true,
	},
	
	plugins: [
		new MiniCssExtractPlugin(
			{
				filename: "[name].[contenthash].css"
			}
		),
	],

});