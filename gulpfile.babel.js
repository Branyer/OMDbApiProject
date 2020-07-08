
//HTML
import htmlmin from 'gulp-htmlmin';

//CSS 
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';

//javascript
import gulp, { dest } from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

//SASS 
import sass from 'gulp-sass';

//PUG
import pug from 'gulp-pug';

const cssPlugins = [autoprefixer(), cssnano()];

gulp.task('html-min', () => 
    gulp
        .src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public'))
);

gulp.task('sass', () => 
    gulp
        .src('./src/scss/styles.scss')
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(gulp.dest('./src/css'))
);

gulp.task('styles', () => 
    gulp
        .src('./src/css/*.css')
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
);

gulp.task('pug', () => 
    gulp
        .src('./src/views/pages/*.pug')
        .pipe(pug({
            pretty : true
        }))
        .pipe(gulp.dest('./public'))
);

gulp.task('babel', () => 
    gulp
        .src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('./public/js'))
);

gulp.task('default', () => {
    // gulp.watch('./src/*.html', gulp.series('html-min'))
    gulp.watch('./src/views/pages/*.pug', gulp.series('pug'))
    gulp.watch('./src/scss/styles.scss', gulp.series('sass'))
    gulp.watch('./src/css/*.css', gulp.series('styles'))
    gulp.watch('./src/js/*.js', gulp.series('babel'))
});