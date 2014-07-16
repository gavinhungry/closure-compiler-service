(function() {
  'use strict';

  var request = require('request');

  // https://developers.google.com/closure/compiler/docs/api-ref
  var API = 'https://closure-compiler.appspot.com/compile';

  var compile = function(js_code, callback, opts) {

    opts = opts || {};
    opts.compilation_level = opts.compilation_level || 'SIMPLE_OPTIMIZATIONS';

    request.post(API, function(err, res, body) {
      callback(err, body);
    }).form({
      output_format: 'json',
      output_info: 'compiled_code',
      compilation_level: opts.compilation_level,
      js_code: js_code
    });
  };

  module.exports = {
    compile: compile
  };

})();
