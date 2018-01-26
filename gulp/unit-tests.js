/*
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');

function runTests (singleRun,exit, done) {
  karma.server.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function(code) {
    done(code);
    //process.exit(code);
  });
}

gulp.task('test', ['scripts'], function(done) {
  runTests(true,false, done);
});

gulp.task('test:build', ['scripts','html'], function(done) {
  runTests(true,true, done);
});

gulp.task('test:auto', ['watch'], function(done) {
  runTests(false,false, done);
});
*/
