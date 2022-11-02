const path = require("path");
const common = require("./webpack.config.common");
const {merge} = require("webpack-merge");

module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		]
	},
	
	mode: "development",
	devtool: "source-map",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),	
	},
	
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		compress: true,
		port: 1234,
		hot: true,
		open: true,
	}
});