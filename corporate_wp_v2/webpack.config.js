const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Autoprefixer = require('autoprefixer');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


module.exports = {
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // watchモード
  watch: true,

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/js/main.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, '../assets/'),
    // 出力ファイル名
    filename: "js/main.js"
  },

  module: {
    rules: [
      // JS
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        // Babel を利用する
        loader: 'babel-loader',
        // testマッチ排除
        exclude: /node_modules/
      },

      // SASS取り込み設定
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // style-loaderの代わり
          {
            loader: 'css-loader',
            options: { url: true }
          },
          {
            // ベンダープレフィックス付与
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                Autoprefixer
              ]
            },
          },
          'sass-loader'
        ]
      },

      // 画像
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        include: [
          path.resolve(__dirname, '/img'),
        ],
        options: {
          limit: 2048,
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // ビルド時間短縮
    new HardSourceWebpackPlugin(),

    // css別ファイルに書き出し
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    })
  ]
};
