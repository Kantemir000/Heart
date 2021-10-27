/* Использование пакетов (var заменили на const для оптимизации) */
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');



gulp.task('server', function() {  /* task - задача */ /* 'название' функция() */

    browserSync({ 
        server: {
            baseDir: "dist" /* src *//* наш live server будет запускаться из папки src */
        },
        browser: 'google chrome', /* safari */
        open: 'local'
    });
    gulp.watch("src/*.html").on('change'/*  изменение файла */, browserSync.reload);
    gulp.watch("src/js/script.js").on('change'/*  изменение файла */, browserSync.reload);
});

gulp.task('styles', function() {
    /*  Но есть одно Но, если style.sass будет компилироваться, то он создаст style.css, но так как мы указали в опциях, что файл будет сжиматься, тоесть всё будет в одну строку, то с помощью rename мы добавим .min в название, потому что так должен называться файл*/
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass/* скомпилировали, а в скобках опции*/({outputStyle: 'compressed'/* сжатый стиль кода */}).on('error', sass.logError)/* подскажет где была ошибка если она произойдёт */) 
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(gulp.dest("dist/css")) /* src */ /* файлы, которые получились положили по (...) адресу */
        .pipe(browserSync.stream()); /* запускать браузер */
});

gulp.task('watch', function() { /* чтобы gulp следил за изменениями */
    gulp.watch("src/sass/**/*.+(scss|sass|css)"/*отследит изменения*/ , gulp.parallel('styles') /* после gulp запустит style*/);
    gulp.watch("src/*.html").on('change', gulp.parallel('html')); /* когда этот файл будет изменятся будет запускаться задача с названием html */
});

gulp.task('html', function() {
    return gulp.src("src/*.html") /* получаем файл над которым работаем  */
        .pipe(htmlmin({ collapseWhitespace: true })) /* убераются все пробелы в файле */
        .pipe(gulp.dest("dist/")); /* помещаем в папку dist */
});

gulp.task('js', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('img', function() {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'js', 'fonts', 'mailer', 'img')); /* одной коммандой запустить весь функционал */