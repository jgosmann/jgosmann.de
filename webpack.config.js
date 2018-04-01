const path = require('path');

module.exports = {
    mode: 'production',
    entry: './assets/js/main.js',
    output: {
        path: path.resolve('./static'),
        filename: 'js/main.js'
    },
};
