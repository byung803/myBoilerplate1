const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        mode: 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin('style.css')
        ],
        devtool: isProduction ? 'source-map' : 'cheap-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
}