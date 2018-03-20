[![Build Status][travis-svg]][travis-url]

# IS

`is` is a type checking for JavaScript.


# Installation

```bash
yarn add is // npm install is
```

# Usage
```javascript
...
is.
...
```

# Example

```javascript
var is = require('./');
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

console.log(is.promise(promise)); // Output: true
console.log(is.generatorFunction(generator(10))); // Output: true
console.log(is.regExp(/\.js$/)); // Output: true
console.log(is.cyclic(x)); // Output: true
```

Full example [here](https://github.com/akinjide/is/blob/master/example.js)

# API

All exposed API return Boolean while taking in single argument as parameters for execution. 

Except `instance` API takes in two arguments, `val` and `constructor` as parameters when invoked.

- [is](https://github.com/akinjide/is/blob/master/index.js#L1)
  - [`.promise(value)`](https://github.com/akinjide/is/blob/master/index.js#L63)
  - [`.generator(value)`](https://github.com/akinjide/is/blob/master/index.js#L75)
  - [`.generatorFunction(value)`](https://github.com/akinjide/is/blob/master/index.js#L87)
  - [`.object(value)`](https://github.com/akinjide/is/blob/master/index.js#L102)
  - [`.array(value)`](https://github.com/akinjide/is/blob/master/index.js#L114)
  - [`.number(value)`](https://github.com/akinjide/is/blob/master/index.js#L126)
  - [`.string(value)`](https://github.com/akinjide/is/blob/master/index.js#L138)
  - [`.symbol(value)`](https://github.com/akinjide/is/blob/master/index.js#L150)
  - [`.boolean(value)`](https://github.com/akinjide/is/blob/master/index.js#L162)
  - [`.error(value)`](https://github.com/akinjide/is/blob/master/index.js#L174)
  - [`.infinite(value)`](https://github.com/akinjide/is/blob/master/index.js#L186)
  - [`.instance(value)`](https://github.com/akinjide/is/blob/master/index.js#L199)
  - [`.regExp(value)`](https://github.com/akinjide/is/blob/master/index.js#L211)
  - [`.func(value)`](https://github.com/akinjide/is/blob/master/index.js#L239)
  - [`.asyncFunction(value)`](https://github.com/akinjide/is/blob/master/index.js#L223)
  - [`.undef(value)`](https://github.com/akinjide/is/blob/master/index.js#L255)
  - [`.nil(value)`](https://github.com/akinjide/is/blob/master/index.js#L267)
  - [`.iterable(value)`](https://github.com/akinjide/is/blob/master/index.js#L282)
  - [`.globalContext(value)`](https://github.com/akinjide/is/blob/master/index.js#L296)
  - [`.cyclic(value)`](https://github.com/akinjide/is/blob/master/index.js#L317)
  - [`.map(value)`](https://github.com/akinjide/is/blob/master/index.js#L343)
  - [`.set(value)`](https://github.com/akinjide/is/blob/master/index.js#L355)
  - [`.def(value)`](https://github.com/akinjide/is/blob/master/index.js#L367)
  - [`.primitive(value)`](https://github.com/akinjide/is/blob/master/index.js#L382)
  - [`.float(value)`](https://github.com/akinjide/is/blob/master/index.js#L403)
  - [`.integer(value)`](https://github.com/akinjide/is/blob/master/index.js#L417)
  - [`.boundFunction(value)`](https://github.com/akinjide/is/blob/master/index.js#L417)


# Disclaimer

This is package is not minified.

# Author
Akinjide Bankole
r@akinjide.me

2018-02-09

# License

MIT

[travis-svg]: https://travis-ci.org/akinjide/is.svg?branch=master
[travis-url]: https://travis-ci.org/akinjide/is
