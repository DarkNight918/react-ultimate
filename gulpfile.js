// DEFAULTS ========================================================================================
let exitOnError = false;
process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR || "./shared/config";

// IMPORTS =========================================================================================
let ChildProcess = require("child_process");
let Config = require("config");
let Gulp = require("gulp");
let GulpUtil = require("gulp-util");
let RunSequence = require("run-sequence");
let JshintStylish = require("jshint-stylish");
let GulpJshint = require("gulp-jshint");
let GulpCached = require("gulp-cached");
let GulpSourcemaps = require("gulp-sourcemaps");
let GulpLess = require("gulp-less");
let GulpConcat = require("gulp-concat");
let GulpRename = require("gulp-rename");
var GulpUglify = require("gulp-uglify");
let Gulp6to5 = require("gulp-6to5");
let GulpPlumber = require("gulp-plumber");
let VinylSource = require("vinyl-source-stream");
let VinylBuffer = require("vinyl-buffer");

//let GulpIgnore = require("gulp-ignore");
//let StripDebug = require("gulp-strip-debug");
//let Uglify = require("gulp-uglify");
function gulpTo5(opts) {
  return gulp6to5(Object.assign({
    experimental: true
  }, opts));
}

// CONFIG ==========================================================================================
let libraries = [
  "axios",
  "babel/polyfills",
  "baobab",
  "classnames",
  "node-uuid",
  "util-inspect",
  "paqmind.data-lens",
  "immutable",
  "joi",
  "lodash.sortby",
  "lodash.isobject",
  "lodash.isplainobject",
  "lodash.isarray",
  "lodash.isempty",
  "lodash.debounce",
  "lodash.throttle",
  "lodash.result",
  "lodash.merge",
  "lodash.flatten",
  "object.assign",
  "react",
  "react/addons",
  "react/lib/ReactLink",
  "react-bootstrap",
  "react-router",
  "react-document-title",
];

function interleaveWith(array, prefix) {
  return array.reduce((memo, val) => {
    return memo.concat([prefix]).concat([val]);
  }, []);
}

// BACKEND TASKS ===================================================================================
Gulp.task("backend:lint", function() {
  return Gulp.src(["./backend/**/*.js"])
    .pipe(GulpPlumber({errorHandler: !exitOnError}))
//    .pipe(cached("backend:lint"))
    .pipe(GulpJshint())
    .pipe(GulpJshint.reporter(jshintStylish));
});

Gulp.task("backend:nodemon", function() {
  let nodemon = ChildProcess.spawn("npm", ["run", "nodemon"]);
  nodemon.stdout.pipe(process.stdout);
  nodemon.stderr.pipe(process.stderr);
});

// FRONTEND TASKS ==================================================================================
Gulp.task("frontend:move-css", function() {
  return Gulp.src(["./frontend/styles/**/*.css"])
    .pipe(GulpPlumber({errorHandler: !exitOnError}))
    .pipe(Gulp.dest("./static/styles"));
});

Gulp.task("frontend:compile-less", function() {
  return Gulp.src(["./frontend/styles/theme.less", "./frontend/styles/http-errors.less"])
    .pipe(GulpPlumber({errorHandler: !exitOnError}))
    .pipe(GulpLess())
    .pipe(Gulp.dest("./static/styles"));
});

Gulp.task("frontend:dist-styles", [
  "frontend:move-css",
  "frontend:compile-less"
]);

Gulp.task("frontend:lint", function() {
  return Gulp.src(["./frontend/**/*.js"])
    .pipe(GulpPlumber({errorHandler: !exitOnError}))
//    .pipe(cached("lint-react"))
    .pipe(GulpJshint())
    .pipe(GulpJshint.reporter(JshintStylish));
});

Gulp.task("frontend:dist-scripts", function() {
  return Gulp.src(["./frontend/scripts/*.js"])
    .pipe(GulpPlumber({errorHandler: !exitOnError}))
    .pipe(GulpConcat("scripts.js"))
    .pipe(GulpUglify())
    .pipe(Gulp.dest("./static/scripts"));
});

Gulp.task("frontend:dist-images", function() {
  return Gulp.src(["./images/**/*"])
    .pipe(Gulp.dest("./static/images"));
});

Gulp.task("frontend:bundle-vendors", function() {
  // $ browserify -d -r react -r baobab [-r ...] -o ./static/scripts/vendors.js
  let args = ["-d"]
    .concat(interleaveWith(libraries, "-r"))
    .concat(["-o", "./static/scripts/vendors.js"]);

  let bundler = ChildProcess.spawn("browserify", args);
  bundler.stdout.pipe(process.stdout);
  bundler.stderr.pipe(process.stderr);
  bundler.on("exit", function(code) {
    if (exitOnError && code) {
      process.exit(code);
    }
  });
});

Gulp.task("frontend:bundle-app", function() {
  // $ browserify -d -x react -x baobab [-x ...] ./frontend/app/app.js -o ./static/scripts/app.js
  let args = ["-d"]
    .concat(interleaveWith(libraries, "-x"))
    .concat(["./frontend/app/app.js"])
    .concat(["-o", "./static/scripts/app.js"]);

  let bundler = ChildProcess.spawn("browserify", args);
  bundler.stdout.pipe(process.stdout);
  bundler.stderr.pipe(process.stderr);
  bundler.on("exit", function(code) {
    if (exitOnError && code) {
      process.exit(code);
    }
  });
});

Gulp.task("frontend:watchify", function() {
  // $ watchify -v -d -x react -x reflux [-x ...] ./frontend/app/app.js -o ./static/scripts/app.js
  let args = ["-v", "-d", "--delay 0"]
    .concat(interleaveWith(libraries, "-x"))
    .concat(["./frontend/app/app.js"])
    .concat(["-o", "./static/scripts/app.js"]);

  let watcher = ChildProcess.spawn("watchify", args);
  watcher.stdout.pipe(process.stdout);
  watcher.stderr.pipe(process.stderr);
});

// TASK DEPENDENCIES ===============================================================================
Gulp.task("frontend:dist", [
  "frontend:bundle-app",
  "frontend:dist-scripts",
  "frontend:dist-images",
  "frontend:dist-styles",
]);

Gulp.task("frontend:watch", function() {
  Gulp.watch("./frontend/scripts/**/*.js", ["frontend:dist-scripts"]);
  Gulp.watch("./frontend/images/**/*", ["frontend:dist-images"]);
  Gulp.watch("./frontend/styles/**/*.less", ["frontend:dist-styles"]);
});

// GENERAL TASKS ===================================================================================
Gulp.task("default", function() {
  return RunSequence(
    ["backend:nodemon", "frontend:dist"],
    ["frontend:watch", "frontend:watchify"]
  );
});

Gulp.task("devel", function() {
  return RunSequence(
    ["frontend:bundle-vendors", "frontend:dist"],
    "default"
  );
});

// TODO: Gulp.task("lint", ["shared:lint", "backend:lint", "frontend:lint"]);
Gulp.task("dist", function() {
  exitOnError = true;
  return RunSequence(
    ["frontend:bundle-vendors", "frontend:dist"]
  );
});

Gulp.task("config:get", function() {
  let argv = require("yargs").argv;
  let value = Config.get(argv.option);
  //if (value === undefined) {
  //  throw Error(`Undefined option ${argv.option}`);
  //} else {
  console.log(value);
  //}
});
