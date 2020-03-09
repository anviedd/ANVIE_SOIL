const webpack = require('webpack');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

const CopyWebpackPlugin = require("copy-webpack-plugin");

const DIR = {
  src: './src',
  public: '../assets',
  images: './src/images',
};

module.exports = env => {
  return {
    mode: "production",
    context: path.resolve(__dirname, DIR.src),
    entry: {
      app: './js/main.js'
    },
    output: {
      path: path.resolve(__dirname, DIR.public),
      publicPath: '/',
      filename: "js/main.js"
    },
    devServer: {
      contentBase: path.resolve(__dirname, DIR.src),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        source: path.resolve(__dirname, DIR.src),
        images: path.resolve(__dirname, DIR.images),
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
          test: /\.scss$/,
          use: [
            env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader?limit=10000&name=assets/[name].[ext]',
        }, {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader?limit=10000&name=assets/[name].[ext]'
        }, {
          test: /\.(mp4)(\?.*)?$/,
          loader: 'url-loader?limit=10000&name=assets/[name].[ext]'
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
            filename: '../assets/js/vendor.bundle.js',
            chunks: 'all',
            test: /node_modules/
          }
        }
      }
    },

    plugins: [
      new HardSourceWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/main.css',
      }),
      new CopyWebpackPlugin([{
          from: path.resolve(__dirname, 'src/images/'),
          to: path.resolve(__dirname, '../assets/images/')
        },
        {
          from: path.resolve(__dirname, 'static/'),
          to: path.resolve(__dirname, '../assets/static/'),
        }
      ]),

      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        jpegtran: {
          quality: '80',
        },
        pngquant: {
          quality: '65-80',
        },
        gifsicle: {
          interlaced: false,
          optimizationLevel: 3,
          colors: 100
        },
        svgo: {
          quality: '80',
        },
        plugins: [
          ImageminMozjpeg({
            quality: 80
          }),
          imageminPngquant({
            quality: [0.65, 0.8]
          }),
          imageminGifsicle({
            interlaced: false,
            optimizationLevel: 3,
            colors: 100
          }),
          imageminSvgo()
        ]
      }),

      // jquery使うなら
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      }),
      new WebpackNotifierPlugin({
        title: 'project'
      })
    ]
  }
};
