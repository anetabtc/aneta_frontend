const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');


module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.js|\.jsx|\.tsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ]
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"]
        }),
    ],
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    experiments: {
        topLevelAwait: true
    },
    mode: 'development',

};