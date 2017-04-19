var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var lib = require('bower-files')({
  "overrides":{
    "bootstrap":{
      "main":[
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js",
        "dist/fonts/glyphicons-halflings-regular.eot",
        "dist/fonts/glyphicons-halflings-regular.svg",
        "dist/fonts/glyphicons-halflings-regular.ttf",
        "dist/fonts/glyphicons-halflings-regular.woff",
        "dist/fonts/glyphicons-halflings-regular.woff2"
      ]
    }
  }
});

var buildProduction = utilities.env.production;

gulp.task('jshint', function() {
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function() {
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task('clean', function() {
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});

gulp.task('bowerJS', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bowerFonts', function() {
  return gulp.src(lib.ext(['eot', 'woff', 'woff2', 'ttf', 'svg']).files)
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS', 'bowerFonts']);

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['scss/*.scss'], ['cssBuild']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function() {
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function() {
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});

gulp.task('cssBuild', function(){
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});
