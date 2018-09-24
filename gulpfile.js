const changed = require('gulp-changed');
const child_proc = require('child_process');
const fs = require('fs');
const gulp = require('gulp');
const favicons = require('favicons').stream;
const responsive = require('gulp-responsive');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

gulp.task('favicons', () => {
    const dest = './static/favicons';
    const metafile = dest + '/meta.html';
    return gulp.src('./assets/svg/favicon.svg')
        .pipe(changed(dest, {transformPath: _ => { return metafile; }}))
        .pipe(favicons({
            appName: 'Jan Gosmann',
            developerName: 'Jan Gosmann',
            developerURL: 'https://jgosmann.de',
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
});

gulp.task('responsive-backgrounds', () => {
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
});

gulp.task('responsive-images', () => {
    return gulp.src('./assets/img/*.{png,jpg}')
        .pipe(responsive({'headshot.jpg': [{ width: 256, quality: 90 }]}))
        .pipe(gulp.dest('./static'));
});

gulp.task('responsive-projects', () => {
    return gulp.src('./assets/projects/*.{png,jpg}')
        .pipe(responsive(
            {'*': [{ width: 800 }]},
            { errorOnEnlargement: false }))
        .pipe(gulp.dest('./static/projects'));
});

gulp.task('sass', () => {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static'));
});

gulp.task('webpack', () => {
    return gulp.src('./assets/ts/main.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./static/js'));
});

gulp.task('watch:assets', () => {
    return gulp.watch('./assets/**/*', gulp.parallel('default'));
});

gulp.task('hugo:build', () => {
    const hugo = child_proc.execFile('hugo');
    hugo.stdout.pipe(process.stdout);
    hugo.stderr.pipe(process.stderr);
    return hugo;
});

gulp.task('hugo:server', () => {
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
});


gulp.task('default', gulp.series(
    gulp.parallel(
        'favicons',
        'responsive-backgrounds',
        'responsive-projects',
        'sass',
        'webpack'
    ),
    'hugo:build'
));

gulp.task('server', gulp.series('default', gulp.parallel(
    'watch:assets', 'hugo:server')));
