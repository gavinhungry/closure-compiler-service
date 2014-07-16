/**
 * closure-compiler-service - compile scripts with the Closure compiler service
 * https://github.com/gavinhungry/closure-compiler-service
 */

(function() {
  'use strict';

  var ccs = {};

  var fs = require('fs');
  var request = require('request');
  var querystring = require('querystring');

  // https://developers.google.com/closure/compiler/docs/api-ref
  var API_URI = 'https://closure-compiler.appspot.com/compile';

  // https://github.com/mikeal/request/issues/644
  var API = API_URI + '?' + querystring.encode({
    output_info: ['compiled_code', 'errors']
  });

  var die = function(msg) {
    console.error(msg);
    process.exit(1);
  };

  /**
   * Compile a string of JavaScript with the Closure compiler service
   *
   * @param {String} js_code - JavaScript code to compile
   * @param {Object} [options] - API options
   * @param {Function} callback(errs, code)
   */
  ccs.compile = function(js_code, options, callback) {
    var opts = options || {};
    if (typeof options === 'function') {
      opts = {};
      callback = options;
    }

    opts.compilation_level = opts.compilation_level || 'SIMPLE_OPTIMIZATIONS';
    opts.output_format = opts.output_format || 'json';

    opts.js_code = js_code;

    request.post({ uri: API }, function(err, res, body) {
      var result, ex = null;

      try {
        result = JSON.parse(body);
      } catch(ex) {
        ex = ex;
      }

      var errs = (result && result.errors) ? result.errors : ex;
      var code = (result && result.compiledCode) ? result.compiledCode : '';
      callback(errs, code);
    }).form(opts);
  };

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

  module.exports = ccs;
})();
