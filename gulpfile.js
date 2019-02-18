var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var server = require("gulp-webserver");
var babel = require("gulp-babel");

//编译sass
gulp.task("sass",function(){
    return gulp.src("./src/scss/*.scss")
           .pipe(sass())
           .pipe(gulp.dest("./src/css/"))
})

//编译js
gulp.task("ug",function(){
    return gulp.src("./src/libs/*.js")
           .pipe(uglify())
           .pipe(gulp.dest("./src/js"))
})


//压缩css
gulp.task("concatCss",function(){
    return gulp.src("./src/css/*.css")
           .pipe(concat("all.css"))
           .pipe(clean())
           .pipe(gulp.dest("./src/css"))
})

//压缩js
gulp.task("concatjs",function(){
    return gulp.src("./src/js/*.js")
           .pipe(concat("all.js"))
           .pipe(babel({
                presets: ['es2015']
           }))
           .pipe(uglify())
           .pipe(gulp.dest("./src/js"))
})


//起服务
gulp.task("server",function(){
    return gulp.src("./src")
           .pipe(server({
               open:true,
               livereload:true
           }))
})


//copy
gulp.task("copycss",function(){
    return gulp.src("./src/css/*.css")
           .pipe(gulp.dest("./dist/css"))
})

gulp.task("copyjs",function(){
    return gulp.src("./src/libs/flexible.js")
           .pipe(gulp.dest("./dist/js"))
})

gulp.task("copyhtml",function(){
    return gulp.src("./src/index.html")
           .pipe(gulp.dest("./dist/"))
})

//监听
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",gulp.series("sass","concatCss","ug","server","copycss","copyjs","copyhtml"))
})