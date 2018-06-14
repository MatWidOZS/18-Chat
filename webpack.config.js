const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

let env = process.env.NODE_ENV || 'development';
const plugins = [new HtmlWebpackPlugin({
				template: 'src/index.html',
				filename: 'index.html',
				inject: 'body'
			})];

if (env === 'production') {
	plugins.push(
		new OptimizeJsPlugin({
			sourceMap: false
		})
	)
}

//webpack.config.js
module.exports = (env) => {
	return {
		entry: (env !== 'production' ? [
	        'react-hot-loader/patch',
	        'webpack-dev-server/client?http://localhost:8080',
	        'webpack/hot/only-dev-server',
	    ] : []).concat(['./client/index.js']),
		output: {
			path: path.resolve(__dirname, 'public'),
			filename: './bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
					}
				},
				{
					test: /\.css$/,
					use: [
						{ loader: 'style-loader'},
						{
							loader: 'css-loader',
							options: {
								modules: true
							}
						}
					]
				}
			]
		},
		plugins
	}
};