const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.client.common.js')
const WorkboxPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	entry: { client: './src/client/client.tsx' },
	mode: 'production',
	// mode: 'development',
	// devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, 'dist/client'),
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
		new CompressionPlugin({
			cache: './cache/compression',
			deleteOriginalAssets: true,
			// compressionOptions: { level: 1 },
			// minRatio: 0.6,
		}),
		new HtmlPlugin({
			favicon: 'src/client/favicon.png',
			filename: '../template.html',
			title: 'SSR PRESET',
			template: 'src/template.html',
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
