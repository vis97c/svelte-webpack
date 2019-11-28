const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
require('es6-promise').polyfill();

// const sass = require('node-sass');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
//webpack defaults
var config = {
	entry: {
		main: './src/js/app.js'
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte'),
			'_src': path.resolve(__dirname, 'src'),
			'_components': path.resolve(__dirname, 'src/js/components'),
			'_helpers': path.resolve(__dirname, 'src/js/helpers'),
			'_assets': path.resolve(__dirname, 'src/assets'),
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public_html',
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
		// chunkFilename: 'js/lazy/[name].boutique.js',
		// library: 'svelte-router-spa',
		// libraryTarget: 'umd',
		// umdNamedDefine: true,
		// globalObject: `(typeof self !== 'undefined' ? self : this)`
	},
	module: {
		rules: [
			// {
			// 	test: /svelte-router-spa/gi,
			// 	use: [{
			// 		loader: 'webpack-rollup-loader',
			// 		options: {
			// 			// OPTIONAL: any rollup options (except `entry`)
			// 			// e.g.
			// 			// external: [/* modules that shouldn't be rollup'd */]
			// 		},
			// 	}]
			// },
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				// include: [/svelte/],
				use: {
					loader: 'babel-loader'
				}
				// use: [
				// 	'rollup-loader',
				// 	'babel-loader',
				// ],
			},
			// {
			// 	test: /\.svelte$/,
			// 	use: {
			// 		loader: 'svelte-loader',
			// 		options: {
			// 			emitCss: true,
			// 			hotReload: true
			// 		}
			// 	}
			// },
			{
				test: /\.svelte$/,
				// exclude: /node_modules/,
				// use: [
				// 	'rollup-loader',
				// 	{
				// 		loader: 'svelte-loader',
				// 		options: {
				// 			// emitCss: true,
				// 			// hotReload: true,
				// 			// preprocess: require('svelte-preprocess'),
				// 			preprocess: require('svelte-preprocess')({
				// 				scss: true
				// 			})
				// 		},
				// 	},
				// ],
				use: [
					'babel-loader',
					{
						loader: 'svelte-loader',
						options: {
							// emitCss: true,
							hotReload: true,
							// preprocess: require('svelte-preprocess'),
							preprocess: require('svelte-preprocess')({
								scss: true
							})
							// preprocess: {
							// 	style: ({ content, attributes }) => {
							// 		if (attributes.type !== 'text/scss') return;

							// 		return new Promise((fulfil, reject) => {
							// 			sass.render({
							// 				data: content,
							// 				includePaths: ['src'],
							// 				sourceMap: true,
							// 				outFile: 'x' // this is necessary, but is ignored
							// 			}, (err, result) => {
							// 				if (err) return reject(err);

							// 				fulfil({
							// 					code: result.css.toString(),
							// 					map: result.map.toString()
							// 				});
							// 			});
							// 		});
							// 	}
							// }
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					// {
					// 	loader: prod ? MiniCssExtractPlugin.loader : 'style-loader',
					// 	options: {
					// 		// publicPath: 'src/scss/dist',
					// 		name: 'src/scss/dist/svelte.css',
					// 		// outputPath: 'src/scss/dist'
					// 	}
					// },
					'css-loader' + (!isProduction ? '?sourceMap' : ''),
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					// {
					// 	loader: prod ? MiniCssExtractPlugin.loader : 'style-loader',
					// 	options: {
					// 		// publicPath: 'public_html/css',
					// 		name: 'public_html/css/main.css',
					// 		// outputPath: 'public_html/css'
					// 	}
					// },
					// Translates CSS into CommonJS
					'css-loader' + (!isProduction ? '?sourceMap' : ''),
					// Compiles Sass to CSS
					'sass-loader' + (!isProduction ? '?sourceMap' : ''),
				],
			}
		]
	},
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'async',
	// 	}
	// },
	mode,
	devtool: isProduction ? false : 'source-map',
};
if (isProduction){
	//production only
	// config.module.rules.push()
	module.exports = Object.assign({}, config, {
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
				// chunkFilename: 'css/[name].[id].css',
			}),
			new CopyPlugin([
				{ from: 'src/to_public', to: '', dot: true },
				{ from: 'src/production_only', to: '', dot: true },
			]),
			new HtmlWebpackPlugin({
				filename: 'index.template',
				template: 'src/index.template.html',
				hash: true,
				minify: {
					removeComments: true,
					removeEmptyElements: false,
					// collapseWhitespace: true,
					// conservativeCollapse: true,
					// preserveLineBreaks: true,
					minifyCSS: {
						format: 'beautify'
					}
				}
			}),
			new HtmlBeautifyPlugin({
				config: {
					html: {
						end_with_newline: false,
						indent_size: 2,
						indent_with_tabs: true,
						indent_inner_html: true,
						preserve_newlines: false,
						// unformatted: ['p', 'i', 'b', 'span']
						js: {
							// indent_size: 2
						},
						css: {
							// indent_size: 2
						}
					}
				},
				// replace: [' type="text/javascript"']
			}),
		],
	});
} else {
	//dev only
	// config.module.rules.push()
	module.exports = Object.assign({}, config, {
		plugins: [
			new CopyPlugin([
				{ from: 'src/to_public', to: '', dot: true },
				{ from: 'src/dev_only', to: '', dot: true },
			]),
			new HtmlWebpackPlugin({
				filename: 'index.template',
				template: 'src/index.template.html',
				hash: true,
			}),
		],
		devServer: {
			port: 3000,
			hot: false,
			inline: true,
			contentBase: 'public_html',
			proxy: {
				'*': {
					target: 'http://sveldost.test/',
					secure: false,
					changeOrigin: true
				}
			},
			historyApiFallback: true,
			open: true,
		},
	});
}
