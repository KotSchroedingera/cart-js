const { src, dest, task, watch, series } = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const sync = require('browser-sync').create();


function html() {
  return src('./src/pages/**.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(dest('./build'))
    .pipe(sync.stream());
}

function css() {
  return src('./src/styles/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./build/css'))
    .pipe(sync.stream());
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
}

exports.html = html;
exports.css = css;
exports.clear = clear;
exports.build = series(clear, css, html);
exports.serve = series(clear, css, html, serve);


