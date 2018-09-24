var gulp = require("gulp");
var less = require('gulp-less');
var less2scss = require('gulp-less-to-scss');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css'); 

const path_backup = "../codebase/blacktbox-menu/";

gulp.task("copy2codebase", function(done) {
  gulp.src(["module/*"])
    .pipe(gulp.dest(path_backup + "module/"));
  gulp.src(["css/*.less"])
    .pipe(gulp.dest(path_backup + "css/"));
  gulp.src(["script/*"])
    .pipe(gulp.dest(path_backup + "script/")); 
  gulp.src([
      "LICENSE",
      "README.md",  
      "CHANGELOGS.md",
      "rollup.config.js",
      "package.json",
      "package-lock.json",
      "gulpfile.js",
      ".eslintrc.js",
      ".babelrc",
      "jest.config.js"
    ])
    .pipe(gulp.dest(path_backup));
  done();
});

gulp.task("lessTranslation", function(done){
  gulp.src(["css/*.less"])
    .pipe(less())
    .pipe(gulp.dest("./css/"));
  gulp.src(["css/*.less"])
    .pipe(less2scss())
    .pipe(gulp.dest("./css/"));
  gulp.src(["css/*.less"])
    .pipe(less())
    .pipe(concat('blacktbox-menu.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest("./css/"));
  done();
});

gulp.task("backup", gulp.series("copy2codebase"));
gulp.task("cssBuildup", gulp.series("lessTranslation"));
