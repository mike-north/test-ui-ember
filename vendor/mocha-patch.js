/**
 * Turn the first invocation of `mocha.run` into a no-op
 */
(function() {
  var originalRun = mocha.run;
  mocha.run = function() {
    mocha.run = originalRun;
  };
}());
