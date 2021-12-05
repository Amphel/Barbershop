'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

// clean css in dist
function cleanFolder() {
  return gulp.src('./dist/css', { read: false, allowEmpty: true })
    .pipe(clean());
};

// modify scss file to css with sourcemap
function modifyScssToCss() {
  return gulp.src('./src/css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist/css'));
};

// postcss
function setPrefixCss() {
  var plugins = [
      autoprefixer()
  ];
  return gulp.src('./dist/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe(postcss(plugins))
    .pipe( sourcemaps.write('./') )
    .pipe(gulp.dest('./dist/css'));
};

// replace normalize file to dist folder
function replaceFile() {
  return gulp.src('./src/css/normalize.css')
    .pipe(gulp.dest('./dist/css'));
}

// minify css
function minifyCss() {
  return gulp.src('dist/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe( sourcemaps.write('./') )
    .pipe(gulp.dest('./dist/css'));
};

exports.default = gulp.series(cleanFolder,
                              modifyScssToCss,setPrefixCss,
                              replaceFile,
                              minifyCss
                              );

