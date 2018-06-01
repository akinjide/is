/*
    2018-02-08
    This code should be minified before deployment.

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/**
 * Methods.
 */

var methods = {
  'promise': isPromise,
  'generator': isGenerator,
  'generatorFunction': isGeneratorFunction,
  'object': isObject,
  'array': isArray,
  'number': isNumber,
  'string': isString,
  'symbol': isSymbol,
  'boolean': isBoolean,
  'error': isError,
  'infinite': isInfinite,
  'instance': isInstance,
  'regExp': isRegExp,
  'asyncFunction': isAsyncFunction,
  'func': isFunction,
  'undef': isUndefined,
  'nil': isNull,
  'iterable': isIterable,
  'globalContext': isGlobalContext,
  'cyclic': isCyclic,
  'map': isMap,
  'set': isSet,
  'def': isDefined,
  'primitive': isPrimitive,
  'float': isFloat,
  'integer': isInt,
  'boundFunction': isBoundFunction,
  'odd': isOdd,
  'even': isEven,
  'finite': isFinite,
  'prime': isPrime,
  'executable': isExecutable
};


/**
 * `is`.
 *
 * @param {Collection} col
 * @return {Collection}
 * @api public
 */

module.exports = methods;


/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}

/**
 * Check for plain array.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isArray(val) {
  return Array == val.constructor || Array.isArray.call(null, val);;
}

/**
 * Check for plain number.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isNumber(val) {
  return Number == val.constructor;
}

/**
 * Check for plain string.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isString(val) {
  return String == val.constructor;
}

/**
 * Check for plain symbol.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isSymbol(val) {
  return Symbol == val.constructor;
}

/**
 * Check for plain boolean.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isBoolean(val) {
  return Boolean == val.constructor;
}

/**
 * Check for plain error.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isError(val) {
  return Error == val.constructor;
}

/**
 * Check for plain infinity.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isInfinite(val) {
  return val == Infinity || val == -Infinity;
}

/**
 * Check for instance.
 *
 * @param {Mixed} val
 * @param {Constructor} constructor
 * @return {Boolean}
 * @api private
 */

function isInstance(val, constructor) {
  return val instanceof constructor;
}

/**
 * Check for plain regex.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isRegExp(val) {
  return RegExp == val.constructor;
}

/**
 * Check if `obj` is a async function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isAsyncFunction(obj) {
  var constructor = obj.constructor;

  if (!constructor) return false;
  if ('AsyncFunction' === constructor.name || 'AsyncFunction' === constructor.displayName) return true;
  return false;
}

/**
 * Check if `obj` is a function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isFunction(obj) {
  var constructor = obj.constructor;

  if (!constructor) return false;
  if ('Function' === constructor.name || 'Function' === constructor.displayName) return true;
  return isGeneratorFunction(obj) || isAsyncFunction(obj);
}

/**
 * Check for plain undefined.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isUndefined(val) {
  return val == void(0);
}

/**
 * Check for plain null.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isNull(val) {
  return val == null;
};

/**
 * Check for iterable protocol.
 *
 * iterable means value implements
 * the iteration protocol.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isIterable(obj) {
  if (isUndefined(obj)) return false;
  if (isNull(obj)) return false;
  return typeof obj[Symbol.iterator] == 'function';
}

/**
 * Check if `obj` is a global/window ctx.
 *
 * @param {this} obj
 * @return {Boolean}
 * @api private
 */

function isGlobalContext(obj) {
  var constructor = obj.__proto__.constructor;

  if (!isCyclic(obj)) return false;
  if ('Window' === constructor.name || 'Window' === constructor.displayName) return true;
  if ('node' === obj.process.title && obj.process.env && obj.require) return true;
  return false;
}

/**
 * Check for circular reference.
 *
 * series of references where last
 * object references the first,
 * resulting in a closed loop.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isCyclic(obj) {
  var spy = [];

  function inspect(obj) {
    if (obj && typeof obj == 'object') {
      if (spy.indexOf(obj) != -1) return true;
      spy.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && inspect(obj[key])) return true;
      }
    }

    return false;
  }

  return inspect(obj);
}

/**
 * Check for plain map.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isMap(val) {
  return Map == val.constructor;
}

/**
 * Check for plain set.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isSet(val) {
  return Set == val.constructor;
}

/**
 * Check for plain defined.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isDefined(val) {
  return !isUndefined(val);
}

/**
 * Check for primitives.
 *
 * ECMAScript standard defines six data types that are primitives:
 * Boolean, Null, Undefined, Number, String, Symbol (new in ECMAScript 6)
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isPrimitive(val) {
  switch (typeof val) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
      return true;
    default:
      return isNull(val);
  }
}

/**
 * Check if `val` is a float.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isFloat(val) {
  if (!isNumber(val)) return false;
  if (isInfinite(val)) return false;
  return val % 1 != 0;
}

/**
 * Check if `val` is an integer.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isInt(val) {
  if (!isNumber(val)) return false;
  if (isInfinite(val)) return false;
  return val % 1 == 0;
}

/**
 * Check if `obj` is a bounded function.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isBoundFunction(obj) {
  if (!isFunction(obj)) return false;
  return !obj.hasOwnProperty('prototype');
}

/**
 * Check if `val` is even.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isEven(val) {
  if (!isNumber(val)) return false;
  if (isInfinite(val)) return false;
  return val % 2 == 0;
}

/**
 * Check if `val` is odd.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isOdd(val) {
  if (!isNumber(val)) return false;
  if (isInfinite(val)) return false;
  return val % 2 != 0;
}

/**
 * Check if `val` is finite.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isFinite(val) {
  if (!isNumber(val)) return false;
  if (isInfinite(val)) return false;
  return true;
}

/**
 * def:
 *   No even number `n` greater than 2 is prime because any such number can
 *   be expressed as the product `2 × n / 2`. Therefore, every prime number
 *   other than 2 is an odd number, and is called an odd prime (Wikipedia).
 *
 * Check if `val` is prime.
 *
 * @param {Number} val
 * @return {Boolean}
 * @api private
 */

function isPrime(val) {
  if (!isNumber(val)) return false;
  for (var i = 2; i < val; i++) {
    if (val % i == 0) return false;
  }

  return val > 1;
}

/**
 * Check if `val` is executable/invokeable/callable.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isExecutable(val) {
  if (isUndefined(val)) return false;
  if (isObject(val)) return false;
  if (!isFunction(val)) return false;
  return true;
}