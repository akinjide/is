
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
  'cyclic': isCyclic
};


/**
 * `is`.
 *
 * @param {Collection} col
 * @return {Collection}
 * @api public
 */
//
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
 * @param {Mixed} val
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

  if ('Window' === constructor.name || 'Window' === constructor.displayName) return true;
  return isCyclic(obj);
}

/**
 * Check for circular reference.
 *
 * series of references where last
 * object references the first,
 * resulting in a closed loop.
 *
 * @param {this} obj
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