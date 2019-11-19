var gulp = require('gulp');

// Configuration

var config = {
    dist: 'dist',
    src: 'src/',
    srcHTML: 'src/*.html',
    srcSCSS: 'src/scss/**/*.scss',
    srcCSS: 'src/css/**/*.css',
    srcJS: 'src/js/**/*.js',
    distCSS: 'dist/css',
    distJS: 'dist/js',
    scssCompilePath: 'src/css',
    nameCSS: 'style.css',
    nameJS: 'script.js',
    minCSS: 'css/style.min.css',
    minJS: 'js/script.min.js',
    srcAssets: 'src/assets/',
    distAssets: 'dist/assets/'
}

//Help plugin

var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var del = require('del');
const imageMin = require('gulp-imagemin');

// HTML plugins

var htmlReplace = require('gulp-html-replace')
var htmlMin = require('gulp-htmlmin')

// CSS plugins

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

//JS plugins

var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

//Reload browsers after change html, css, js files has been watched

function reload(done) {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    })

    gulp.watch(config.srcHTML).on('change', browserSync.reload);
    gulp.watch(config.srcSCSS, css);
    gulp.watch(config.srcJS).on('change', browserSync.reload);

    done();
}


//Translate scss files to css, run sourcemaps (scss available in inspector) and show changes in browser

function css() {
    return gulp.src(config.srcSCSS)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scssCompilePath))
        .pipe(browserSync.stream());
}

//After work -> concat all css files, then minify it, add sufix 'min' and put into 'dist/css' folder

function cssToDistribution() {
    return gulp.src(config.srcCSS)
        .pipe(concat(config.nameCSS))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.distCSS))
        .pipe(browserSync.stream());
}

//After work -> replace all css and js links in html by one *.min file, then minify html and sort attributes, class's names and collapse whitespace and put into 'dist' folder

function htmlToDistribution() {
    return gulp.src(config.srcHTML)
        .pipe(htmlReplace({
            'css': config.minCSS,
            'js': config.minJS
        }))
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.dist));
}

//After work -> concat all js files, minify and add '.min' suffix

function jsToDistribution() {
    return gulp.src(config.srcJS)
        .pipe(concat(config.nameJS))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.distJS));
}

//delete dist folder before running 'toDistribution' functions

function cleanDistribution() {
    return del(config.dist);
}

//optimize all assets and copy to dist folder
function copyAndOptimizeAssets() {
    return gulp.src(config.srcAssets + '**/*')
        .pipe(imageMin())
        .pipe(gulp.dest(config.distAssets));
}

//Run before work and have nice coding :)

gulp.task('default', reload);
gulp.task('reload', reload);

//Run after work and have nice distribution version project

gulp.task('release', gulp.series(cleanDistribution, htmlToDistribution, cssToDistribution, jsToDistribution, copyAndOptimizeAssets));