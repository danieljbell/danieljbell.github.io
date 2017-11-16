var gulp          = require('gulp'),
    postcss       = require('gulp-postcss'),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    atImport      = require('postcss-import'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    cssnano       = require('cssnano'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    browserSync   = require('browser-sync'),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    cp            = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('clean:css', function () {
  return del([
    './dist/css/**/*',
  ]);
});

gulp.task('clean:js', function () {
  return del([
    './dist/js/**/*',
  ]);
});

gulp.task('clean:img', function () {
  return del([
    './dist/img/**/*',
  ]);
});

gulp.task('clean:all', function () {
  return del([
    './dist',
  ]);
});

gulp.task('css', ['clean:css'], function () {
  var processors = [
    atImport,
    autoprefixer({browsers: ['last 6 versions', 'ie 9', 'ie 10', 'ie 11']}),
    mqpacker,
    cssnano
  ];
  gulp.src('_src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(gulp.dest('./_site/dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  gulp.src(['_src/js/**/*.js',])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('./_site/dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src('./_src/img/*')
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest('./dist/img'))
    .pipe(gulp.dest('./_site/dist/img'))
    .pipe(browserSync.stream());
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['_src/scss/*.scss','_src/scss/**/*.scss'], ['clean:css', 'css']);
  gulp.watch(['_src/js/*.js','_src/js/**/*.js'], ['clean:js', 'js']);
  gulp.watch(['index.html', '_layouts/*.html', '_posts/**/*', '_includes/**/*'], ['jekyll-rebuild']);
  gulp.watch(['_src/img/*'], ['clean:img', 'images']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['css', 'images', 'js', 'watch', 'browser-sync']);