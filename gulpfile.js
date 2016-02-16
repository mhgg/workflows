//include Gulp & plugins
var gulp   = require('gulp'),
	gutil  = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat');

//array for the converting of the coffeescripts
var coffeeSources = ['components/coffee/tagline.coffee'];

//array for concatenating the js files
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js',
];

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

gulp.task('js', function(){
	gulp.src(jsSources)
		//output file
		.pipe(concat('script.js'))
		//destination folder for the file
		.pipe(gulp.dest('builds/development/js'))
});