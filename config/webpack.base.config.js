const paths = require('./paths');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: paths.mainJs,
    output: {
        filename: 'bundle-[hash].js',
        path: paths.buildPath
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/,
                    to: path.join(__dirname, "../index.html")
                }
            ]
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.html,
            inject: true
        })
    ],
    devServer: {
        port: 3000
    },
}
