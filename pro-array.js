/**
 * ProArray
 */

'use strict';

require('natural-compare-lite');

function natcompCaseInsensitive(a, b){
  return String.naturalCompare(a.toLowerCase(), b.toLowerCase());
}

function numericalCompare(a, b) {
  return a - b;
}

function numericalCompareReverse(a, b) {
  return b - a;
}

function retval(v) {
  return v;
}

/**
 * @class Array
 * @classdesc The native Array object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array}
 */

var properties = {
  /**
   * Creates an array of elements split into groups the length of `size`. If the array
   * can't be split evenly, the final chunk will be the remaining elements.
   *
   * @function Array#chunk
   * @param {number} [size=1] - The length of each chunk.
   * @returns {Array} An array containing the chunks.
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
    var res = new Array(numChunks);

    for (var i = 0, index = 0; i < numChunks; i++) {
      res[i] = this.slice(index, index += size);
    }

    return res;
  },

  /**
   * Removes all elements from the array.
   *
   * @function Array#clear
   *
   * @example
   * var array = [1, 2, 3];
   * array.clear();
   * console.log(array);
   * // -> []
   */
  clear: function() {
    this.length = 0;
  },

  /**
   * Creates a shallow copy of the array.
   *
   * @function Array#clone
   * @returns {Array} A clone of the array.
   */
  clone: function() {
    var len = this.length;
    var array = new Array(len);

    for (var i = 0; i < len; i++) {
      array[i] = this[i];
    }

    return array;
  },

  /**
   * Returns a new array with all falsey values removed. Falsey values
   * are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
   *
   * @function Array#compact
   * @returns {Array} A new array containing only the truthy values of the original array.
   *
   * @example
   * [0, 1, false, 2, '', 3].compact();
   * // -> [1, 2, 3]
   */
  compact: function() {
    return this.filter(retval);
  },

  /**
   * Returns a new array with all of the values of this array that are not in
   * any of the input arrays (performs a set difference).
   *
   * @function Array#difference
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array}
   *
   * @example
   * [1, 2, 3, 4, 5].difference([5, 2, 10]);
   * // -> [1, 3, 4]
   */
  difference: function() {
    var difference = [];

    next: for (var i = 0; i < this.length; i++) {
      var item = this[i];

      for (var j = 0; j < arguments.length; j++) {
        if (arguments[j].indexOf(item) >= 0) {
          continue next;
        }
      }

      // The item was not part of any of the input arrays so it can be added to the difference array
      difference.push(item);
    }

    return difference;
  },

  /**
   * Invokes a callback function on each item in the array.
   *
   * A generic iterator method similar to `Array#forEach()` but with the following differences:
   *
   * 1. `this` always refers to the current item in the iteration (the `value` argument to the callback).
   * 2. Returning `false` in the callback will cancel the iteration (similar to a `break` statement).
   * 3. The array is returned to allow for function chaining.
   * 4. The callback __is__ invoked for indexes that have been deleted or elided.
   *
   * @function Array#each
   * @param {function(*, number, Array)} callback(value,index,array) - A function to be executed on each
   *                                                                   item in the array.
   * @returns {Array} `this`
   *
   * @example
   * ['a', 'b', 'c'].each(console.log.bind(console));
   * // -> 'a' 0 ['a', 'b', 'c']
   * // -> 'b' 1 ['a', 'b', 'c']
   * // -> 'c' 2 ['a', 'b', 'c']
   * // -> ['a', 'b', 'c'] (return value)
   *
   * ['a', 'b', 'c'].each(function(value, index) {
   *   console.log(value);
   *   if (index === 1) return false;
   * });
   * // -> 'a'
   * // -> 'b'
   * // -> ['a', 'b', 'c'] (return value)
   *
   * [[1, 2], [3, 4, 5]].each(Array.prototype.pop);
   * // -> [[1], [3, 4]]
   */
  each: function(callback) {
    var i = 0;

    while (i < this.length && callback.call(this[i], this[i], i++, this) !== false);

    return this;
  },

  /**
   * Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.
   *
   * __Note:__ The order of elements in the arrays DOES matter. The elements must be found in the same order
   * for the arrays to be considered equal.
   *
   * @function Array#equals
   * @param {Array} array - An array to compare for equality.
   * @returns {boolean} `true` if the arrays are equal, `false` otherwise.
   * @throws {TypeError} Throws an error if the input value is `null` or `undefined`.
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
    if (this === array) {
      return true;
    }

    if (this.length !== array.length) {
      return false;
    }

    for (var i = 0; i < array.length; i++) {
      if (this[i] !== array[i]) {
        return false;
      }
    }

    return true;
  },

  /**
   * Retrieve an item in the array.
   *
   * @function Array#get
   * @param {number} index - A zero-based integer indicating which item to retrieve.
   * @returns {*} The item at the specified index.
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
   * Performs a set intersection on this array and the input array(s).
   *
   * @function Array#intersect
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} An array that is the intersection of this array and the input array(s).
   *
   * @example
   * [1, 2, 3].intersect([2, 3, 4]);
   * // -> [2, 3]
   *
   * [1, 2, 3].intersect([101, 2, 50, 1], [2, 1]);
   * // -> [1, 2]
   */
  intersect: function() {
    var intersection = [];

    next: for (var i = 0; i < this.length; i++) {
      var item = this[i];

      // The current item can only be added if it is not already in the intersection
      if (intersection.indexOf(item) < 0) {
        // If the item is not in every input array, continue to the next item
        for (var j = 0; j < arguments.length; j++) {
          if (arguments[j].indexOf(item) < 0) {
            continue next;
          }
        }

        intersection.push(item);
      }
    }

    return intersection;
  },

  /**
   * Sorts an array in place using a natural string comparison algorithm and returns the array.
   *
   * @function Array#natsort
   * @param {boolean} [caseInsensitive=false] - Set this to `true` to ignore letter casing when sorting.
   * @returns {Array} The array.
   *
   * @example
   * var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
   * files.natsort();
   * console.log(files);
   * // -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
   */
  natsort: function(caseInsensitive) {
    return this.sort(caseInsensitive ? natcompCaseInsensitive : String.naturalCompare);
  },

  /**
   * Sorts an array in place using a numerical comparison algorithm
   * (sorts numbers from lowest to highest) and returns the array.
   *
   * @function Array#numsort
   * @returns {Array} The array.
   *
   * @example
   * var files = [10, 0, 2, 1];
   * files.numsort();
   * console.log(files);
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
   * @returns {Array} The array.
   *
   * @example
   * var files = [10, 0, 2, 1];
   * files.rnumsort();
   * console.log(files);
   * // -> [3, 2, 1, 0]
   */
  rnumsort: function() {
    return this.sort(numericalCompareReverse);
  },

  /**
   * Removes all occurrences of the passed in items from the array if they exist in the array.
   *
   * @function Array#remove
   * @param {...*} *items - Items to remove from the array.
   * @returns {Array} A reference to the array (so it's chainable).
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
    for (var i = 0; i < arguments.length; i++) {
      for (;;) {
        var remIndex = this.indexOf(arguments[i]);
        if (remIndex < 0) break;
        this.splice(remIndex, 1);
      }
    }

    return this;
  },

  /**
   * Returns an array containing every distinct item that is in either this array or the input array(s).
   *
   * @function Array#union
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} An array that is the union of this array and the input array(s).
   *
   * @example
   * [1, 2, 3].union([2, 3, 4, 5]);
   * // -> [1, 2, 3, 4, 5]
   */
  union: function() {
    var union = this.unique();

    for (var i = 0; i < arguments.length; i++) {
      var array = arguments[i];
      for (var j = 0; j < array.length; j++) {
        if (union.indexOf(array[j]) < 0) {
          union.push(array[j]);
        }
      }
    }

    return union;
  },

  /**
   * Returns a duplicate-free clone of the array.
   *
   * @function Array#unique
   * @param {boolean} [isSorted=false] - If the input array's contents are sorted and this is set to `true`,
   *     a faster algorithm will be used to create the unique array.
   * @returns {Array}
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
    var unique = [];
    var i = 0;

    if (isSorted) {
      var lastIndex = this.length - 1;
      if (lastIndex === -1) {
        return unique;
      }
      for (; i < lastIndex; i++) {
        if (this[i] !== this[i + 1]) {
          unique.push(this[i]);
        }
      }
      unique.push(this[lastIndex]);
    } else {
      for (; i < this.length; i++) {
        if (unique.indexOf(this[i]) < 0) {
          unique.push(this[i]);
        }
      }
    }

    return unique;
  },

  /**
   * Returns a copy of the current array without any elements from the input parameters.
   *
   * @function Array#without
   * @param {...*} *items - Items to leave out of the returned array.
   * @returns {Array}
   *
   * @example
   * [1, 2, 3, 4].without(2, 4);
   * // -> [1, 3]
   */
  without: function() {
    var array = [];

    next: for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < arguments.length; j++) {
        if (arguments[j] === this[i]) {
          continue next;
        }
      }
      array.push(this[i]);
    }

    return array;
  }
};

// Format the properties to be used with Object.defineProperties
for (var propName in properties) {
  properties[propName] = {
    value: properties[propName],
    configurable: true,
    writable: true
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
 * Alias of {@link Array#unique}.
 *
 * @function Array#uniq
 * @see {@link Array#unique}
 */
properties.uniq = properties.unique;

// Define the properties on Array.prototype
Object.defineProperties(Array.prototype, properties);
