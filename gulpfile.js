var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    ngannotate = require('gulp-ng-annotate'),
    del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

// Clean
var dirtyBuild = false;
gulp.task('clean', function() {
    if (!dirtyBuild) {
        return del(['dist/**/*']);
    }
});

// Default task
gulp.task('default', ['usemin', 'imagemin','copy']);

gulp.task('usemin',['clean', 'jshint'], function () {
  return gulp.src('./app/**/*.{html,js,css}')
  /*
      .pipe(usemin({
        css:[minifycss(),rev()],
        // js: [ngannotate(),uglify(),rev()]
      }))
  */
      .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', ['clean'], function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    //.pipe(notify({ message: 'Images task complete' }))
    ;
});

gulp.task('copyfonts_awesome', ['clean'], function() {
   return gulp.src([
      './bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*',
      ])
   .pipe(gulp.dest('./dist/fonts'));    
})

gulp.task('copyfonts_awesome_css', ['clean'], function() {
   return gulp.src([
      './bower_components/font-awesome/css/font-awesome.min.css{,.map}',
      ])
   .pipe(gulp.dest('./dist/css'));    
})

gulp.task('copyfonts_bootstrap', ['clean'], function() {
   return gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy_angular', ['clean'], function() {
   return gulp.src('./bower_components/angular/angular.min.js')
   .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy_angular_ui_router', ['clean'], function() {
   return gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.min.js')
   .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy_angular_resource', ['clean'], function() {
   return gulp.src('./bower_components/angular-resource/angular-resource.min.js')
   .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy_bootstrap', ['clean'], function() {
   return gulp.src('./bower_components/bootstrap/dist/css/{bootstrap,bootstrap-theme}.min.css{,.map}')
   .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy_ui_bootstrap', ['clean'], function() {
   return gulp.src('./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js')
   .pipe(gulp.dest('./dist/scripts'));
});


gulp.task('copy', ['copyfonts_awesome',
                   'copyfonts_awesome_css',
                   'copyfonts_bootstrap',
                   'copy_bootstrap',
                   'copy_ui_bootstrap',
                   'copy_angular',
                   'copy_angular_resource',
                   'copy_angular_ui_router']);


// Watch
gulp.task('watch', ['default'], function() {
  // Watch .js files
  dirtyBuild = true;
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', 
             ['usemin']);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});
