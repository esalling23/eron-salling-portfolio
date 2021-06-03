const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	context: __dirname,
	entry: './src/index',
	output: {
		path: path.resolve('./assets/webpack_bundles/'),
		publicPath: '/static/webpack_bundles/',
		filename: '[name]-[fullhash].js',
	},
	plugins: [new BundleTracker({ filename: './webpack-stats.json' })],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
}
