const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

async function styles() {
  const autoprefixer = (await import("gulp-autoprefixer")).default;

  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

function server() {
  browserSync({
    server: {
      baseDir: "src",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
}
gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|сss)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
  gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
});
gulp.task("html", function () {
  return gulp
    .src("src/*html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});
gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});
gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("mailer", function () {
  return gulp
    .src("src/mailer/**/*")
    .pipe(gulp.dest("dist/mailer"))
    .pipe(browserSync.stream());
});

gulp.task("styles", styles);
gulp.task("server", server);

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "html",
    "fonts",
    "scripts",
    "mailer"
  )
);
