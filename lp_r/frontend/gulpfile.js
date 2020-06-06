// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

// scss
gulp.task("sass", function () {
  return (
    gulp
      // 読み出したいファイルを指定
      .src("src/css/main.scss")
      // おこないたい処理
      .pipe(sass().on("error", sass.logError))
      // ベンダープレフィックス自動付与
      .pipe(autoprefixer())
      // 圧縮
      .pipe(cleanCSS())
      // 出力先
      .pipe(gulp.dest("../assets/css"))
  )
})

// js
gulp.task("js", function () {
  return (
    gulp
      // 読み出したいファイルを指定
      .src("src/js/main.js")
      // おこないたい処理
      .pipe(plumber())
      // 圧縮
      .pipe(uglify())
      // 出力先
      .pipe(gulp.dest("../assets/js/main.js"))
  )
})

// image
gulp.task("image", function () {
  return (
    gulp
      // 読み出したいファイルを指定
      .src("src/img/**/*.{jpg,jpeg,png,gif,svg}")
      // おこないたい処理
      .pipe(imagemin(
        [
          pngquant({ quality: [.65, .80], speed: 1 }),
          mozjpeg({ quality: 80 }),
          imagemin.svgo(),
          imagemin.gifsicle()
        ]
      ))
      // 出力先
      .pipe(gulp.dest('../assets/img'))
  )
});

// watch
gulp.task("default", function () {
  gulp.watch("src/css/**/*.scss", gulp.task('sass'));
  gulp.watch("src/js/**/*.js", gulp.task('js'));
  gulp.watch("src/img/**/*.{jpg,jpeg,png,gif,svg}", gulp.task('image'));
});

// js