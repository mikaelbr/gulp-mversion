# gulp-mversion
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Dependency Status][depstat-image]][depstat-url]

> mversion plugin for [gulp](https://github.com/wearefractal/gulp)

Bump module versions across different package managers. See [mversion](https://github.com/mikaelbr/mversion) for more information.


## Usage

First, install `gulp-mversion` as a development dependency:

```shell
npm install --save-dev gulp-mversion
```

Then, add it to your `gulpfile.js`:

```javascript
var mversion = require("gulp-mversion");

gulp.src("./*.json")
  .pipe(mversion("minor"))
  .pipe(gulp.dest("./"));

// Updates package.json, component.json, bower.json etc.
```

## API

### mversion(version)

#### version
Type: `String`  
Default: undefined

The version to update to or version name to bump.

Examples: "majon", "minor", "patch", "build", "0.1.0", "1.0.3-beta".

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-mversion
[npm-image]: https://badge.fury.io/js/gulp-mversion.png

[travis-url]: http://travis-ci.org/mikaelbr/gulp-mversion
[travis-image]: https://secure.travis-ci.org/mikaelbr/gulp-mversion.png?branch=master

[depstat-url]: https://david-dm.org/mikaelbr/gulp-mversion
[depstat-image]: https://david-dm.org/mikaelbr/gulp-mversion.png
