var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

const config = {
	context: __dirname, //current folder as the reference to the other paths
	entry: './game.js',
	output: {
		path: path.resolve(__dirname, 'dist'), //where the compiled JavaScript file should be saved
    filename: './game.js' //name of the compiled JavaScript file
	},
	module: {
		loaders: [
			{
				test: /\.js?$/, //translate and compile ES6 with JSX into ES5
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: { //query configuration passed to the loader
					presets: ['react', 'es2015', 'react-hmre']
				}
			}
		]
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin() //generate hot update chunks
  ],
  devServer: {
    hot: true,
    contentBase: './dist'
  }
};

module.exports = config;
