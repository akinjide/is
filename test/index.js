
/**
 * Module dependencies.
 */

var assert = require('assert');
var is = require('..');
var size = require('size');

describe('queries', function() {
  it('should work', function(done) {
    var promise = size({
      bytes: 330307828,
      decimals: 1
    });

    var actual = is.promise(promise);
    var expected = true;
    assert.equal(actual, expected);
    done();
  });
});
