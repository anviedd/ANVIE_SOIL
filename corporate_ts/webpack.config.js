const webpack = require('webpack');
const path = require('path');
const globule = require('globule');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dir = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public')
};
const convertExtensions = {
  pug: 'html',
  scss: 'css',
  ts: 'js'
};
const mode = 'production'; //development:開発, production:本番
const entry = {
  pug: {},
  scss: {},
  ts: {}
};
const pagelist = require('./pug.config.js');

Object.keys(convertExtensions).forEach(from => {
  const to = convertExtensions[from];
  globule.find([`**/*.${from}`, `!**/_*.${from}`], { cwd: dir['src'] }).forEach(filename => {
    let _output = filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`);
    let _source = path.join(dir['src'], filename);
    if (_output.indexOf('pug/') !== -1) {
      _output = _output.replace('pug/', '');
      entry['pug'][_output] = _source;
    }
    if (_output.indexOf('scss/') !== -1) {
      _output = _output.replace('scss/', 'css/');
      entry['scss'][_output] = _source;
    }
    if (_output.indexOf('ts/') !== -1) {
      _output = _output.replace('ts/', 'js/');
      entry['ts'][_output] = _source;
    }
  });
});

function getPageListData() {
  let _data = {};
  for (let i = 0; i < pagelist.data.length; i++) {
    _data[pagelist.data[i]['name']] = pagelist.data[i];
  }
  return _data;
}

const scssLoader = {
  use: [
    {
      loader: 'css-loader',
      options: {
        url: false //ファイルパスの解決
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

const tsLoader = ['ts-loader', 'tslint-loader'];

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

const scssConfig = {
  mode: mode,
  entry: entry['scss'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: dir['public']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(scssLoader)
      }
    ]
  },
  plugins: [new ExtractTextPlugin('[name]')],
  cache: true
};

const tsConfig = {
  mode: mode,
  entry: entry['ts'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: dir['public']
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: tsLoader
      }
    ]
  },
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
  cache: true
};

const pugConfig = {
  mode: mode,
  entry: entry['pug'],
  output: {
    filename: '[name]',
    publicPath: '/',
    path: dir['public']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ExtractTextPlugin.extract(pugLoader)
      }
    ]
  },
  plugins: [new ExtractTextPlugin('[name]')],
  cache: true
};

module.exports = [scssConfig, tsConfig, pugConfig];
