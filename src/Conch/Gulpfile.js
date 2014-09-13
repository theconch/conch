var gulp = require('gulp'),
    typescript = require('gulp-tsc'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    html2js = require('gulp-ng-html2js'),
    newer = require('gulp-newer'),
    gulpIgnore = require('gulp-ignore'),
    sourcemaps = require('gulp-sourcemaps'),
    insert = require('gulp-insert'),
    replace = require('gulp-replace'),
    rm = require('gulp-rm'),
    merge = require('merge-stream'),
    bowerFiles = require('bower-files')();

gulp.task('bower', function () {
    return gulp.src(bowerFiles.js)
        .pipe(gulp.dest('Scripts/vendor'));
});

gulp.task('tspresent', function () {
    return gulp.src(['TypeScript/presenter/app.ts'])
        .pipe(typescript({ target: 'ES5', out: 'presenter.js', outDir: 'build', emitError: true, sourcemap: true }))
        .pipe(gulp.dest('scripts'));
});

gulp.task('tswatch', function () {
    return gulp.src(['TypeScript/watcher/watch.ts'])
        .pipe(typescript({ target: 'ES5', out: 'watch.js', outDir: 'build', emitError: true, sourcemap: true }))
        .pipe(gulp.dest('scripts'));
});

gulp.task('default', ['bower', 'tspresent', 'tswatch']);