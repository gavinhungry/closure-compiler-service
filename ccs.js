(function() {
  'use strict';

  var ccs = {};

  var request = require('request');
  var querystring = require('querystring');

  // https://developers.google.com/closure/compiler/docs/api-ref
  var API_URI = 'https://closure-compiler.appspot.com/compile';

  // https://github.com/mikeal/request/issues/644
  var API = API_URI + '?' + querystring.encode({
    output_info: ['compiled_code', 'errors']
  });

  /**
   * Compile a string of JavaScript with the Closure compiler service
   *
   * @param {String} js_code - JavaScript code to compile
   * @param {Object} [opts] - API options
   * @param {Function} callback(errors, code)
   */
  ccs.compile = function(js_code, opts, callback) {
    opts = opts || {};
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

      var errors = (result && result.errors) ? result.errors : ex;
      var code = (result && result.compiledCode) ? result.compiledCode : '';
      callback(errors, code);
    }).form(opts);
  };

  module.exports = ccs;
})();
