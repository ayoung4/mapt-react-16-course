var path = require('path');
var nodeExternals = require('webpack-node-externals');
var awt = require('awesome-typescript-loader');

var typescriptLoader = {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader'
};

module.exports = [
    {
        entry: './src/index.ts',
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: [nodeExternals()],
        resolve: {
            extensions: ['.ts'],
            plugins: [new awt.TsConfigPathsPlugin()],
        },
        module: {
            loaders: [typescriptLoader]
        },
        output: {
            filename: './main.js',
            path: path.resolve(__dirname)
        }
    },
];