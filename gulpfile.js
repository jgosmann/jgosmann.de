const changed = require("gulp-changed");
const child_process = require("child_process");
const faviconsStream = require("favicons").stream;
const fs = require("fs");
const ghPages = require("gulp-gh-pages");
const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const path = require("path");
const responsive = require("gulp-responsive");
const webpackStream = require("webpack-stream");

const clean = () => {
  return del(["./public"]);
};
exports.clean = clean;

const favicons = () => {
  const dest = "./favicons";
  const metafile = "./assets/meta.html";
  return gulp
    .src("./assets/svg/favicon.svg")
    .pipe(
      changed(dest, {
        transformPath: _ => {
          return metafile;
        }
      })
    )
    .pipe(
      faviconsStream(
        {
          appName: "Jan Gosmann",
          developerName: "Jan Gosmann",
          developerURL: "https://www.jgosmann.de",
          start_url: "/",
          icons: {
            appleStartup: false,
            coast: false,
            firefox: false,
            yandex: false
          }
        },
        html => {
          fs.writeFile(metafile, html.join(""), err => {
            if (err) {
              return console.log(err);
            }
          });
        }
      )
    )
    .pipe(gulp.dest(dest));
};
exports.favicons = favicons;

const responsiveBackgrounds = () => {
  return gulp
    .src("./assets/backgrounds/*.{png,jpg}")
    .pipe(
      responsive(
        {
          "code.png": [
            {
              width: 320,
              rename: { suffix: "-320" },
              extractBeforeResize: {
                left: 0,
                top: 0,
                width: 320,
                height: 231
              }
            },
            {
              width: 640,
              rename: { suffix: "-640" },
              extractBeforeResize: {
                left: 0,
                top: 0,
                width: 640,
                height: 640
              }
            },
            {
              width: 1280,
              rename: { suffix: "-1280" },
              extractBeforeResize: {
                left: 0,
                top: 0,
                width: 1280,
                height: 903
              }
            },
            {
              width: 1578,
              rename: { suffix: "-full" },
              extractBeforeResize: {
                left: 0,
                top: 0,
                width: 1578,
                height: 903
              }
            }
          ],
          "climb.jpg": [
            {
              width: 320,
              rename: { suffix: "-s" }
            },
            {
              width: 640,
              rename: { suffix: "-m" }
            },
            {
              width: 1280,
              rename: { suffix: "-l" }
            },
            {
              width: 2560,
              rename: { suffix: "-xl" }
            }
          ]
        },
        { errorOnEnlargement: false }
      )
    )
    .pipe(gulp.dest("./static/bg"));
};

const responsiveImages = () => {
  return gulp
    .src("./assets/img/*.{png,jpg}")
    .pipe(responsive({ "headshot.jpg": [{ width: 256, quality: 90 }] }))
    .pipe(gulp.dest("./static"));
};

const responsiveProjects = () => {
  return gulp
    .src("./assets/projects/*.{png,jpg}")
    .pipe(responsive({ "*": [{ width: 800 }] }, { errorOnEnlargement: false }))
    .pipe(gulp.dest("./static/projects"));
};

const webpack = () => {
  return gulp
    .src(["./assets/js/main.js", "./assets/js/crypted.js"])
    .pipe(webpackStream(require("./webpack.config.js")))
    .pipe(gulp.dest("./lib"));
};
exports.webpack = webpack;

const watchAssets = () => {
  gulp.watch("./assets/svg/favicon.svg", favicons);
  gulp.watch("./assets/backgrounds/**/*", responsiveBackgrounds);
  gulp.watch("./assets/img/**/*", responsiveImages);
  gulp.watch("./assets/projects/**/*", responsiveProjects);
  gulp.watch("./assets/js/**/*", webpack);
};
exports.watchAssets = watchAssets;

const hugo = async () => {
  const isFingerprinted = dirent => {
    return [".js", ".js.map", ".css"].some(suffix =>
      dirent.name.endsWith(suffix)
    );
  };

  for (const public_path of ["./public", "./public/js"]) {
    const public_dir = await fs.promises.opendir(public_path);
    for await (const dirent of public_dir) {
      if (isFingerprinted(dirent)) {
        await fs.promises.unlink(path.join(public_path, dirent.name));
      }
    }
  }

  await child_process.execFile("hugo", { stdio: "inherit" });
};
exports.hugo = hugo;

const hugoServer = () => {
  const hugo = child_process.spawn("hugo", ["server"]);
  hugo.stdout.on("data", data => {
    const lines = data.toString().split("\n");
    for (let i = 0; i < lines.length; ++i) {
      console.log(`[hugo] ${lines[i]}`);
    }
  });
  hugo.stderr.on("data", data => {
    const lines = data.toString().split("\n");
    for (let i = 0; i < lines.length; ++i) {
      console.error(`[hugo] ${lines[i]}`);
    }
  });
  return hugo;
};
exports.hugoServer = hugoServer;

const deploy = () => {
  return child_process.execFile(
    "rsync",
    [
      "-avz",
      "--delete",
      "--checksum",
      "public/",
      "jgosmann@hyper-world.de:~/jgosmann"
    ],
    { stdio: "inherit" }
  );
};
exports.deploy = deploy;

const responsiveAssets = gulp.parallel(
  responsiveBackgrounds,
  responsiveImages,
  responsiveProjects
);
exports.responsiveAssets = responsiveAssets;

exports.server = gulp.parallel(watchAssets, hugoServer);
exports.build = gulp.series(
  gulp.parallel(favicons, responsiveAssets, webpack),
  hugo
);
exports.default = exports.build;
