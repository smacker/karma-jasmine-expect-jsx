'use strict';

var chalk = require('chalk');
var ctx = new chalk.constructor({ enabled: true });

function highlight(message) {
  var parts = message.split('\n');
  var part;

  for (var i = 0; i < parts.length; i++) {
    part = parts[i];
    if (part.indexOf('+') === 0) {
      parts[i] = ctx.green(part);
    } else if (part.indexOf('-') === 0) {
      parts[i] = ctx.red(part);
    }
  }

  return parts.join('\n');
}

function JasmineExpectJSXReporter(baseReporterDecorator, config) {
  var self = this;

  // Extend Karma Base reporter
  baseReporterDecorator(self);

  // Check if reporter is last in the list of config reporters
  var reporterName = 'jasmine-expect-jsx';
  var hasTrailingReporters = config.reporters.slice(-1).pop() !== reporterName;

  // Override Base reporter method
  // Replace original message with highlighted one
  var originalSpecFailure = self.specFailure;

  self.specFailure = function(browser, result) {
    result.log = result.log.map(function(message) {
      return highlight(message);
    });

    // If reporter is last in the list of reporters from config
    // then invoke Karma's Base reporter. Basically this reporter
    // just changes the message, but does not output info by itself,
    // so one could use any reporter and still have highlighted diff.
    if (!hasTrailingReporters) {
      originalSpecFailure.call(self, browser, result);
    }
  };

  // In case, when multiple reporters are used in conjunction
  // with karma-jasmine-expect-jsx, they both will show repetitive log
  // messages when displaying everything that supposed to write to terminal.
  // So just suppress any logs from karma-jasmine-expect-jsx, because
  // it is an utility reporter by doing nothing on browser log,
  // unless it's alone in the "reporters" option and base reporter is used.
  if (hasTrailingReporters) {
    self.writeCommonMsg = function() {};
  }
}

function JasmineExpectJSXFramework(files) {
  function insertAfter(array, index, item) {
    array.splice(index + 1, 0, item);
  }

  function isJasmine(file) {
    return (
      file.pattern.search(/karma\-jasmine(\/|\\)lib(\/|\\)adapter\.js/) !== -1
    );
  }

  function indexOfJasmine(files) {
    for (var i = 0, len = files.length; i < len; i++) {
      if (isJasmine(files[i])) {
        return i;
      }
    }
    return -1;
  }

  var index = indexOfJasmine(files);

  if (index !== -1) {
    files.splice(index + 2, 0, {
      pattern: require.resolve('jasmine-expect-jsx/dist/jasmine-expect-jsx.js'),
      included: true,
      served: true,
      watched: false
    });
  } else {
    throw new Error(
      '"jasmine" needs to appear before "jasmine-expect-jsx" in the "frameworks" array of your Karma configuration.'
    );
  }
}

JasmineExpectJSXFramework.$inject = ['config.files'];

module.exports = {
  'reporter:jasmine-expect-jsx': ['type', JasmineExpectJSXReporter],
  'framework:jasmine-expect-jsx': ['factory', JasmineExpectJSXFramework]
};
