//include Gulp & plugins
var gulp = require('gulp'),
	gutil  = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browerserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat');

var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

//array for the converting of the coffeescripts
coffeeSources = ['components/coffee/tagline.coffee'];

//array for concatenating the js files
jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js',
];

sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + 'js/*.json'];

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
		.pipe(gulpif(env==='production', uglify()))
		//destination folder for the file
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
	//when any of these files change run coffee
	gulp.watch(coffeeSources, ['coffee']);
	//when any of these files change run js
	gulp.watch(jsSources, ['js']);
	//when any file changes in the sass folder run compass
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function(){
	//sets up local server
	connect.server({
		root: outputDir,
		livereload: true
	});
});

//watch html task
gulp.task('html', function(){
	gulp.src('builds/development/*.html')
	.pipe(gulpif(env === 'production', minifyHTML()))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
	.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src(jsonSources)
	.pipe(connect.reload())
});

//default task that runs all tasks in order of the array
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);