var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.html","app/lib/bootstrap-css/css/bootstrap.min.css","app/style.css"])
        .pipe(gulp.dest("app/dist"));
});

var paths = {
  scripts: ['app/main.jsx'],
  html: ['app/index.html'],
  css: ['app/dist/style.css'],
  files: ['app/main.jsx','app/index.html','app/dist/style.css', 'app/components/**.jsx']
};



// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.files, ['copy']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'copy'], function(){
   console.log("Gulp completed...");
});
