const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // define entry file and output
    mode: 'development',
    target: 'web',
    devtool: 'cheap-module-source-map', //source map lets us see original code in the browser when debugging
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    // define babel loader
    module: {
        rules: [
            { test: /\.jsx?$/, use: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpe?g|gif|ico)$/i, use: ['file-loader'] },
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
        new HtmlWebpackPlugin({
            //where to serve the html from
            template: './src/index.html',
            favicon: './src/favicon.ico'
        })
    ],
    node: {
        fs: 'empty'
    }
};
