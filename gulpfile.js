// Require all the needed components
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');
const autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');

// Run Sass through cleanCss and output to dist folder
gulp.task('sass', function() {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('src'))
    .pipe(
      cleanCss({
        compatibility: 'ie8',
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Output html, fonts and images to dist folder
gulp.task('html', function() {
  return gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
});

// gulp.task('php', function() {
//     return gulp.src('src/**/*.php').pipe(gulp.dest('dist'))
// })

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));
});

// Run JS through webpack and output to dist + browserSync
gulp.task('js', function() {
  gulp
    .src('src/js/*')
    .pipe(
      webpack({
        mode: 'production',
        devtool: 'source-map',
        output: {
          filename: 'main.js',
        },
      })
    )
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Watch task for all files and browserSync
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/fonts/*', ['fonts']);
  gulp.watch('src/img/*', ['images']);
  gulp.watch('src/js/**/*.js', ['js']);
});

// Default Gulp task
gulp.task('default', ['html', 'sass', 'fonts', 'js', 'images', 'watch']);
// gulp.task('build', ['html', 'sass', 'fonts', 'js', 'images',])
