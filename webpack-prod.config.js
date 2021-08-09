const { merge } = require('webpack-merge');
const common = require('./webpack-common.config.js');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use:
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                }
            }
        ],
    }
});