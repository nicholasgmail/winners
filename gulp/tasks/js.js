import webpack from "webpack";
import webpackStream from "webpack-stream";
import named from "vinyl-named";

export const js = async () => {
    //конфигурацыя webpack
    let webpackConfig = {
        mode: app.isBuild ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"],
                            compact: false
                        }
                    }
                }
            ]
        }
    }
    try {
        return await app.gulp.src(app.path.src.js, {sourcemaps: true})
            .pipe(named())
            .pipe(app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>"
                })
            ))
            .pipe(webpackStream(webpackConfig, webpack))
            .pipe(app.gulp.dest(app.path.build.js))
            .pipe(app.plugins.browserSync.stream());
    } catch (error) {
        throw new Error(`js ` + error);
    }

}
