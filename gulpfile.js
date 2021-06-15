//list dependences
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

//create funtions

//min scss
function compilescss() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('dist/css'));
}
//js
function jsmin() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js'));
}

//images
function optimizeimage() {
  return src('src/images/*.{jpg,png}')
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 })
      ])
    )
    .pipe(dest('dist/images'));
}
//webp image
function webpImage() {
  return src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'));
}

//create watchtask
function watchTask() {
  watch('src/scss/*.scss', compilescss);
  watch('src/js/*.js', jsmin);
  watch('src/images/*.{jpg,png}', optimizeimage);
  watch('dist/images/*.{jpg,png}', webpImage);
}

//default gulp
exports.default = series(
  compilescss,
  jsmin,
  optimizeimage,
  webpImage,
  watchTask
);
