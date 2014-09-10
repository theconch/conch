var gulp = require('gulp'),
    merge = require('merge-stream'),
    bowerFiles = require('bower-files')();

gulp.task('bower', function () {
    return gulp.src(bowerFiles.js)
        .pipe(gulp.dest('Scripts/vendor'));
});

gulp.task('default', ['bower']);