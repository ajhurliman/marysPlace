var gulp               = require('gulp');
var html2js            = require('gulp-html2js');
var copy               = require('gulp-copy');
var clean              = require('del');
// var constants          = require('./config/constants');
var concat             = require('gulp-concat');
var uglify             = require('gulp-uglify');
// var argv               = require('yargs').argv;
// var cssmin             = require('gulp-cssmin');
// var template           = require('gulp-template');
// var sourcemaps         = require('gulp-sourcemaps');
// var rename             = require('gulp-rename');
var flatGlob           = require('flatten-glob');
// var pkg                = require('./package.json');
// var flatten            = require('gulp-flatten');
// var tap                = require('gulp-tap');
// var jshint             = require('gulp-jshint');
// var stylish            = require('jshint-stylish');
// var webserver          = require('gulp-webserver');
// var shell              = require('gulp-shell');
var runSequence        = require('run-sequence');
var webpack            = require('gulp-webpack');
var sass               = require('gulp-sass');

function mergeArrays() {
    var outArr = [];
    for (var i in arguments) {
        outArr = outArr.concat(arguments[i]);
    }
    return outArr;
}

function getTemplateJSFiles() {
    return flatGlob.sync(mergeArrays(
        constants.APP_JS_FILES,
        'templates-app.js',
        'templates-components.js'));
}

// function startWebServer(srcDir, port, livereloadPort) {
//     // console.log('proxyDomainURL: ', proxyDomainURL);
//     return gulp.src(srcDir)
//         .pipe(webserver({
//             host: '0.0.0.0',
//             port: port,
//             livereload: {enable: true, port: livereloadPort},
//             fallback: 'index.html',
//             // https: true,
//         }));
// }

gulp.task('clean', function(){
    return clean(['./build']);
});

gulp.task('copyAssets', function() {
    return gulp.src('assets/**/*', {'cwd': 'src/', 'base': '.'})
        .pipe(copy('./build'));
});

gulp.task('copyVendorJs', function() {
    return gulp.src('js/**/*', {'cwd': 'vendor/', 'base': '.'})
        .pipe(copy('./build'));
});

gulp.task('copyIndex', function() {
    return gulp.src('index.html', {'cwd': 'src/', 'base': '.'})
        .pipe(copy('./build'));
});

gulp.task('copyPartials', function() {
    return gulp.src('partials/**/*', {'cwd': 'src/', 'base': '.'})
        .pipe(copy('./build'));
});

// gulp.task('cssminSync', function() {
//     return gulp.src('./build/**/*.css')
//         //.pipe(cssmin())
//         .pipe(gulp.dest('./build'));
// });

gulp.task('watch', function() {
    // var templateFiles = getTemplateJSFiles();

    gulp.watch('./src/**/*', ['build']);
    // gulp.watch(constants.APP_TEMPLATES, logChangedFile);
    // gulp.watch(constants.APP_TEMPLATES, ['appTemplates']);

    // gulp.watch(constants.COMPONENT_TEMPLATES, logChangedFile);
    // gulp.watch(constants.COMPONENT_TEMPLATES, ['componentTemplates']);

    // gulp.watch(constants.VENDOR_JS_FILES, logChangedFile);
    // gulp.watch(constants.VENDOR_JS_FILES, ['vendorJs']);

    // gulp.watch(constants.APP_JS_FILES, logChangedFile);
    // gulp.watch(constants.APP_JS_FILES, ['appJsSync']);

    // gulp.watch(templateFiles, logChangedFile);
    // gulp.watch(templateFiles, ['uwAssets', 'wsuAssets']);

    // gulp.watch('src/assets/**/*', logChangedFile);
    // gulp.watch('src/assets/**/*', ['uwAssetsSubdirs', 'wsuAssetsSubdirs']);

});

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
    // return gulp.src('./src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build'));
});

gulp.task('pack', function() {
    return gulp.src('src/client.js')
        .pipe(webpack({
            watch: false,
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('build', function() {
    runSequence(
        'clean',
        'copyAssets',
        'copyVendorJs',
        'copyIndex',
        'copyPartials',
        'sass',
        'pack'
    );
});

gulp.task('default', function() {
    runSequence(
        'clean',
        'copyAssets',
        'copyVendorJs',
        'copyIndex',
        'copyPartials',
        'sass',
        'pack',
        // 'cssminSync',
        'watch'
    );
});
