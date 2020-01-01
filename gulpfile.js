const changed = require('gulp-changed');
const child_proc = require('child_process');
const fs = require('fs');
const ghPages = require('gulp-gh-pages');
const gulp = require('gulp');
const faviconsStream = require('favicons').stream;
const responsive = require('gulp-responsive');
const gulpSass = require('gulp-sass');
const webpackStream = require('webpack-stream');

exports.favicons = () => {
    const dest = './favicons';
    const metafile = './assets/meta.html';
    return gulp.src('./assets/svg/favicon.svg')
        .pipe(changed(dest, {transformPath: _ => { return metafile; }}))
        .pipe(faviconsStream({
            appName: 'Jan Gosmann',
            developerName: 'Jan Gosmann',
            developerURL: 'https://www.jgosmann.de',
            start_url: '/',
            icons: {
                appleStartup: false,
                coast: false,
                firefox: false,
                yandex: false
            }
        }, (html) => {
            fs.writeFile(
                metafile, html.join(''),
                (err) => {
                    if(err) {
                        return console.log(err);
                    }
                }
            );
        }))
        .pipe(gulp.dest(dest));
};

exports.responsiveBackgrounds = () => {
    return gulp.src('./assets/backgrounds/*.{png,jpg}')
        .pipe(responsive({
            'code.png': [{
                width: 320,
                rename: { suffix: '-320' },
                extractBeforeResize: {
                    left: 0, top: 0, width: 320, height: 231
                }
            }, {
                width: 640,
                rename: { suffix: '-640' },
                extractBeforeResize: {
                    left: 0, top: 0, width: 640, height: 640
                }
            }, {
                width: 1280,
                rename: { suffix: '-1280' },
                extractBeforeResize: {
                    left: 0, top: 0, width: 1280, height: 903
                }
            }, {
                width: 1578,
                rename: { suffix: '-full' },
                extractBeforeResize: {
                    left: 0, top: 0, width: 1578, height: 903
                },
            }],
            'climb.jpg': [{
                width: 320,
                rename: { suffix: '-s' }
            }, {
                width: 640,
                rename: { suffix: '-m' }
            }, {
                width: 1280,
                rename: { suffix: '-l' }
            }, {
                width: 2560,
                rename: { suffix: '-xl' }
            }]
        }, { errorOnEnlargement: false }))
        .pipe(gulp.dest('./static/bg'));
};

exports.responsiveImages = () => {
    return gulp.src('./assets/img/*.{png,jpg}')
        .pipe(responsive({'headshot.jpg': [{ width: 256, quality: 90 }]}))
        .pipe(gulp.dest('./static'));
};

exports.responsiveProjects = () => {
    return gulp.src('./assets/projects/*.{png,jpg}')
        .pipe(responsive(
            {'*': [{ width: 800 }]},
            { errorOnEnlargement: false }))
        .pipe(gulp.dest('./static/projects'));
};

exports.webpack = () => {
    return gulp.src('./assets/ts/main.ts')
        .pipe(webpackStream(require('./webpack.config.js')))
        .pipe(gulp.dest('./lib'));
};

exports.watchAssets = () => {
    return gulp.watch('./assets/**/*', gulp.parallel(exports.default));
};

exports.hugoBuild = () => {
    const hugo = child_proc.execFile('hugo');
    hugo.stdout.pipe(process.stdout);
    hugo.stderr.pipe(process.stderr);
    return hugo;
};

exports.hugoServer = () => {
    const hugo = child_proc.spawn('hugo', ['server']);
    hugo.stdout.on('data', (data) => {
        const lines = data.toString().split('\n');
        for (let i = 0; i < lines.length; ++i) {
            console.log(`[hugo] ${lines[i]}`);
        }
    });
    hugo.stderr.on('data', (data) => {
        const lines = data.toString().split('\n');
        for (let i = 0; i < lines.length; ++i) {
            console.error(`[hugo] ${lines[i]}`);
        }
    });
    return hugo;
};

exports.default = gulp.series(
    gulp.parallel(
        exports.favicons,
        exports.responsiveBackgrounds,
        exports.responsiveImages,
        exports.responsiveProjects,
        exports.webpack
    ),
    exports.hugoBuild
);

exports.server = gulp.series(exports.default, gulp.parallel(
    exports.watchAssets, exports.hugoServer));

exports.deploy = gulp.series(exports.default, async () => {
  child_proc.execFileSync(
    'rsync', [
      '-avz', '--delete', '--checksum',
      'public/', 'jgosmann@hyper-world.de:~/jgosmann'
    ],
    { stdio: 'inherit' }
  );
});
