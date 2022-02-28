const gulp = require('gulp');
const pug2html = require('./src/gulp/tasks/pug2html');

module.exports.start = gulp.series(pug2html);