#!/usr/bin/env node

(function() {
  'use strict';

  var ccs = require('closure-compiler-service');
  var fs = require('fs');

  // write output to console if called from command line
  if (process.argv.length === 3) {
    var filename = process.argv[2];

    var js_code = fs.readFile(filename, function(err, buf) {
      if (err) { die(err); }

      ccs.compile(buf.toString(), function(errs, code) {
        if (errs) { die(errs); }
        console.log(code);
      });
    });
  }
})();
