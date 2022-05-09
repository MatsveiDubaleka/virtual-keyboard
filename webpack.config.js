const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        index: './index.js',
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [new HTMLWebpackPlugin({
        template: "./index.html"
    }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [// Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",]
            }
        ]
    }
}