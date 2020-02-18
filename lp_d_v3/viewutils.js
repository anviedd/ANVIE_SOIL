exports.pages = function (env = '') {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const fs = require('fs')
  const PATH = require('path')
  const viewsFolder = PATH.resolve(__dirname, `./src/views/`)

  let pages = []

  fs.readdirSync(viewsFolder).forEach(view => {
    if (view.split('.')[1] === undefined)
      return false;

    const VIEW_NAME = view.split('.')[0];
    const FILE_NAME = `${VIEW_NAME}.html`
    const options = {
      filename: FILE_NAME,
      template: `views/${view}`,
      inject: true
    };

    if (env === 'development') {
      options.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
    }

    pages.push(new HtmlWebpackPlugin(options));
  })

  return pages;
}
