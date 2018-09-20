/**
 * Module dependencies.
 */


var is = require('./');
var ASSERT = require('assert');
var size = require('size');
var x = {};
x.x = x;

var promise = size({
  bytes: 330307828,
  decimals: 1
});

function* generator(i) {
  yield i;
  yield i + 10;
}

size({
  bytes: 330307828,
  decimals: 1
}, is.callback.bind(null, fn));

function fn(err, result, callback) {
  ASSERT.ok(result == '330.3 MB', 'expect 330.3 MB; actual ' + result);
  ASSERT.ok(err == null, 'expect null; actual ' + err);
  ASSERT.ok(callback == true);
}

ASSERT.ok(is.promise(promise) == true, 'isPromise');
ASSERT.ok(is.generatorFunction(generator(10)) == true, 'isGeneratorFunction');
ASSERT.ok(is.regExp(/\.js$/) == true, 'isRegExp');
ASSERT.ok(is.cyclic(x) == true, 'isCyclic');

function hello(value, callback) {
  var prefix = 'Hello, ';
  var actual = prefix + value;
  callback();
}

hello('World', is.callback);
ASSERT.ok(is.callback.value == false, 'isCallback');