module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')({
      browsers: [
        '> 5%',
        'last 2 versions',
      ]
    }),
    require('autoprefixer'),
  ].filter(Boolean)
}
