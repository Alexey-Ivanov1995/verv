const { src, dest, watch, parallel, series } = require('gulp'); // пути


const scss = require('gulp-sass')(require('sass')); // новое подключение старое require('gulp-sass')
const concat  = require('gulp-concat'); // подключаем concat  установка npm i --save-dev gulp-concat
const browserSync = require('browser-sync').create(); // подключаем обновление в браузере установка:  npm i --save-dev browser-sync
const uglify = require('gulp-uglify-es').default; // подключаем сжиматель js установка npm i save-dev gulp-uglify-es  https://www.npmjs.com/package/gulp-uglify-es
const autoprefixer = require('gulp-autoprefixer'); // подключаем сжиматель gulp-autoprefixer установка npm i save-dev gulp-autoprefixer https://www.npmjs.com/package/gulp-autoprefixer
// const imagemin = require('gulp-imagemin').default;  // сдатие картинок npm i --save-dev gulp-imagemin https://www.npmjs.com/package/gulp-imagemin
const del = require('del');
const image = require('gulp-image');

// открывает окно браузера
function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/" // путь ао которому будет считываться корневой файл
        }
    });
}
// удаляет папку dist
function cleanDist() {
    return del('dist')
}

// подключаем все наши js файлы в той послежовательности как оно нам нужно 
function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        // 'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/owl.carousel/dist/owl.carousel.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}
// конвертируем изображение
function images() {
    return src('app/images/**/*')
    .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true // defaults to false
      }))
    .pipe(dest('dist/images'))
}
// преобразование стилевыи и scss файлов в min.css
function styles() {
    return src([
        // 'node_modules/bootstrap/dist/css/bootstrap.css',
         'node_modules/owl.carousel/dist/assets/owl.carousel.css',
         'app/scss/style.scss'
        ]) // путь к файлу с которым будем работать
      .pipe(scss({outputStyle: 'compressed'})) // сжимает и преобразует из scss в css min
      .pipe(concat('style.min.css')) //переименовываем еомпелируемый файл в style.min.css
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }) )
      .pipe(dest('app/css')) // куда будеи ложить нас скомпелированный файл
      .pipe(browserSync.stream()) // после каких либо изменений обнавляет страничку в браузере

}
// собирает наш проект в папку dist
function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html',
    ], { base: 'app' })
    .pipe(dest('dist'))
}
// следит за любыми изменениями
function watching() {
    watch(['app/scss/**/*.scss'], styles); //сдедить за всеми вложенностями и файлами с расширением scss запускал функцию styles
    watch(['app/js/**/*.js','!app/js/main.min.js'], scripts) //следим за изменениями в js файле
    watch(['app/*.html']).on('change', browserSync.reload); // следим за изменениями во всех html файлах
}
// экспортируем функции чтобы можно было к ним обращаться
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

// команда выполняющие последовательные действия
exports.build = series(cleanDist ,images , build);

// стандартное поведение gulp
exports.default = parallel( styles ,scripts, browsersync, watching );