const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = 
{ 
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: './bundle.js',
        path: __dirname + '/public' 
},

    devServer: 
    {
        port: 80,
        contentBase: './public',
    },

    resolve:
    {
        extensions: [' ','.js','.jsx']
    },

    plugins:
    [
        new MiniCssExtractPlugin({filename:'styles.css'})
    ],
    
    optimization: 
    {
        minimizer: 
            [
                new OptimizeCssAssetsPlugin({})
            ]
    },

    module: 
    {
        rules:
        [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                use:
                [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    }
}