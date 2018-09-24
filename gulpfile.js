const changed = require('gulp-changed');
const child_proc = require('child_process');
const fs = require('fs');
const gulp = require('gulp');
const favicons = require('favicons').stream;
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
    gulp.parallel('favicons', 'webpack'),
    'hugo:build'
));

gulp.task('server', gulp.series('default', gulp.parallel(
    'watch:assets', 'hugo:server')));
