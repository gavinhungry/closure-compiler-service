closure-compiler-service
========================
Compile JavaScript with the Google [Closure compiler service](\
https://developers.google.com/closure/compiler/docs/api-ref).  No Java
dependency.


Installation
------------

    # npm -g install closure-compiler-service


Usage
-----

### Command Line

Output is written to stdout, and can thus be redirected to a file:

    $ closure-service input.js > input.min.js


### Module

    var ccs = require('closure-compiler-service');

    var input = fs.readFileSync('input.js');
    ccs.compile(input, function(errs, code) {
      // `code` is the compiled result
    });

`ccs.compile` optionally takes an options object as the second argument (before
the callback function), which are passed to the API:

    ccs.compile(input, {
      compilation_level: 'WHITESPACE_ONLY'
    }, function(errs, code) {
      // ...
    });


### Default Options

    output_format     = 'json' // don't change this!
    output_info       = ['compiled_code', 'errors']
    compilation_level = 'SIMPLE_OPTIMIZATIONS'


License
-------
Released under the terms of the
[MIT license](http://tldrlegal.com/license/mit-license). See **LICENSE**.
