const path = require('path');

module.exports = {
    mode: 'production',
    entry: './assets/ts/main.ts',
    mode: 'development',
    output: {
        path: path.resolve('./static'),
        filename: 'js/bundle.js'
    },

    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: '/node_modules/'
            }, {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};
