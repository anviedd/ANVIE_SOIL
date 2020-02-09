const webpack = require('webpack');
const path = require('path');
const globule = require('globule');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const directory = {
  src: path.join(__dirname, './src/'),
  public: path.join(__dirname, 'public')
};
const converts = {
  pug: 'html',
  scss: 'css',
  js: 'js'
};
const mode = 'production';
const ENTRYPOINT = {
  html: {},
  css: {},
  js: {}
};

Object.keys(converts).forEach(convert => {
  const TO = converts[convert];
  globule.find([`**/*.${convert}`, `!**/_*.${convert}`], {
    cwd: directory['src']
  }).forEach(filename => {
    let _output = filename.replace(new RegExp(`.${convert}$`, 'i'), `.${TO}`);
    let _source = path.join(directory['src'], filename);
    if (_output.indexOf('html/') !== -1) {
      _output = _output.replace('html/', '');
      ENTRYPOINT['html'][_output] = _source;
    }
    if (_output.indexOf('css/') !== -1) {
      _output = _output.replace('css/', 'css/');
      ENTRYPOINT['css'][_output] = _source;
    }
    if (_output.indexOf('js/') !== -1) {
      _output = _output.replace('js/', 'js/');
      ENTRYPOINT['js'][_output] = _source;
    }
  });
});

// js
const jsLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env']
  }
}
const jsConfig = {
  mode: mode,
  entry: ENTRYPOINT['js'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: directory['public']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules(?!\/webpack-dev-server)/,
      use: jsLoader
    }]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.json', '.js', 'svg', '.scss'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/assets/images/'),
      to: path.resolve(__dirname, 'public/assets/images/'),
    }, ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100',
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  cache: true
};

// css
const scssLoader = {
  use: [{
      loader: 'css-loader',
      options: {
        url: false
      }
    },
    'csscomb-loader',
    {
      loader: 'postcss-loader'
    },
    {
      loader: 'sass-loader'
    }
  ]
};
const stylusConfig = {
  mode: mode,
  entry: ENTRYPOINT['css'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: directory['public']
  },
  module: {
    rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(scssLoader)
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
      }, {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }, ],
      }, {
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
      new OptimizeCSSAssetsPlugin()
    ],
  },
  plugins: [new ExtractTextPlugin('[name]')],
  cache: true
};

// pug
const pagelist = require('./pug.config.js');

function getPageListData() {
  let _data = {};
  for (let i = 0; i < pagelist.data.length; i++) {
    _data[pagelist.data[i]['name']] = pagelist.data[i];
  }
  return _data;
}
const pugLoader = {
  use: [
    'html-loader',
    {
      loader: 'pug-html-loader',
      options: {
        pretty: true,
        data: {
          pagelist: getPageListData()
        }
      }
    }
  ]
};
const pugConfig = {
  mode: mode,
  entry: ENTRYPOINT['html'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: directory['public']
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: ExtractTextPlugin.extract(pugLoader)
    }]
  },
  plugins: [new ExtractTextPlugin('[name]')],
  cache: true

};

const config = [stylusConfig, jsConfig, pugConfig]
module.exports = config