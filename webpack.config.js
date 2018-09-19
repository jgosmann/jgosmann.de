const path = require('path');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

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
    },

    plugins: [
        new WebappWebpackPlugin({
            logo: './assets/svg/favicon.svg',
            prefix: 'favicons',
            favicons: {
                appName: 'Jan Gosmann',
                developerName: 'Jan Gosmann',
                developerURL: 'https://jgosmann.de',
                start_url: '/',
                icons: {
                    appleStartup: false,
                    coast: false,
                    firefox: false,
                    yandex: false
                }
            }
        }),
        new class {
            apply(compiler) {
                compiler.hooks.make.tapAsync("A", (compilation, callback) => {
                    compilation.hooks.webappWebpackPluginBeforeEmit.tapAsync(
                            "B", (result, callback) => {
                        const fs = require('fs');
                        fs.writeFile(
                            "./static/favicons/meta.html", result.html,
                            (err) => {
                                if(err) {
                                    return console.log(err);
                                }
                            });
                        return callback(null, result);
                    });
                    return callback();
                });
            }
        }
    ]
};
