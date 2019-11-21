const gulp = require('gulp');
const browserSync = require('browser-sync');
const path = require("path");
const slash = require('slash');
const fs = require('fs');
const url = require("url");

const DOMAIN = require('../conf').DOMAIN;
const DIR = require('../conf').DIR;
const conf = require('../conf').serve;

gulp.task('serve',()=> {
  if (process.env.NODE_ENV == 'production') {
    browserSync(conf.build);
  } else {
    browserSync(conf.dest);
  }
});
