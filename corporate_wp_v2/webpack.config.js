const webpack = require('webpack');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Autoprefixer = require('autoprefixer');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// js圧縮
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
  return {
    // development に設定するとソースマップ有効でJSファイルが出力される

    mode: "production",

    // watchモード
    watch: true,

    //ビルドする対象
    context: path.resolve(__dirname, './src'),

    // メインとなるJavaScriptファイル（エントリーポイント）
    // entry: `./src/js/main.js`,

    entry: {
      app: './js/main.js'
    },

    // ファイルの出力設定
    // output: {
    //   //  出力ファイルのディレクトリ名
    //   path: path.resolve(__dirname, '../assets/'),
    //   // 出力ファイル名
    //   filename: "js/main.js"
    // },

    output: {
      path: path.resolve(__dirname, './assets'),
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
        // {
        //   // 拡張子 .js の場合
        //   test: /\.js$/,
        //   // Babel を利用する
        //   loader: 'babel-loader',
        //   // testマッチ排除
        //   exclude: /node_modules/
        // },

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
        // {
        //   test: /\.(sa|sc|c)ss$/,
        //   exclude: /node_modules/,
        //   use: [
        //     MiniCssExtractPlugin.loader, // style-loaderの代わり
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         url: true
        //       }
        //     },
        //     {
        //       // ベンダープレフィックス付与
        //       loader: 'postcss-loader',
        //       options: {
        //         sourceMap: true,
        //         plugins: [
        //           Autoprefixer
        //         ]
        //       },
        //     },
        //     'sass-loader'
        //   ]
        // },

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
        // {
        //   test: /\.(jpe?g|png|gif|svg|ico)$/i,
        //   loader: 'url-loader',
        //   include: [
        //     path.resolve(__dirname, '/img'),
        //   ],
        //   options: {
        //     limit: 2048,
        //     name: '[name].[ext]'
        //   }
        // }

        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader',
          include: [
            path.resolve(__dirname, './src/img'),
          ],
          options: {
            limit: 3000,
            name: '[name].[ext]'
          }
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
    },

    plugins: [
      // ビルド時間短縮
      new HardSourceWebpackPlugin(),

      // css別ファイルに書き出し
      new MiniCssExtractPlugin({
        filename: 'css/main.css',
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