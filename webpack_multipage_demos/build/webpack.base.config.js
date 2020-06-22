'use strict'

const fs = require('fs'); 
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 是否是测试环境  NODE_DEV 4.2之后不再赋值
const devMode = process.env.WEBPACK_DEV_SERVER == "true";
console.log(devMode, 'devMode')

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

const pageEntry = {};
const pageHtml = [];
const templateRoot = path.resolve(__dirname, '../src/pages');

// @params getName 是否返回文件名字数组
const getEntries = (getName) => {
    let result = fs.readdirSync(path.resolve(__dirname, '../src/js'));
    let entry = {};
    let nameArr = [];

    result.forEach(item => {
        nameArr.push(item.replace(/\.js/,''));
        entry[(item.replace(/\.js/g, ''))] = path.resolve(__dirname, `../src/js/${item}`);
    });

    if(getName) {
      return nameArr;
    }
    return entry;
}

const jsFile = getEntries(true);
const pages = fs.readdirSync(templateRoot);

pages.forEach((name, index) => {
  const enterPath = path.join(templateRoot);
  const names = name.replace(/\.html/gi, '');
  const hasNameJS = jsFile.indexOf(names) !== -1 ?  true : false;

  // 输出页面模板
  pageHtml.push(new HtmlWebpackPlugin({
    filename: devMode ? `${name}` : `/pages/${name}`, // 根据环境打包后的文件名
    template: `${enterPath}/${name}`, //打包html模版的路径和文件名称
    inject: true,
    minify: false,
    chunks: ['common', hasNameJS ? names : ''], // 打包后引入对应的js
    chunksSortMode: 'manual',
  }))

  
})

module.exports = {
	entry: getEntries(),
	output: {
		filename: 'js/[name].js',
		publicPath: devMode ? '' : './',
		path: resolve('/dist'),
		chunkFilename: 'js/[name].js',
	},
	resolve: {
    extensions: ["*",".js", ".html", '.css', 'scss']
  },
	module: {
    rules: [
      {
        test: /\.(woff2?|eot|ttf|otf|svg|woff)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test:/\.css/,
        include: path.resolve(__dirname, '../src/'),
        loader:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.scss$/, // 针对 .scss 或者 .css 后缀的文件设置 loader
        include: path.resolve(__dirname, '../src/'),
        use: [
          devMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //hmr: process.env.NODE_ENV === 'development',
              publicPath:  '/'
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)/,
        loader: 'url-loader',
        options: {
          limit: 5 * 1024,
          publicPath: '../images/',
          outputPath: '/images',
          name: `[name].[ext]`
        }
      }, {
        test: /\.(htm|html)$/i,
        loader: 'html-loader?minimize=false',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
    ],
	},
	plugins: [
		new ManifestPlugin(),
		new  MiniCssExtractPlugin({
      filename: '[name].css' ,
      chunkFilename: '/css/[name].css',
    }),
    new webpack.ProvidePlugin({
       $:"jquery",
       jQuery:"jquery",
       "window.jQuery":"jquery"
    })
	].concat(pageHtml),
}