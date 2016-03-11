/**
 * ProArray
 * @version 1.2.0
 * @copyright 2015 Nathan Woltman
 * @license MIT https://github.com/nwoltman/pro-array/blob/master/LICENSE.txt
 */

'use strict';

require('string-natural-compare');

function chunkSlice(array, start, end) {
  var length = Math.min(end, array.length) - start;
  var result = new Array(length);

  for (var i = 0; i < length; i++) {
    result[i] = array[start + i];
  }

  return result;
}

function flattenDeepBase(array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];
    if (Array.isArray(value)) {
      flattenDeepBase(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}

function flattenDeepNoCallStack(array) {
  var result = [];
  var stackPointer = null;
  var i = 0;

  for (;;) {
    if (i < array.length) {
      var value = array[i++];
      if (Array.isArray(value)) {
        stackPointer = {array: array, index: i, previous: stackPointer};
        array = value;
        i = 0;
      } else {
        result.push(value);
      }
    } else if (stackPointer) { // Move back up the stack
      array = stackPointer.array;
      i = stackPointer.index;
      stackPointer = stackPointer.previous;
    } else { // Done flattening
      return result;
    }
  }
}

function numericalCompare(a, b) {
  return a - b;
}

function numericalCompareReverse(a, b) {
  return b - a;
}

function reverseNaturalCompare(a, b) {
  return String.naturalCompare(b, a);
}

function reverseNaturalCaseCompare(a, b) {
  return String.naturalCaseCompare(b, a);
}

function xorBase(a, b) {
  var result = [];
  var item;
  var i;

  for (i = 0; i < a.length; i++) {
    item = a[i];
    if (b.indexOf(item) < 0 && result.indexOf(item) < 0) {
      result.push(item);
    }
  }

  for (i = 0; i < b.length; i++) {
    item = b[i];
    if (a.indexOf(item) < 0 && result.indexOf(item) < 0) {
      result.push(item);
    }
  }

  return result;
}

/**
 * @class Array
 * @classdesc The native Array object.
 * @see {@link http://goo.gl/Ijd3ks|MDN JavaScript Array Reference}
 */

var properties = {
  /**
   * Finds the index of a value in a sorted array using a binary search algorithm.
   *
   * If no `compareFunction` is supplied, the `>` and `<` relational operators are used to compare values,
   * which provides optimal performance for arrays of numbers and simple strings.
   *
   * @function Array#bsearch
   * @param {*} value - The value to search for.
   * @param {Function} [compareFunction] - The same type of comparing function you would pass to
   *     [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
   * @returns {number} The index of the value if it is in the array, or `-1` if it cannot be found.
   *     If the search value can be found at multiple indexes in the array, it is unknown which of
   *     those indexes will be returned.
   *
   * @example
   * ['a', 'b', 'c', 'd'].bsearch('c');
   * // -> 2
   *
   * [1, 1, 2, 2].bsearch(2);
   * // -> 2 or 3
   *
   * [1, 2, 3, 4].bsearch(10);
   * // -> -1
   *
   * // Search an array of people sorted by age
   * var finn = {name: 'Finn', age: 12};
   * var jake = {name: 'Jake', age: 28};
   * [finn, jake].bsearch(finn, function(a, b) {
   *   return a.age - b.age;
   * });
   * // -> 0
   *
   * ['img1', 'img2', 'img10', 'img13'].bsearch('img2', String.naturalCompare);
   * // -> 1
   * // `String.naturalCompare` is provided by the string-natural-compare npm module:
   * // https://www.npmjs.com/package/string-natural-compare
   */
  bsearch: function(value, compareFunction) {
    var low = 0;
    var high = this.length;
    var mid;

    if (compareFunction) {
      while (low < high) {
        mid = low + high >>> 1;
        var direction = compareFunction(this[mid], value);
        if (!direction) {
          return mid;
        }
        if (direction < 0) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
    } else {
      while (low < high) {
        mid = low + high >>> 1;
        if (this[mid] === value) {
          return mid;
        }
        if (this[mid] < value) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
    }

    return -1;
  },

  /**
   * Creates an array of elements split into groups the length of `size`. If the array
   * can't be split evenly, the final chunk will be the remaining elements.
   *
   * @function Array#chunk
   * @param {number} [size=1] - The length of each chunk.
   * @returns {Array} An array containing the chunks.
   * @throws {RangeError} Throws when `size` is a negative number.
   *
   * @example
   * [1, 2, 3, 4].chunk(2);
   * // -> [[1, 2], [3, 4]]
   *
   * [1, 2, 3, 4].chunk(3);
   * // -> [[1, 2, 3], [4]]
   */
  chunk: function(size) {
    size = size || 1;

    var numChunks = Math.ceil(this.length / size);
    var result = new Array(numChunks);

    for (var i = 0, index = 0; i < numChunks; i++) {
      result[i] = chunkSlice(this, index, index += size);
    }

    return result;
  },

  /**
   * Removes all elements from the array.
   *
   * @function Array#clear
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var array = [1, 2, 3];
   * array.clear();
   * console.log(array);
   * // -> []
   */
  clear: function() {
    this.length = 0;
    return this;
  },

  /**
   * Creates a shallow copy of the array.
   *
   * @function Array#clone
   * @returns {Array} A clone of the array.
   *
   * @example
   * var a = [1, 2, 3];
   * var b = a.clone();
   * console.log(b, b === a);
   * // -> [1, 2, 3] false
   */
  clone: function() {
    var length = this.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++) {
      result[i] = this[i];
    }

    return result;
  },

  /**
   * Returns a new array with all falsey values removed. Falsey values
   * are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
   *
   * @function Array#compact
   * @returns {Array} The new array containing only the truthy values from the original array.
   *
   * @example
   * [0, 1, false, 2, '', 3].compact();
   * // -> [1, 2, 3]
   */
  compact: function() {
    var result = [];

    for (var i = 0; i < this.length; i++) {
      if (this[i]) {
        result.push(this[i]);
      }
    }

    return result;
  },

  /**
   * Returns a new array with all of the values of the array that are not in
   * any of the input arrays (performs a set difference).
   *
   * @function Array#difference
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} The new array of filtered values.
   *
   * @example
   * [1, 2, 3, 4, 5].difference([5, 2, 10]);
   * // -> [1, 3, 4]
   */
  difference: function() {
    var result = [];

    next: for (var i = 0; i < this.length; i++) {
      var item = this[i];

      for (var j = 0; j < arguments.length; j++) {
        if (arguments[j].indexOf(item) >= 0) {
          continue next;
        }
      }

      // The item was not part of any of the input arrays so it can be added to the result
      result.push(item);
    }

    return result;
  },

  /**
   * @callback Array#each~eachCallback
   * @param {*} value - The current element being processed.
   * @param {number} index - The index of the current element being processed.
   * @param {Array} array - The array {@link Array#each|`.each()`} was called on.
   */
  /**
   * Invokes a callback function on each element in the array.
   *
   * A generic iterator method similar to [`.forEach()`](http://goo.gl/n6z5Jz) but with the following differences:
   *
   * 1. `this` always refers to the current element in the iteration (the `value` argument to the callback).
   * 2. Returning `false` in the callback will cancel the iteration (similar to a `break` statement).
   * 3. The array is returned to allow for function chaining.
   * 4. The callback __is__ invoked for indexes that have been deleted or elided unless `safeIteration` is `true`.
   *
   * @function Array#each
   * @param {Array#each~eachCallback} callback - A function to be executed on each element in the array.
   * @param {boolean} [safeIteration=false] - When `true`, the callback will not be invoked
   *     for indexes that have been deleted or elided (are undefined).
   * @returns {Array} The array this method was called on.
   *
   * @example
   * ['a', 'b', 'c'].each(console.log.bind(console));
   * // -> 'a' 0 ['a', 'b', 'c']
   * // -> 'b' 1 ['a', 'b', 'c']
   * // -> 'c' 2 ['a', 'b', 'c']
   * // -> ['a', 'b', 'c']
   *
   * ['a', 'b', 'c'].each(function(value, index) {
   *   console.log(value);
   *   if (index === 1) return false;
   * });
   * // -> 'a'
   * // -> 'b'
   * // -> ['a', 'b', 'c']
   *
   * [[1, 2], [3, 4, 5]].each(Array.prototype.pop);
   * // -> [[1], [3, 4]]
   *
   * new Array(1).each(console.log.bind(console));
   * // -> undefined 0 [undefined]
   * // -> [undefined]
   *
   * new Array(1).each(console.log.bind(console), true);
   * // -> [undefined]
   */
  each: function(callback, safeIteration) {
    var i = 0;

    if (safeIteration)
      while (i < this.length && (!(i in this) || callback.call(this[i], this[i], i, this) !== false)) ++i;
    else
      while (i < this.length && callback.call(this[i], this[i], i++, this) !== false);

    return this;
  },

  /**
   * Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.
   *
   * __Note:__ The order of elements in the arrays __does__ matter. The elements must be found in the same order
   * for the arrays to be considered equal.
   *
   * @function Array#equals
   * @param {Array} array - An array to compare for equality.
   * @returns {boolean} `true` if the arrays are equal, `false` otherwise.
   *
   * @example
   * var array = [1, 2, 3];
   *
   * array.equals(array);
   * // -> true
   *
   * array.equals([1, 2, 3]);
   * // -> true
   *
   * array.equals([3, 2, 1]);
   * // -> false
   */
  equals: function(array) {
    if (array === this) {
      return true;
    }

    if (!array || array.length !== this.length) {
      return false;
    }

    for (var i = 0; i < array.length; i++) {
      if (array[i] !== this[i]) {
        return false;
      }
    }

    return true;
  },

  /**
   * Flattens a nested array. If `isDeep` is true, the array is recursively
   * flattened, otherwise it’s only flattened a single level.
   *
   * @function Array#flatten
   * @param {boolean} [isDeep=false] - Specifies a deep flatten.
   * @param {boolean} [noCallStack=false] - Specifies if an algorithm that is not susceptible to call stack limits
   *     should be used, allowing very deeply nested arrays to be flattened. Ignored if `isDeep` is not `true`.
   * @returns {Array} The new flattened array.
   *
   * @example
   * [1, [2, 3, [4]]].flatten();
   * // -> [1, 2, 3, [4]]
   *
   * // using `isDeep`
   * [1, [2, 3, [4]]].flatten(true);
   * // -> [1, 2, 3, 4]
   */
  flatten: function(isDeep, noCallStack) {
    if (isDeep) {
      return this.flattenDeep(noCallStack);
    }

    var result = [];

    for (var i = 0; i < this.length; i++) {
      var value = this[i];
      if (Array.isArray(value)) {
        for (var j = 0; j < value.length; j++) {
          result.push(value[j]);
        }
      } else {
        result.push(value);
      }
    }

    return result;
  },

  /**
   * Recursively flattens a nested array.
   *
   * @function Array#flattenDeep
   * @param {boolean} [noCallStack=false] - Specifies if an algorithm that is not susceptible to call stack limits
   *     should be used, allowing very deeply nested arrays (i.e. > 9000 levels) to be flattened.
   * @returns {Array} The new flattened array.
   *
   * @example
   * [1, [2, 3, [4]]].flattenDeep();
   * // -> [1, 2, 3, 4]
   */
  flattenDeep: function(noCallStack) {
    if (noCallStack) {
      return flattenDeepNoCallStack(this);
    }

    return flattenDeepBase(this, []);
  },

  /**
   * Retrieve an element in the array.
   *
   * @function Array#get
   * @param {number} index - A zero-based integer indicating which element to retrieve.
   * @returns {*} The element at the specified index.
   *
   * @example
   * var array = [1, 2, 3];
   *
   * array.get(0);
   * // -> 1
   *
   * array.get(1);
   * // -> 2
   *
   * array.get(-1);
   * // -> 3
   *
   * array.get(-2);
   * // -> 2
   *
   * array.get(5);
   * // -> undefined
   */
  get: function(index) {
    return this[index < 0 ? index + this.length : index];
  },

  /**
   * Returns an new array that is the [set intersection](http://en.wikipedia.org/wiki/Intersection_(set_theory))
   * of the array and the input array(s).
   *
   * @function Array#intersect
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} The new array of unique values shared by all of the arrays.
   *
   * @example
   * [1, 2, 3].intersect([2, 3, 4]);
   * // -> [2, 3]
   *
   * [1, 2, 3].intersect([101, 2, 50, 1], [2, 1]);
   * // -> [1, 2]
   */
  intersect: function() {
    var result = [];
    var numArgs = arguments.length;

    if (!numArgs) {
      return result;
    }

    next: for (var i = 0; i < this.length; i++) {
      var item = this[i];

      if (result.indexOf(item) < 0) {
        for (var j = 0; j < numArgs; j++) {
          if (arguments[j].indexOf(item) < 0) {
            continue next;
          }
        }
        result.push(item);
      }
    }

    return result;
  },

  /**
   * Sorts an array in place using a natural string comparison algorithm and returns the array.
   *
   * You can achieve a desired character ordering by configuring a custom alphabet like so:
   *
   * ```js
   * // Estonian alphabet
   * String.alphabet = 'ABDEFGHIJKLMNOPRSŠZŽTUVÕÄÖÜXYabdefghijklmnoprsšzžtuvõäöüxy';
   * ['t', 'z', 'x', 'õ'].natsort();
   * // -> ['z', 't', 'õ', 'x']
   * ```
   *
   * For more ways to perform a natural ordering sort, see the
   * [string-natural-compare documentation](https://github.com/nwoltman/string-natural-compare).
   *
   * @function Array#natsort
   * @param {boolean} [caseInsensitive=false] - Set this to `true` to ignore letter casing when sorting.
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
   * files.natsort();
   * console.log(files);
   * // -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
   */
  natsort: function(caseInsensitive) {
    return this.sort(caseInsensitive ? String.naturalCaseCompare : String.naturalCompare);
  },

  /**
   * Sorts an array in place using a natural string comparison algorithm and returns the array.
   *
   * The same as {@link Array#natsort|`.natsort()`} except the strings are sorted in descending order.
   *
   * @function Array#rnatsort
   * @param {boolean} [caseInsensitive=false] - Set this to `true` to ignore letter casing when sorting.
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
   * files.rnatsort();
   * console.log(files);
   * // -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
   * // -> ['a10.txt', 'a2.txt', 'a1.txt', 'a.txt']
   */
  rnatsort: function(caseInsensitive) {
    return this.sort(caseInsensitive ? reverseNaturalCaseCompare : reverseNaturalCompare);
  },

  /**
   * Sorts an array in place using a numerical comparison algorithm
   * (sorts numbers from lowest to highest) and returns the array.
   *
   * @function Array#numsort
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var a = [10, 0, 2, 1];
   * a.numsort();
   * console.log(a);
   * // -> [0, 1, 2, 3]
   */
  numsort: function() {
    return this.sort(numericalCompare);
  },

  /**
   * Sorts an array in place using a reverse numerical comparison algorithm
   * (sorts numbers from highest to lowest) and returns the array.
   *
   * @function Array#rnumsort
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var a = [10, 0, 2, 1];
   * a.rnumsort();
   * console.log(a);
   * // -> [3, 2, 1, 0]
   */
  rnumsort: function() {
    return this.sort(numericalCompareReverse);
  },

  /**
   * Removes all occurrences of the passed in items from the array and returns the array.
   *
   * __Note:__ Unlike {@link Array#without|`.without()`}, this method mutates the array.
   *
   * @function Array#remove
   * @param {...*} *items - Items to remove from the array.
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var array = [1, 2, 3, 3, 4, 3, 5];
   *
   * array.remove(1);
   * // -> [2, 3, 3, 4, 3, 5]
   *
   * array.remove(3);
   * // -> [2, 4, 5]
   *
   * array.remove(2, 5);
   * // -> [4]
   */
  remove: function() {
    var remStartIndex = 0;
    var numToRemove = 0;

    for (var i = 0; i < this.length; i++) {
      var removeCurrentIndex = false;

      for (var j = 0; j < arguments.length; j++) {
        if (this[i] === arguments[j]) {
          removeCurrentIndex = true;
          break;
        }
      }

      if (removeCurrentIndex) {
        if (!numToRemove) {
          remStartIndex = i;
        }
        ++numToRemove;
      } else if (numToRemove) {
        this.splice(remStartIndex, numToRemove);
        i -= numToRemove;
        numToRemove = 0;
      }
    }

    if (numToRemove) {
      this.splice(remStartIndex, numToRemove);
    }

    return this;
  },

  /**
   * Returns an array that is the [union](http://en.wikipedia.org/wiki/Union_%28set_theory%29)
   * of the array and the input array(s).
   *
   * @function Array#union
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} The new array containing every distinct element found in the arrays.
   *
   * @example
   * [1, 2, 3].union([2, 3, 4, 5]);
   * // -> [1, 2, 3, 4, 5]
   *
   * [1, 2].union([4, 2], [2, 1]);
   * // -> [1, 2, 4]
   */
  union: function() {
    var result = this.unique();

    for (var i = 0; i < arguments.length; i++) {
      var array = arguments[i];
      for (var j = 0; j < array.length; j++) {
        if (result.indexOf(array[j]) < 0) {
          result.push(array[j]);
        }
      }
    }

    return result;
  },

  /**
   * Returns a duplicate-free clone of the array.
   *
   * @function Array#unique
   * @param {boolean} [isSorted=false] - If the array's contents are sorted and this is set to `true`,
   *     a faster algorithm will be used to create the unique array.
   * @returns {Array} The new, duplicate-free array.
   *
   * @example
   * // Unsorted
   * [4, 2, 3, 2, 1, 4].unique();
   * // -> [4, 2, 3, 1]
   *
   * // Sorted
   * [1, 2, 2, 3, 4, 4].unique();
   * // -> [1, 2, 3, 4]
   *
   * [1, 2, 2, 3, 4, 4].unique(true);
   * // -> [1, 2, 3, 4] (but faster than the previous example)
   */
  unique: function(isSorted) {
    var result = [];
    var length = this.length;

    if (!length) {
      return result;
    }

    result[0] = this[0];
    var i = 1;

    if (isSorted) {
      for (; i < length; i++) {
        if (this[i] !== this[i - 1]) {
          result.push(this[i]);
        }
      }
    } else {
      for (; i < length; i++) {
        if (result.indexOf(this[i]) < 0) {
          result.push(this[i]);
        }
      }
    }

    return result;
  },

  /**
   * Returns a copy of the array without any elements from the input parameters.
   *
   * @function Array#without
   * @param {...*} *items - Items to leave out of the returned array.
   * @returns {Array} The new array of filtered values.
   *
   * @example
   * [1, 2, 3, 4].without(2, 4);
   * // -> [1, 3]
   *
   * [1, 1].without(1);
   * // -> []
   */
  without: function() {
    var result = [];

    next: for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < arguments.length; j++) {
        if (this[i] === arguments[j]) {
          continue next;
        }
      }
      result.push(this[i]);
    }

    return result;
  },

  /**
   * Finds the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
   * of the array and the input array(s).
   *
   * @function Array#xor
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} The new array of values.
   *
   * @example
   * [1, 2].xor([4, 2]);
   * // -> [1, 4]
   *
   * [1, 2, 5].xor([2, 3, 5], [3, 4, 5]);
   * // -> [1, 4, 5]
   * // Explanation:
   * // [1, 2, 5] ⊕ [2, 3, 5] ⊕ [3, 4, 5] = [1, 4, 5]
   */
  xor: function() {
    var numArgs = arguments.length;

    if (!numArgs) {
      return this.unique();
    }

    var result = xorBase(this, arguments[0]);

    for (var i = 1; i < numArgs; i++) {
      result = xorBase(result, arguments[i]);
    }

    return result;
  },
};

// Format the properties to be defined with Object.defineProperties()
for (var propName in properties) {
  properties[propName] = {
    value: properties[propName],
    configurable: true,
    writable: true,
  };
}

// Set aliases

/**
 * Alias of {@link Array#difference}.
 *
 * @function Array#diff
 * @see {@link Array#difference}
 */
properties.diff = properties.difference;

/**
 * Alias of {@link Array#remove}.
 *
 * @function Array#pull
 * @see {@link Array#remove}
 */
properties.pull = properties.remove;

/**
 * Alias of {@link Array#unique}.
 *
 * @function Array#uniq
 * @see {@link Array#unique}
 */
properties.uniq = properties.unique;

// Define the properties on Array.prototype
Object.defineProperties(Array.prototype, properties);
