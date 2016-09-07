var gulp               = require('gulp');
var copy               = require('gulp-copy');
var clean              = require('del');
var uglify             = require('gulp-uglify');
var runSequence        = require('run-sequence');
var webpack            = require('gulp-webpack');
var sass               = require('gulp-sass');

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

gulp.task('watch', function() {
    gulp.watch('./src/**/*', ['build']);
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
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
