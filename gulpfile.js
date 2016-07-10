'use strictf';

var gulp = require("gulp"),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync"),

    reload = browserSync.reload;

var path = {
    src: {
        html: "*.html",
        js: "js/*.js",
        css: "css/*.css",
        img: "img/*.img"
    }
};

var config = {
    server: {
        baseDIr: "./"
    },
    tunnel: false,
    host: "localhost",
    port: 9000,
    lopPrefix: "htask2"
};

gulp.task("html:build", function(){
    gulp.src(path.src.html)
        .pipe(reload({stream: true}));
});

gulp.task("js:build", function(){
    gulp.src(path.src.js)
        .pipe(reload({stream: true}));
});

gulp.task("css:build", function(){
    gulp.src(path.src.css)
        .pipe(reload({stream: true}));
});

gulp.task("img:build", function(){
    gulp.src(path.src.img)
        .pipe(reload({stream: true}));
});

gulp.task("build", [
    "html:build",
    "js:build",
    "css:build",
    "img:build"
]);

gulp.task("watch", function(){
    watch([path.src.html], function(event, cb) {
        gulp.start("html:build");
    });
    watch([path.src.html], function(event, cb) {
        gulp.start("js:build");
    });
    watch([path.src.html], function(event, cb) {
        gulp.start("css:build");
    });
    watch([path.src.html], function(event, cb) {
        gulp.start("img:build");
    });
});

gulp.task("webserver", function(){
    browserSync(config);
});

gulp.task("default", ["build", "webserver", "watch"]);
