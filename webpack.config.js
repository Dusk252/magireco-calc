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
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            //where to serve the html from
            template: './src/index.html'
        })
    ],
    node: {
        fs: 'empty'
    }
};
