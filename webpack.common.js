'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        jupiter: [
            './app/index.js',
            'react',
            'react-dom',
            'lodash'
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [path.join(__dirname, 'app'), path.join(__dirname, 'lib')],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.json$/,
                include: [path.resolve(__dirname, 'i18n/')],
                use: ['./lib/i18n/smartlingJsonLoader.js'],
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /^helix-ui\.css$/,
            __dirname + '/node_modules/helix-ui/dist/styles/helix-ui.min.css'
        ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/index.html',
            hash: true,
            inject: true,
            chunks: ['jupiter']
        }),
        // Copy Webcomponents pollyfills to /build/ which will be accessible via /assets/ on server.
        new CopyWebpackPlugin([
            // Automatic hashing of directories is not supported by CopyWebpackPlugin,
            // Hashing of files breaks the webcomponent-loader, because is expecting polyfills to have certain names
            // The solution is to manually update the 'to' folder name, when package.json webcomponent version is increased.
            // When upgrading please search the code base an update all related references.
            { from: 'node_modules/@webcomponents/webcomponentsjs/', to: './assets/webcomponents-2.2.6/' },
            { from : '/node_modules/helix-ui/dist/css/helix-ui.min.css', to: './assets/helix-ui.css'}
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id][hash].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
