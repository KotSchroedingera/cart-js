import pkg from 'gulp';
const { src, dest, watch, series, parallel } = pkg;

import pug from 'gulp-pug';
import typograf from 'gulp-typograf';
import { htmlValidator } from 'gulp-w3c-html-validator';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import shorthand from 'gulp-shorthand';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

import terser from 'gulp-terser';
import babel from 'gulp-babel';

import imagemin from 'gulp-imagemin';

import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import del from 'del';
import sync from 'browser-sync';
sync.create();

export const html = () => {
  return src('./src/pages/**.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(typograf({ locale: ['ru', 'en-US'] }))
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter())
    .pipe(dest('./build'));
}

export const css = () => {
  return src('./src/styles/**.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(shorthand())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('./build/css'));
}

export const js = () => {
  return src('./src/scripts/**.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({  presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('./build/js'));
}

export const images = () => {
  return src('./src/images/**.*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(dest('./build/images'))
}

export const fonts = () => {
  return src('./src/fonts/**')
    .pipe(plumber())
    .pipe(dest('./build/fonts'));
}

export const clear = async() => {
  await del('./build');
}

const server = () => {
  sync.init({
    server: './build',
  });

  watch('./src/pages/**.pug', series(html)).on('change', sync.reload);
  watch('./src/styles/**.scss', series(css)).on('change', sync.reload);
  watch('./src/scripts/**.js', series(js)).on('change', sync.reload);
  watch('./src/images/**', series(images)).on('change', sync.reload);
  watch('./src/fonts/**', series(fonts)).on('change', sync.reload);
}

export const build = series(clear, parallel(fonts, css, html, js, images));
export const serve = series(clear, parallel(fonts, css, html, js, images), server);
export default serve;
