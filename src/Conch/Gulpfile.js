var gulp = require('gulp'),
    merge = require('merge-stream'),
    bowerFiles = require('bower-files')();

gulp.task('bower', function () {
    console.log('Files: ' + bowerFiles.css);
    return gulp.src(bowerFiles.js)
        .pipe(gulp.dest('Scripts/vendor'));
});

gulp.task('default', ['bower']);