const webpack = require('webpack');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Autoprefixer = require('autoprefixer');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// js圧縮
const TerserPlugin = require('terser-webpack-plugin');

// 画像圧縮
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
// const ImageminPngquant = require('imagemin-pngquant');
// const ImageminGifsicle = require('imagemin-gifsicle');
// const ImageminSvgo = require('imagemin-svgo');

module.exports = env => {
  return {
    // development に設定するとソースマップ有効でJSファイルが出力される

    mode: "production",

    // watchモード
    watch: true,

    //ビルドする対象
    context: path.resolve(__dirname, './src'),

    entry: {
      app: './js/main.js'
    },

    output: {
      path: path.resolve(__dirname, '../assets'),
      publicPath: '/',
      filename: "js/main.js"
    },

    // 開発用サーバー
    devServer: {
      contentBase: path.resolve(__dirname, './src'),
    },

    // pathのaliasを設定
    resolve: {
      extensions: ['.js'],
      alias: {
        source: path.resolve(__dirname, './src'),
        images: path.resolve(__dirname, './src/img'),
      }
    },

    module: {
      rules: [
        // JS
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            // ここ最近はpreset-envを使うことが多い
            options: {
              presets: ['@babel/preset-env']
            }
          }]
        },

        // SASS取り込み設定
        {
          test: /\.scss$/,
          use: [
            env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                // minimize: true,
                // sourceMap: true,
                // colormin: false,
                // optionを書いていく
              }
            },
            // postCssは別ファイルで管理する
            'postcss-loader',
            'sass-loader',
          ],
        },

        // 画像
        {
          test: /\.(jpe?g|png|gif|svg|icon)$/i,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: function (path) {
              return '../img/' + path;
            }
          }
        }
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
    },

    plugins: [
      // ビルド時間短縮
      new HardSourceWebpackPlugin(),

      // css別ファイルに書き出し
      new MiniCssExtractPlugin({
        filename: 'css/main.css',
      }),

      // ディレクトリコピー
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/img/'),
        to: path.resolve(__dirname, '../assets/img/')
      }]),

      // 画像圧縮
      new ImageminPlugin({
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        pngquant: {
          quality: '65-80'
        },
        gifsicle: {
          interlaced: false,
          optimizationLevel: 1,
          colors: 256
        },
        svgo: {
        },
        plugins: [
          ImageminMozjpeg({
            quality: 85,
            progressive: true
          })
        ]
      }),

      // jquery使うなら
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      }),
    ]
  }
};