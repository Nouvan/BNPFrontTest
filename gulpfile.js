const gulp = require("gulp");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var newer = require("gulp-newer");
var htmlclean = require("gulp-htmlclean");
var replace = require("gulp-replace");
var clean = require("gulp-clean");
var uglifyes = require("gulp-uglify-es");
var env = require("gulp-env");

env(".env");

function cleanDist() {
    return gulp
        .src(process.env.build, { allowEmpty: true })
        .pipe(clean({ force: true }))
        .pipe(gulp.dest("dist"));
}

function css() {
    return gulp
        .src("./src/assets/styles/style.scss")
        .pipe(sass())
        .pipe(cssnano())
        .pipe(replace("{{basePath}}", process.env.basePath))
        .pipe(gulp.dest(process.env.build + "./assets/styles/"));
}

function images() {
    return gulp
        .src(process.env.src + "assets/images/*")
        .pipe(gulp.dest(process.env.build + "./assets/images"));
}

function font() {
    return gulp
        .src(process.env.src + "/assets/fonts/*")
        .pipe(gulp.dest(process.env.build + "/assets/fonts"));
}

function html() {
    return gulp
        .src(process.env.src + "/*")
        .pipe(newer(process.env.build + "/"))
        .pipe(htmlclean())
        .pipe(replace("{{basePath}}", process.env.basePath))
        .pipe(gulp.dest(process.env.build + "/"));
}

function js() {
    return gulp
        .src(process.env.src + "/assets/scripts/*.js")
        .pipe(gulp.dest(process.env.build + "/assets/scripts"));
}

exports.default = gulp.series(cleanDist, css, js, images, html);
