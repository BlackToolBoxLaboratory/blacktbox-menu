var gulp = require("gulp");
var less = require('gulp-less');
var less2scss = require('gulp-less-to-scss');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css'); 

const path_backup = "../codebase/blacktbox-menu/";

gulp.task("copy2codebase", function() {  
  /* module */
  gulp.src(["module/*"])
    .pipe(gulp.dest(path_backup + "module/"));
  /* less */
  gulp.src(["css/*.less"])
    .pipe(gulp.dest(path_backup + "css/"));
  /* script */
  gulp.src(["script/*"])
    .pipe(gulp.dest(path_backup + "script/"));
  /* others */
  gulp.src(["module/.babelrc"])
    .pipe(gulp.dest(path_backup + "module/"));        
  gulp.src([
      "LICENSE",
      "README.md",  
      "CHANGELOGS.md",
      "rollup.config.js",
      "package.json",
      "package-lock.json",
      "gulpfile.js"                  
    ])
    .pipe(gulp.dest(path_backup));
});

gulp.task("lessTranslation", function(){
  /* less to css */
  gulp.src(["css/*.less"])
    .pipe(less())
    .pipe(gulp.dest("./css/"));
  /* less to scss */
  gulp.src(["css/*.less"])
    .pipe(less2scss())
    .pipe(gulp.dest("./css/"));
  /* less to css-min */
  gulp.src(["css/*.less"])
    .pipe(less())
    .pipe(concat('blacktbox-menu.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest("./css/"));
});

gulp.task("backup", ["copy2codebase"]);
gulp.task("cssBuildup", ["lessTranslation"]);
