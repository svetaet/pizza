const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.client.common.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WorkboxPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	entry: { client: './src/client/client.tsx' },
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist/bundle'),
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
		publicPath: '/',
	},
	plugins: [
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/client/sw-template.js',
			swDest: 'service-worker.js',
			include: [/\.js$/, /\.png$/],
		}),
		new webpack.HashedModuleIdsPlugin(),
		new HtmlPlugin({
			favicon: 'src/client/favicon.png',
			filename: '200.html',
			title: 'SSR PRESET',
			template: 'src/template.html',
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: path.resolve(__dirname, 'bundle_size/report.bundle.html'),
			openAnalyzer: false,
			logLevel: 'silent',
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: './cache/terser',
				parallel: true,
			}),
		],
		usedExports: true,
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
})
