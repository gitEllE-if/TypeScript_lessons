const { merge } = require('webpack-merge');
const common = require('./webpack-common.config.js');

module.exports = merge(common, {
    mode: 'production',
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
        ],
    }
});