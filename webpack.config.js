var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

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
					presets: ['react', 'es2015']
				}
			},
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
      },
      {
				test: /\.sass?$/, //translate and compile ES6 with JSX into ES5
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
			}
		]
	},
  plugins: [
    extractSass
  ],
  devServer: {
    hot: true,
    contentBase: './dist'
  }
};

module.exports = config;
