//include Gulp & plugins
var gulp = require('gulp'),
	gutil = require('gulp-util');

//created a task named log that uses gulp util
gulp.task('log', function() {
	gutil.log('Worfklows are awesome');
});