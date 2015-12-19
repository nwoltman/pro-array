# ProArray

Extends Arrays ([safely](#extending-array-prototype)) with useful methods of unparalleled performance

[![NPM Version](https://img.shields.io/npm/v/pro-array.svg)](https://www.npmjs.com/package/pro-array)
[![Build Status](https://travis-ci.org/woollybogger/pro-array.svg?branch=master)](https://travis-ci.org/woollybogger/pro-array)
[![Coverage Status](https://coveralls.io/repos/woollybogger/pro-array/badge.svg?branch=master)](https://coveralls.io/r/woollybogger/pro-array?branch=master)
[![Dependency Status](https://david-dm.org/woollybogger/pro-array.svg)](https://david-dm.org/woollybogger/pro-array)
[![devDependency Status](https://david-dm.org/woollybogger/pro-array/dev-status.svg)](https://david-dm.org/woollybogger/pro-array#info=devDependencies)


## Installation

```sh
npm install pro-array --save
```

## Usage

```js
require('pro-array');
```

Requires [browserify](https://www.npmjs.com/package/browserify) to work in the browser.


# API Reference

<a name="Array"></a>
## Array
The native Array object.

**See**: [MDN JavaScript Array Reference](http://goo.gl/Ijd3ks)  

* [Array](#Array)
    * [.bsearch(value, [compareFunction])](#Array+bsearch) ⇒ <code>number</code>
    * [.chunk([size])](#Array+chunk) ⇒ <code>[Array](#Array)</code>
    * [.clear()](#Array+clear) ⇒ <code>[Array](#Array)</code>
    * [.clone()](#Array+clone) ⇒ <code>[Array](#Array)</code>
    * [.compact()](#Array+compact) ⇒ <code>[Array](#Array)</code>
    * [.diff()](#Array+diff)
    * [.difference(...*arrays)](#Array+difference) ⇒ <code>[Array](#Array)</code>
    * [.each(callback, [safeIteration])](#Array+each) ⇒ <code>[Array](#Array)</code>
        * [~eachCallback](#Array+each..eachCallback) : <code>function</code>
    * [.equals(array)](#Array+equals) ⇒ <code>boolean</code>
    * [.flatten([isDeep], [noCallStack])](#Array+flatten) ⇒ <code>[Array](#Array)</code>
    * [.flattenDeep([noCallStack])](#Array+flattenDeep) ⇒ <code>[Array](#Array)</code>
    * [.get(index)](#Array+get) ⇒ <code>\*</code>
    * [.intersect(...*arrays)](#Array+intersect) ⇒ <code>[Array](#Array)</code>
    * [.natsort([caseInsensitive])](#Array+natsort) ⇒ <code>[Array](#Array)</code>
    * [.numsort()](#Array+numsort) ⇒ <code>[Array](#Array)</code>
    * [.pull()](#Array+pull)
    * [.remove(...*items)](#Array+remove) ⇒ <code>[Array](#Array)</code>
    * [.rnatsort([caseInsensitive])](#Array+rnatsort) ⇒ <code>[Array](#Array)</code>
    * [.rnumsort()](#Array+rnumsort) ⇒ <code>[Array](#Array)</code>
    * [.union(...*arrays)](#Array+union) ⇒ <code>[Array](#Array)</code>
    * [.uniq()](#Array+uniq)
    * [.unique([isSorted])](#Array+unique) ⇒ <code>[Array](#Array)</code>
    * [.without(...*items)](#Array+without) ⇒ <code>[Array](#Array)</code>
    * [.xor(...*arrays)](#Array+xor) ⇒ <code>[Array](#Array)</code>


---

<a name="Array+bsearch"></a>
### array.bsearch(value, [compareFunction]) ⇒ <code>number</code>
Finds the index of a value in a sorted array using a binary search algorithm.

If no `compareFunction` is supplied, the `>` and `<` relational operators are used to compare values,
which provides optimal performance for arrays of numbers and simple strings.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to search for. |
| [compareFunction] | <code>function</code> | The same type of comparing function you would pass to     [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). |

**Returns**: <code>number</code> - The index of the value if it is in the array, or `-1` if it cannot be found.
    If the search value can be found at multiple indexes in the array, it is unknown which of
    those indexes will be returned.  

**Example**
```js
['a', 'b', 'c', 'd'].bsearch('c');
// -> 2

[1, 1, 2, 2].bsearch(2);
// -> 2 or 3

[1, 2, 3, 4].bsearch(10);
// -> -1

// Search an array of people sorted by age
var finn = {name: 'Finn', age: 12};
var jake = {name: 'Jake', age: 28};
[finn, jake].bsearch(finn, function(a, b) {
  return a.age - b.age;
});
// -> 0

['img1', 'img2', 'img10', 'img13'].bsearch('img2', String.naturalCompare);
// -> 1
// `String.naturalCompare` is provided by the string-natural-compare npm module:
// https://www.npmjs.com/package/string-natural-compare
```

---

<a name="Array+chunk"></a>
### array.chunk([size]) ⇒ <code>[Array](#Array)</code>
Creates an array of elements split into groups the length of `size`. If the array
can't be split evenly, the final chunk will be the remaining elements.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>1</code> | The length of each chunk. |

**Returns**: <code>[Array](#Array)</code> - An array containing the chunks.  
**Throws**:

- <code>RangeError</code> Throws when `size` is a negative number.


**Example**
```js
[1, 2, 3, 4].chunk(2);
// -> [[1, 2], [3, 4]]

[1, 2, 3, 4].chunk(3);
// -> [[1, 2, 3], [4]]
```

---

<a name="Array+clear"></a>
### array.clear() ⇒ <code>[Array](#Array)</code>
Removes all elements from the array.

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
var array = [1, 2, 3];
array.clear();
console.log(array);
// -> []
```

---

<a name="Array+clone"></a>
### array.clone() ⇒ <code>[Array](#Array)</code>
Creates a shallow copy of the array.

**Returns**: <code>[Array](#Array)</code> - A clone of the array.  

**Example**
```js
var a = [1, 2, 3];
var b = a.clone();
console.log(b, b === a);
// -> [1, 2, 3] false
```

---

<a name="Array+compact"></a>
### array.compact() ⇒ <code>[Array](#Array)</code>
Returns a new array with all falsey values removed. Falsey values
are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.

**Returns**: <code>[Array](#Array)</code> - The new array containing only the truthy values from the original array.  

**Example**
```js
[0, 1, false, 2, '', 3].compact();
// -> [1, 2, 3]
```

---

<a name="Array+diff"></a>
### array.diff()
Alias of [difference](#Array+difference).

**See**: [difference](#Array+difference)  

---

<a name="Array+difference"></a>
### array.difference(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns a new array with all of the values of the array that are not in
any of the input arrays (performs a set difference).


| Param | Type | Description |
| --- | --- | --- |
| *arrays | <code>...[Array](#Array)</code> | A variable number of arrays. |

**Returns**: <code>[Array](#Array)</code> - The new array of filtered values.  

**Example**
```js
[1, 2, 3, 4, 5].difference([5, 2, 10]);
// -> [1, 3, 4]
```

---

<a name="Array+each"></a>
### array.each(callback, [safeIteration]) ⇒ <code>[Array](#Array)</code>
Invokes a callback function on each element in the array.

A generic iterator method similar to [`.forEach()`](http://goo.gl/n6z5Jz) but with the following differences:

1. `this` always refers to the current element in the iteration (the `value` argument to the callback).
2. Returning `false` in the callback will cancel the iteration (similar to a `break` statement).
3. The array is returned to allow for function chaining.
4. The callback __is__ invoked for indexes that have been deleted or elided unless `safeIteration` is `true`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>[eachCallback](#Array+each..eachCallback)</code> |  | A function to be executed on each element in the array. |
| [safeIteration] | <code>boolean</code> | <code>false</code> | When `true`, the callback will not be invoked     for indexes that have been deleted or elided (are undefined). |

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
['a', 'b', 'c'].each(console.log.bind(console));
// -> 'a' 0 ['a', 'b', 'c']
// -> 'b' 1 ['a', 'b', 'c']
// -> 'c' 2 ['a', 'b', 'c']
// -> ['a', 'b', 'c']

['a', 'b', 'c'].each(function(value, index) {
  console.log(value);
  if (index === 1) return false;
});
// -> 'a'
// -> 'b'
// -> ['a', 'b', 'c']

[[1, 2], [3, 4, 5]].each(Array.prototype.pop);
// -> [[1], [3, 4]]

new Array(1).each(console.log.bind(console));
// -> undefined 0 [undefined]
// -> [undefined]

new Array(1).each(console.log.bind(console), true);
// -> [undefined]
```

---

<a name="Array+each..eachCallback"></a>
#### each~eachCallback : <code>function</code>

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The current element being processed. |
| index | <code>number</code> | The index of the current element being processed. |
| array | <code>[Array](#Array)</code> | The array [`.each()`](#Array+each) was called on. |


---

<a name="Array+equals"></a>
### array.equals(array) ⇒ <code>boolean</code>
Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.

__Note:__ The order of elements in the arrays __does__ matter. The elements must be found in the same order
for the arrays to be considered equal.


| Param | Type | Description |
| --- | --- | --- |
| array | <code>[Array](#Array)</code> | An array to compare for equality. |

**Returns**: <code>boolean</code> - `true` if the arrays are equal, `false` otherwise.  

**Example**
```js
var array = [1, 2, 3];

array.equals(array);
// -> true

array.equals([1, 2, 3]);
// -> true

array.equals([3, 2, 1]);
// -> false
```

---

<a name="Array+flatten"></a>
### array.flatten([isDeep], [noCallStack]) ⇒ <code>[Array](#Array)</code>
Flattens a nested array. If `isDeep` is true, the array is recursively
flattened, otherwise it’s only flattened a single level.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [isDeep] | <code>boolean</code> | <code>false</code> | Specifies a deep flatten. |
| [noCallStack] | <code>boolean</code> | <code>false</code> | Specifies if an algorithm that is not susceptible to call stack limits     should be used, allowing very deeply nested arrays to be flattened. Ignored if `isDeep` is not `true`. |

**Returns**: <code>[Array](#Array)</code> - The new flattened array.  

**Example**
```js
[1, [2, 3, [4]]].flatten();
// -> [1, 2, 3, [4]]

// using `isDeep`
[1, [2, 3, [4]]].flatten(true);
// -> [1, 2, 3, 4]
```

---

<a name="Array+flattenDeep"></a>
### array.flattenDeep([noCallStack]) ⇒ <code>[Array](#Array)</code>
Recursively flattens a nested array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [noCallStack] | <code>boolean</code> | <code>false</code> | Specifies if an algorithm that is not susceptible to call stack limits     should be used, allowing very deeply nested arrays (i.e. > 9000 levels) to be flattened. |

**Returns**: <code>[Array](#Array)</code> - The new flattened array.  

**Example**
```js
[1, [2, 3, [4]]].flattenDeep();
// -> [1, 2, 3, 4]
```

---

<a name="Array+get"></a>
### array.get(index) ⇒ <code>\*</code>
Retrieve an element in the array.


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | A zero-based integer indicating which element to retrieve. |

**Returns**: <code>\*</code> - The element at the specified index.  

**Example**
```js
var array = [1, 2, 3];

array.get(0);
// -> 1

array.get(1);
// -> 2

array.get(-1);
// -> 3

array.get(-2);
// -> 2

array.get(5);
// -> undefined
```

---

<a name="Array+intersect"></a>
### array.intersect(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns an new array that is the [set intersection](http://en.wikipedia.org/wiki/Intersection_(set_theory))
of the array and the input array(s).


| Param | Type | Description |
| --- | --- | --- |
| *arrays | <code>...[Array](#Array)</code> | A variable number of arrays. |

**Returns**: <code>[Array](#Array)</code> - The new array of unique values shared by all of the arrays.  

**Example**
```js
[1, 2, 3].intersect([2, 3, 4]);
// -> [2, 3]

[1, 2, 3].intersect([101, 2, 50, 1], [2, 1]);
// -> [1, 2]
```

---

<a name="Array+natsort"></a>
### array.natsort([caseInsensitive]) ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a natural string comparison algorithm and returns the array.

You can achieve a desired character ordering by configuring a custom alphabet like so:

```js
// Estonian alphabet
String.alphabet = 'ABDEFGHIJKLMNOPRSŠZŽTUVÕÄÖÜXYabdefghijklmnoprsšzžtuvõäöüxy';
['t', 'z', 'x', 'õ'].natsort();
// -> ['z', 't', 'õ', 'x']
```

For more ways to perform a natural ordering sort, see the
[string-natural-compare documentation](https://github.com/woollybogger/string-natural-compare).


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [caseInsensitive] | <code>boolean</code> | <code>false</code> | Set this to `true` to ignore letter casing when sorting. |

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
files.natsort();
console.log(files);
// -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
```

---

<a name="Array+numsort"></a>
### array.numsort() ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a numerical comparison algorithm
(sorts numbers from lowest to highest) and returns the array.

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
var a = [10, 0, 2, 1];
a.numsort();
console.log(a);
// -> [0, 1, 2, 3]
```

---

<a name="Array+pull"></a>
### array.pull()
Alias of [remove](#Array+remove).

**See**: [remove](#Array+remove)  

---

<a name="Array+remove"></a>
### array.remove(...*items) ⇒ <code>[Array](#Array)</code>
Removes all occurrences of the passed in items from the array and returns the array.

__Note:__ Unlike [`.without()`](#Array+without), this method mutates the array.


| Param | Type | Description |
| --- | --- | --- |
| *items | <code>...\*</code> | Items to remove from the array. |

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
var array = [1, 2, 3, 3, 4, 3, 5];

array.remove(1);
// -> [2, 3, 3, 4, 3, 5]

array.remove(3);
// -> [2, 4, 5]

array.remove(2, 5);
// -> [4]
```

---

<a name="Array+rnatsort"></a>
### array.rnatsort([caseInsensitive]) ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a natural string comparison algorithm and returns the array.

The same as [`.natsort()`](#Array+natsort) except the strings are sorted in descending order.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [caseInsensitive] | <code>boolean</code> | <code>false</code> | Set this to `true` to ignore letter casing when sorting. |

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
files.rnatsort();
console.log(files);
// -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
// -> ['a10.txt', 'a2.txt', 'a1.txt', 'a.txt']
```

---

<a name="Array+rnumsort"></a>
### array.rnumsort() ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a reverse numerical comparison algorithm
(sorts numbers from highest to lowest) and returns the array.

**Returns**: <code>[Array](#Array)</code> - The array this method was called on.  

**Example**
```js
var a = [10, 0, 2, 1];
a.rnumsort();
console.log(a);
// -> [3, 2, 1, 0]
```

---

<a name="Array+union"></a>
### array.union(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns an array that is the [union](http://en.wikipedia.org/wiki/Union_%28set_theory%29)
of the array and the input array(s).


| Param | Type | Description |
| --- | --- | --- |
| *arrays | <code>...[Array](#Array)</code> | A variable number of arrays. |

**Returns**: <code>[Array](#Array)</code> - The new array containing every distinct element found in the arrays.  

**Example**
```js
[1, 2, 3].union([2, 3, 4, 5]);
// -> [1, 2, 3, 4, 5]

[1, 2].union([4, 2], [2, 1]);
// -> [1, 2, 4]
```

---

<a name="Array+uniq"></a>
### array.uniq()
Alias of [unique](#Array+unique).

**See**: [unique](#Array+unique)  

---

<a name="Array+unique"></a>
### array.unique([isSorted]) ⇒ <code>[Array](#Array)</code>
Returns a duplicate-free clone of the array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [isSorted] | <code>boolean</code> | <code>false</code> | If the array's contents are sorted and this is set to `true`,     a faster algorithm will be used to create the unique array. |

**Returns**: <code>[Array](#Array)</code> - The new, duplicate-free array.  

**Example**
```js
// Unsorted
[4, 2, 3, 2, 1, 4].unique();
// -> [4, 2, 3, 1]

// Sorted
[1, 2, 2, 3, 4, 4].unique();
// -> [1, 2, 3, 4]

[1, 2, 2, 3, 4, 4].unique(true);
// -> [1, 2, 3, 4] (but faster than the previous example)
```

---

<a name="Array+without"></a>
### array.without(...*items) ⇒ <code>[Array](#Array)</code>
Returns a copy of the array without any elements from the input parameters.


| Param | Type | Description |
| --- | --- | --- |
| *items | <code>...\*</code> | Items to leave out of the returned array. |

**Returns**: <code>[Array](#Array)</code> - The new array of filtered values.  

**Example**
```js
[1, 2, 3, 4].without(2, 4);
// -> [1, 3]

[1, 1].without(1);
// -> []
```

---

<a name="Array+xor"></a>
### array.xor(...*arrays) ⇒ <code>[Array](#Array)</code>
Finds the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
of the array and the input array(s).


| Param | Type | Description |
| --- | --- | --- |
| *arrays | <code>...[Array](#Array)</code> | A variable number of arrays. |

**Returns**: <code>[Array](#Array)</code> - The new array of values.  

**Example**
```js
[1, 2].xor([4, 2]);
// -> [1, 4]

[1, 2, 5].xor([2, 3, 5], [3, 4, 5]);
// -> [1, 4, 5]
// Explanation:
// [1, 2, 5] ⊕ [2, 3, 5] ⊕ [3, 4, 5] = [1, 4, 5]
```

---


<br />

<a name="extending-array-prototype"></a>
# Extending `Array.prototype`

ProArray uses [`Object.defineProperties()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) to safely extend the native Array prototype such that the added properties are not enumerable. This keeps native arrays clean and prevents [potential abnormalities](http://fireboltjs.com/prototype-extending/#enumerable_properties) when working with arrays.

#### Worried about naming collisions?

It is extremely unlikely that the name of any method that ProArray adds to the Array prototype will be used in a future ECMAScript standard, but if you're still worried and want to be extra safe, try using the alias methods (like [.pull()](#Array#pull) and [.uniq()](#Array#uniq)).
