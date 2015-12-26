// Include gulp
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
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

    gulp.src(path.source + 'font/*.*')
        .pipe(gulp.dest(path.build + 'font/'));

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
        
    gulp.src(path.build + 'font/*.*')
        .pipe(gulp.dest(path.dest + 'font/'));

    cb();
});

gulp.task('connect', function () {
    return connect.server({
        root: [ path.root ],
        livereload: true,
        port:'3000'
    });
});
    
gulp.task('open', function () {
    return gulp.src('demo/index.html').pipe(open({ uri: 'http://localhost:3000/demo/index.html'}));
});

gulp.task('watch', function() {
    gulp.watch(path.source + '*/*.*', ['build']);
});

gulp.task('watch-demo', function() {
    gulp.watch(path.source + '*/*.*', ['build']);
    gulp.watch(path.source + '*/*.*', function(){
        gulp.src(path.root)
            .pipe(connect.reload());
    });  
});

gulp.task('default', ['build', 'watch']);
gulp.task('demo', ['connect', 'build', 'watch-demo', 'open']);
