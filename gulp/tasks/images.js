import webp from "gulp-webp";
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(app.plugins.if(
            app.isBuild, imagemin(
                [
                    gifsicle({interlaced: true}),
                    mozjpeg({quality: 75, progressive: true}),
                    optipng({optimizationLevel: 5}),
                    svgo({
                        plugins: [
                            {
                                name: 'removeViewBox',
                                active: true
                            },
                            {
                                name: 'cleanupIDs',
                                active: false
                            }
                        ]
                    })
                ])))
        .pipe(webp())
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream());
}
