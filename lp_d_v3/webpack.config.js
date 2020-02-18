const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const utils = require('./viewutils')
const plugins = require('./postcss.config');

const DIR = {
  src: './src',
  public: './public',
  images: './src/assets/images',
  fonts: './src/assets/fonts',
  static: './static/',
};

module.exports = env => {
  return {
    context: path.resolve(__dirname, DIR.src),
    entry: {
      app: './app.js'
    },
    output: {
      path: path.resolve(__dirname, DIR.public),
      publicPath: '/',
      filename: 'assets/js/[name].[hash:7].bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, DIR.src),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        source: path.resolve(__dirname, DIR.src),
        images: path.resolve(__dirname, DIR.images),
        fonts: path.resolve(__dirname, DIR.fonts),
      }
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }]
        },
        {
          test: /\.css$/,
          use: [
            env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: true,
                colormin: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true,
                sourceMap: true,
                colormin: false
              }
            },
            'csscomb-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.pug$/,
          use: [{
            loader: 'pug-loader'
          }]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader',
          include: [
            path.resolve(__dirname, DIR.images),
          ],
          options: {
            limit: 3000,
            name: 'assets/images/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'assets/fonts/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/videos/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          }, ],
        },
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            filename: 'assets/js/vendor.[hash:7].bundle.js',
            chunks: 'all',
            test: /node_modules/
          }
        }
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, DIR.static),
        to: path.resolve(__dirname, 'public/static/'),
      }]),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash:7].bundle.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'views/index.pug',
        inject: true
      }),
      ...utils.pages(env),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      }),
      new WebpackNotifierPlugin({
        title: 'Your project'
      })
    ]
  }
};
