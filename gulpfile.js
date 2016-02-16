//include Gulp & plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');

//variable for the sources of the coffeescripts
var coffeeSources = ['components/coffee/tagline.coffee'];

//created a task named coffee that uses gulp-coffee to process coffeescript to js
gulp.task('coffee', function() {
	//refers to the original location for the processing 
	gulp.src(coffeeSources)
		//passes on the bare bare command 
		.pipe(coffee({ bare: true})
			//prevents gulp from stopping the executing when crashing and logs the error
			.on('error', gutil.log))
		//passes on the final destionation of the process
		.pipe(gulp.dest('components/scripts'))
});