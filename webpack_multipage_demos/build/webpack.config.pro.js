const merge = require("webpack-merge");
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require( "optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    //devtool: 'cheap-source-map',
    optimization: {
        runtimeChunk: {
          name: 'manifest'
        },
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ],
        /*splitChunks: {
            chunks: "all",
        }*/
    },
    output: {
        publicPath: '../',
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
});