const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


gulp.task('sass', function () {
   gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

//--------------> JS

gulp.task('js', function () {
   gulp.src('./src/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
         presets: ['@babel/env']
      }))
      .pipe(uglify({
         compress: {
            unused: false
         }
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('html', function () {
   gulp.src('src/**/*.html')
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('imgs', function () {
   gulp.src('src/img/*.*')
      .pipe(gulp.dest('./dist/img'))
});

gulp.task('build', function () {
   gulp.start(['sass', 'js', 'html', 'imgs'])
});

gulp.task('browserSync', function () {
   browserSync.init(null, {
      open: false,
      server: {
         baseDir: 'dist'
      }
   });
});

gulp.task('start', function () {
   devMode = true;
   gulp.start(['build', 'browserSync']);
   gulp.watch(['./src/scss/**/*.scss'], ['sass']);
   gulp.watch(['./src/js/**/*.js'], ['js']);
   gulp.watch(['./src/**/*.html'], ['html']);
});