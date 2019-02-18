var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var server = require("gulp-webserver");

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
// gulp.task("concatjs",function(){
//     return gulp.src("./src/js/*.js")
//            .pipe(concat("all.js"))
//            .pipe(gulp.dest("./src/js"))
// })

//监听
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",gulp.series("sass","concatCss"))
    // gulp.watch("./src/libs/*.js",gulp.series("ug","caoncatjs"))
})

//起服务
gulp.task("server",function(){
    return guko.src("./src")
           .pipe(server({
               open:true,
               livereload:true
           }))
})

gulp.task("./src/scss/*.scss",gulp.series("server","watch"))