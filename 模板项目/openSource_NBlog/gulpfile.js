/**
 * Created by plter on 2016/12/21.
 */

const gulp = require("gulp");
const webpack = require("webpack");
const gulpWebpack = require("gulp-webpack");
const minify = require("gulp-minify");


gulp.task("packJsFiles", function () {
    gulp.src("src/Server.js").pipe(gulpWebpack(require("./webpack.config"), webpack)).pipe(gulp.dest("build"));
});

gulp.task("copyFiles", function () {
    gulp.src("package.json").pipe(gulp.dest("build"));
    gulp.src("src/static/**/*.html").pipe(gulp.dest("build/static"));
    gulp.src("src/static/**/*.htm").pipe(gulp.dest("build/static"));
    gulp.src("src/static/bower.json").pipe(gulp.dest("build/static"));
    gulp.src("src/static/js/**/*.js").pipe(minify()).pipe(gulp.dest("build/static/js"));
    gulp.src("src/static/jslib/**/*.js").pipe(gulp.dest("build/static/jslib"));
    gulp.src("src/static/**/*.css").pipe(gulp.dest("build/static"));
});

gulp.task("default", ["copyFiles", "packJsFiles"]);