'use strict'
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);



module.exports = merge( baseWebpackConfig,{
	mode: "development",
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		open: false,
		contentBase: path.resolve(__dirname, '../src/'),
		hot: true,
		host: HOST,
    	port: PORT,
    	compress:true,

	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	
})