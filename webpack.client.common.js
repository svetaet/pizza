const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
	plugins: [new CleanWebpackPlugin()],
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: './cache/babel',
						},
					},
					{
						loader: 'eslint-loader',
						options: {
							fix: true,
							cache: './cache/eslint',
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|jpg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/client')],
	},
	stats: 'minimal',
}
