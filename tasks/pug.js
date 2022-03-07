const { src, dest } = require("gulp");

// Плагины
const pugs = require("gulp-pug");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpHtml = require("gulp-webp-html");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// обработка Pug
const pug = () => {
    return src(path.pug.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "Pug",
            message: error.message
        }))
    }))
    .pipe(pugs(app.pug))
    .pipe(webpHtml())
    .pipe(dest(path.pug.dest))
};

module.exports = pug;