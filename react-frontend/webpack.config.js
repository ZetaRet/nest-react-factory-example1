const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	mode: "development",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../public_html/dist"),
		publicPath: "/",
	},
	plugins: [
		
	],
	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "../public_html"),
		},
		port: 3300,
	},
};
