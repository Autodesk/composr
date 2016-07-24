const webpack = require('webpack');
const path = require('path');
const appPath = path.join(__dirname, 'app');
const distPath = path.join(__dirname, 'dist');
const exclude = /node_modules/;
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const credentials = JSON.parse(require('fs').readFileSync('./config/credentials.json', 'utf8'));

const config = {
    context: appPath,

    entry: {
        app: './app.js',
        vendor: ['react', 'react-dom']
    },

    output: {
        path: distPath,
        publicPath: '/',
        filename: 'bundle.[hash].js'
    },

    plugins: [

        // Generate index.html with included script tags
        new HtmlPlugin({
            inject: 'body',
            template: 'app/index.html'
        }),

        // Remove all files in dist before creating a production package
        new CleanPlugin(['dist']),

        // Do not output to dist if there are errors in webpack
        // new webpack.NoErrorsPlugin(),

        new webpack.DefinePlugin({
            $_ENVIRONMENT: JSON.stringify(process.env.NODE_ENV)
        }),

        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName: */ 'vendor',
            /* filename: */ 'vendor.[hash].js'
        ),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin(
            {
                minimize: true,
                compress: {
                    warnings: false
                },
                sourceMap: false,
                mangle: false
            }
        ),

        new S3Plugin({
          // Only upload css and js
          directory: 'dist',
          // s3Options are required
          s3Options: {
            accessKeyId: credentials.AWS_ACCESS_KEY_ID,
            secretAccessKey: credentials.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-1'
          },
          s3UploadOptions: {
            Bucket: 'dev.hellofears.com'
          }
        })
    ],

    module: {
        loaders: [
            {
                test: require.resolve('react'),
                loader: 'expose?React'
            },
            {
                test: /.jsx?$/,
                exclude: exclude,
                loader: 'babel'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css?root=' + appPath]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: exclude,
                loader: 'url?limit=1000&name=assets/images/[hash].[ext]'
            }
        ]
    },

    devServer: {
        contentBase: './app',
        colors: true,
        noInfo: true,
        historyApiFallback: true
    },

    resolve: {
        root: [
            path.resolve('./app'),
            path.resolve('./app/components'),
            path.resolve('./app/redux'),
            path.resolve('./app/assets')
        ],
        alias: {
            config: path.join(__dirname, 'config', process.env.NODE_ENV)
        }
    }
};

module.exports = config;
