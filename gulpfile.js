/* Использование пакетов (var заменили на const для оптимизации) */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('server', function() {  /* task - задача */ /* 'название' функция() */

    browserSync({ 
        server: {
            baseDir: "src" /* наш live server будет запускаться из папки src */
        },
        browser: 'google chrome',
        open: 'local'
    });
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
        .pipe(gulp.dest("src/css")) /* файлы, которые получились положили по (...) адресу */
        .pipe(browserSync.stream()); /* запускать браузер */
});

gulp.task('watch', function() { /* чтобы gulp следил за изменениями html и стилестических файлов */
    gulp.watch("src/sass/**/*.+(scss|sass)"/*отследит изменения*/ , gulp.parallel('styles') /* после gulp запустит style*/)
    gulp.watch("src/*.html").on('change'/*  изменение файла */, browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); /* одной коммандой запустить весь функционал */