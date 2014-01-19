/*global describe, it*/
"use strict";

var fs = require("fs"),
  gulp = require('gulp'),
  join = require('path').join,
  should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
  mversion = require("../");

describe("gulp-mversion", function () {

  var expectedFile = new gutil.File({
    path: "test/expected/package.json",
    cwd: "test/",
    base: "test/expected",
    contents: fs.readFileSync("test/expected/package.json")
  });

  it("should produce expected file via buffer", function (done) {

    var srcFile = new gutil.File({
      path: "test/fixtures/package.json",
      cwd: "test/",
      base: "test/fixtures",
      contents: fs.readFileSync("test/fixtures/package.json")
    });

    var stream = mversion("minor");

    stream.on("error", function(err) {
      should.exist(err);
      done(err);
    });

    stream.on("data", function (newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);
      var actual = JSON.parse(newFile.contents.toString());
      var expected = JSON.parse(expectedFile.contents.toString());
      should.exist(actual.version);
      actual.version.should.equal(expected.version);
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it("should update all package files", function (done) {
    var instream = gulp.src(join(__dirname, 'fixtures/*.json'));
    var expected = "1.0.0";
    var stream = mversion(expected);

    var numCalls = 0;

    stream.on("data", function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      var actual = JSON.parse(newFile.contents.toString());
      should.exist(actual.version);
      actual.version.should.equal(expected);

      ++numCalls;
    });

    stream.on('end', function () {
      numCalls.should.equal(2);
      done();
    });

    instream.pipe(stream);
  });


});
