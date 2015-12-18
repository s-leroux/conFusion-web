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
        return del(['dist']);
    }
});

// Default task
gulp.task('default', ['usemin', 'imagemin','copyfonts']);

function makeUseminTask(tName, fName, dest) {
    gulp.task(tName,['clean'], function () {
      return gulp.src(fName)
          .pipe(usemin({
            css:[minifycss(),rev()],
            js: [ngannotate(),uglify(),rev()]
          }))
          .pipe(gulp.dest(dest));
    });
}

var htmlSrc = [ './app/index.html', 
                './app/views/menu.html', 
                './app/views/contactus.html', 
                './app/views/dishdetail.html', 
                './app/views/footer.html', 
                './app/views/header.html'];
var usemin_deps = ['jshint'];
for (fName of htmlSrc) {
    var baseName = fName.split(/[/.]/).splice(-2,1)[0];
    console.log(fName);
    console.log(baseName);
    var dirName = fName.substr(0, fName.lastIndexOf(baseName+"."));
    var tName = 'usemin_' + baseName;
    usemin_deps.push(tName)
    makeUseminTask(tName, fName, dirName.replace("./app/","./dist/"));
}

gulp.task('usemin', usemin_deps);

// Images
gulp.task('imagemin', ['clean'], function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    //.pipe(notify({ message: 'Images task complete' }))
    ;
});

gulp.task('copyfonts_awesome', ['clean'], function() {
   return gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));    
})

gulp.task('copyfonts_bootstrap', ['clean'], function() {
   return gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copyfonts', ['copyfonts_awesome', 'copyfonts_bootstrap']);


// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  dirtyBuild = true;
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', 
             ['usemin']);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/images/**/*.png',
        'app/scripts/**/*.js',
        'dist/**/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "dist",
            index: "index.html",
            // directory: true
        }
    });

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});
