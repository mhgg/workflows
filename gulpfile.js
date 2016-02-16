//include Gulp & plugins
var gulp   = require('gulp'),
	gutil  = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browerserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
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

var sassSources = ['components/sass/style.scss'];

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
		//add dependancies jquery and mustache
		.pipe(browerserify())
		//destination folder for the file
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function() {
	//when any of these files change run coffee
	gulp.watch(coffeeSources, ['coffee']);
	//when any of these files change run js
	gulp.watch(jsSources, ['js']);
	//when any file changes in the sass folder run compass
	gulp.watch('components/sass/*.scss', ['compass']);
});

//default task that runs all tasks in order of the array
gulp.task('default', ['coffee', 'js', 'compass', 'watch']);