/**
 * Module dependencies.
 */


var is = require('./');
var size = require('size');

var promise = size({
  bytes: 330307828,
  decimals: 1
});

function* generator(i) {
  yield i;
  yield i + 10;
}

console.log(is.promise(promise));
console.log(is.generatorFunction(generator(10)));