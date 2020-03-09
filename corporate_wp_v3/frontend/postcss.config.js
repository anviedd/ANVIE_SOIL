module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')({
      browsers: [
        '> 5%',
        'last 2 versions',
      ]
    }),
    require('postcss-mixins'),
    require('postcss-utilities'),
    require('postcss-custom-properties'),
    require('postcss-custom-media'),
    require('postcss-nesting'),
    require('postcss-apply'),
    require('autoprefixer'),
    require('cssnano')
  ].filter(Boolean)
}
