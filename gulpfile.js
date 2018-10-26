// importing packages
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var imagemin = require('gulp-imagemin');
 
gulp.task('sass', function(){
    return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
})
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    })
})

gulp.task('imagemin', () =>
    gulp.src('./non-optimized-images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
);