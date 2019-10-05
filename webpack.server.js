const path = require('path')
const WebpackNodeExternals = require('webpack-node-externals')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const common = require('./webpack.client.common.js')
const merge = require('webpack-merge')

module.exports = merge(common, {
	mode: 'production',
	devtool: 'eval-source-map',
	entry: './src/server/server.tsx',
	output: {
		path: path.resolve(__dirname, 'dist/server'),
		filename: 'server.js',
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: path.resolve(__dirname, 'bundle_size/report.server.html'),
			openAnalyzer: false,
			logLevel: 'silent',
		}),
	],
	target: 'node',
	externals: [WebpackNodeExternals()],
})
