var gulp = require("gulp");

const path_backup = "../codebase/blacktbox-menu/";

gulp.task("copy2codebase", function() {  
  /* module */
  gulp.src(["module/*"])
    .pipe(gulp.dest(path_backup + "module/"));
  /* script */
  gulp.src(["script/*"])
    .pipe(gulp.dest(path_backup + "script/"));
  /* others */
  gulp.src(["module/.babelrc"])
    .pipe(gulp.dest(path_backup + "module/"));        
  gulp.src([
      "LICENSE",
      "README.md",      
      "rollup.config.js",
      "package.json",
      "package-lock.json",
      "gulpfile.js"                  
    ])
    .pipe(gulp.dest(path_backup));
});

gulp.task("backup", ["copy2codebase"]);