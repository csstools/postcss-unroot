# UnRoot [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[UnRoot] replaces selectors containing `:root` with `html`. This can be useful for outputting CSS for older browsers like Internet Explorer 8.

```css
/* before */

:root {
    background-color: black;
    color: white;
}

/* after */

html {
    background-color: black;
    color: white;
}
```

## Usage

Follow these steps to use [UnRoot].

Add [UnRoot] to your build tool:

```bash
npm install postcss-unroot --save-dev
```

#### Node

```js
require('postcss-unroot')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [UnRoot] as a PostCSS plugin:

```js
postcss([
    require('postcss-unroot')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [UnRoot] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-unroot')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [UnRoot] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-unroot')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

### Options

#### `method`

Type: `String`  
Default: `'replace'`

##### `replace`
Replace any selectors with `:root` with `html`.
```css
/* before */

:root {
    color: red;
}

/* after */

html {
    color: red;
}
```

##### `copy`
Copy any selectors with `:root` into a cloned rule as `html`.
```css
/* before */

:root {
    color: red;
}

/* after */

html {
    color: red;
}

:root {
    color: red;
}
```

##### `warn`
Warn when a `:root` selector is used.

[ci]: https://travis-ci.org/jonathantneal/postcss-unroot
[ci-img]: https://travis-ci.org/jonathantneal/postcss-unroot.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[UnRoot]: https://github.com/jonathantneal/postcss-unroot
