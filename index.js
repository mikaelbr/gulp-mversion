var through = require("through2"),
    gutil = require("gulp-util"),
    version = require("mversion");

var files = version._files;

module.exports = function (ver) {
    "use strict";

    if (!ver) {
      throw new gutil.PluginError("gulp-mversion", "No version bump given.");
    }

    function mversion(file, enc, cb) {
        if (file.isNull()) {
          this.push(file);
          return cb();
        }

        if (file.isStream()) {
          this.emit("error", new gutil.PluginError("gulp-mversion", "Stream content is not supported"));
          return cb();
        }

        if(!version.isPackageFile(file.relative)) {
          this.push(file);
          return cb();
        }

        if (file.isBuffer()) {
          var json = JSON.parse(file.contents.toString());
          json = version.updateJSON(json, ver);

          file.contents = new Buffer(JSON.stringify(json, null, 2));
          this.push(file);
        }
        return cb();
    }

    return through.obj(mversion);
};
