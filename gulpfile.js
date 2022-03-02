const { src, dest, watch, series } = require('gulp');

const pug = require('gulp-pug');

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const shorthand = require('gulp-shorthand');

const terser = require('gulp-terser');
const babel = require('gulp-babel');

const plumber = require('gulp-plumber');
const del = require('del');
const sync = require('browser-sync').create();


function html() {
  return src('./src/pages/**.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(dest('./build'));
}

function css() {
  return src('./src/styles/**.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(shorthand())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('./build/css'));
}

function js() {
  return src('./src/scripts/**.js')
    .pipe(plumber())
    .pipe(babel({  presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('./build/js'));
}

async function clear() {
  await del(['./build']);
}

function serve() {
  sync.init({
    server: './build',
  });

  watch('./src/pages/**.pug', series(html)).on('change', sync.reload);
  watch('./src/styles/**.scss', series(css)).on('change', sync.reload);
  watch('./src/scripts/**.js', series(js)).on('change', sync.reload);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.clear = clear;
exports.build = series(clear, css, html, js);
exports.serve = series(clear, css, html, js, serve);


