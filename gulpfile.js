const { watch, series, parallel } = require("gulp");

// Плагины
const browsersync = require("browser-sync").create();

// Конфигурация
const path = require("./config/path.js");
const app = require("./config/app.js");

// Задачи
const clear = require("./tasks/clear.js");
const html = require("./tasks/html.js");
const scss = require("./tasks/scss.js");
const js = require("./tasks/js.js");
const img = require("./tasks/img.js");
const fonts = require("./tasks/fonts.js");

//Сервер
const server = () => {
    browsersync.init({
        server: {
            baseDir: path.root
        },
        host: "192.168.8.175"
    });
}

// Наблюдение
const watcher = () => {
    watch(path.html.watch, html).on("all", browsersync.reload);
    watch(path.scss.watch, scss).on("all", browsersync.reload);
    watch(path.js.watch, js).on("all", browsersync.reload);
    watch(path.img.watch, img).on("all", browsersync.reload);
    watch(path.fonts.watch, fonts).on("all", browsersync.reload);
}

const build = series(
    clear,
    parallel(html, scss, js, img, fonts)
);

const dev = series(
    build,
    parallel(watcher, server)
);

// задачи
exports.watch = watcher;
exports.clear = clear;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.fonts = fonts;

exports.build = build;
exports.dev = dev;

// Сборка
exports.default = app.isProd ? build : dev;