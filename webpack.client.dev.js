const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.client.common.js')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	entry: { client: './src/client/client.tsx' },
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		contentBase: './dist/client',
		hot: true,
		publicPath: '/',
		historyApiFallback: true,
	},
	plugins: [
		new HtmlPlugin({
			favicon: 'src/client/favicon.png',
			title: 'DEV',
			template: 'src/template.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
})
