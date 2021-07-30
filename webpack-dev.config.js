const { resolve } = require('path');
const HTMLwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [resolve(__dirname, 'src', 'index.ts')],
    output: {
        path: resolve(__dirname, 'public'),
        filename: () => {
            return process.env.NODE_ENV === 'development' ? 'bundle.js' : 'bundle.[contenthash].js';
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        port: 8080,
        hot: true,
        inline: true,
        open: false,
        contentBase: resolve(__dirname, 'public'),
        proxy: {
            '/api': {
                target: 'http://localhost:3030',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true
            }
        }
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use:
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig-dev.json'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.ogg|mp3|wav|mpe?g|png|jpe?g|gif|svg$/i,
                loader: 'file-loader',
                options: {
                    name() {
                        if (process.env.NODE_ENV === 'development') {
                            return 'img/[name].[ext]';
                        }
                        return '[contenthash].[ext]';
                    }
                }
            }
        ]
    },
    plugins: [
        new HTMLwebpackPlugin({
            template: resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: () => {
                return process.env.NODE_ENV === 'development' ? 'style.css' : 'style.[contenthash].css';
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: resolve(__dirname, 'src', 'img'),
                    to: './img',
                },
            ],
        }),
        new CleanWebpackPlugin()
    ]
}