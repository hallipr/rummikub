'use strict';

let gulp = require('gulp');
let mocha = require('gulp-mocha');
let debug = require('gulp-debug');

gulp.task('build', function(done){
  done();
});

gulp.task('test', function(done){
  return gulp.src('./specs/**/*.spec.js', {read: false})
    .pipe(debug())
    // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha());
});

gulp.task('default', ['build', 'test']);