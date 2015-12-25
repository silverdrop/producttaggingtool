// Include gulp
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    path = {
    	root: './',
    	source: 'src/',
        build: 'build/',
        dist: 'dist/'
    };

// Task
gulp.task('build', function(cb) {
    gulp.src(path.source + 'less/main.less')
        .pipe(less())
        .pipe(rename('producttaggingtool.css'))
        .pipe(gulp.dest(path.build));

    gulp.src(path.source + 'js/main.js')
        .pipe(rename('producttaggingtool.js'))
        .pipe(gulp.dest(path.build));

    gulp.src(path.source + 'img/*.*')
        .pipe(gulp.dest(path.build + 'img/'));

    cb();
});
gulp.task('dist', ['build'], function(cb) {
    gulp.src(path.build + '*.css')
        .pipe(minifyCSS())
        .pipe(rename(function(path) {
            path.basename = path.basename + '.min';
        }))
        .pipe(gulp.dest(path.dest));

    gulp.src(path.build + '*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename = path.basename + '.min';
        }))
        .pipe(gulp.dest(path.dest));
        
    gulp.src(path.build + 'img/*.*')
        .pipe(gulp.dest(path.dest + 'img/'));

    cb();
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(path.source + '*/*.*', ['build']);
});
gulp.task('default', ['build', 'watch']);