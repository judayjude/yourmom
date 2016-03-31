var gulp = require("gulp");
var gutil = require("gulp-util");
var jasmine = require("gulp-jasmine-node");

var specsGlob = "spec/**/*spec.js";
var srcJSGlob = "index.js";

gulp.task("default", ["watch"]);

function unitTestsWithJasmine() {
    gulp.src(specsGlob)
        .pipe(jasmine());
}

gulp.task("unit", unitTestsWithJasmine);

gulp.task("watch", function () {
    gutil.log("Starting continuous unit test watch...");
    unitTestsWithJasmine();
    gulp.watch(specsGlob, ["unit"]);
    gulp.watch(srcJSGlob, ["unit"]);
});