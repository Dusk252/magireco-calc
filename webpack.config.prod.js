const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        // define entry file and output
        mode: 'production',
        target: 'web',
        devtool: 'source-map', //source map lets us see original code in the browser when debugging
        entry: './src/index.js',
        output: {
            path: path.resolve('dist'),
            filename: 'main.js',
            chunkFilename: '[name].js',
            publicPath: '/'
        },
        // define babel loader
        module: {
            rules: [
                { test: /\.jsx?$/, use: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                { test: /\.(png|jpe?g|gif)$/i, use: ['file-loader'] },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'react-svg-loader',
                            options: {
                                jsx: true // true outputs JSX tags
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true
        },
        plugins: [
            new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico',
                minify: {
                    // see https://github.com/kangax/html-minifier#options-quick-reference
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: false,
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: /node_modules/
                    }
                }
            }
        }
    };
};
