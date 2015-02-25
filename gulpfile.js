/**
 * Created by Espen on 29.10.2014.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');

gulp.task('less', function () {
    gulp.src('public/stylesheets/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function () {
    gulp.watch('public/stylesheets/*.less', ['less']);
    gulp.watch('public/views/**/*.html', ['templates']);
    gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/libs'], ['compress']);
});

gulp.task('templates', function () {
    gulp.src('public/views/**/*.html')
        .pipe(templateCache({root: 'views', module: 'AtlApp'}))
        .pipe(gulp.dest('public'));
});

gulp.task('compress', function () {
    gulp.src([
        'public/app.js',
        'public/services/*.js',
        'public/controllers/*.js',
        'public/filters/*.js',
        'public/directives/*.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

gulp.task('libs', function () {
    gulp.src([
        'public/libs/jquery.js',
        'public/libs/jqueryui/jquery-ui.min.js',
        'public/libs/angular.js',
        'public/libs/*.js',

    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

//gulp.task('default', ['less', 'watch', 'templates', 'compress', 'libs']);
gulp.task('default', ['less', 'watch']);