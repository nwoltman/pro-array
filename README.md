# ProArray

Extends the functionality of Arrays with several useful methods

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
  * [.chunk([size])](#Array#chunk) ⇒ <code>[Array](#Array)</code>
  * [.clear()](#Array#clear)
  * [.clone()](#Array#clone) ⇒ <code>[Array](#Array)</code>
  * [.compact()](#Array#compact) ⇒ <code>[Array](#Array)</code>
  * [.diff()](#Array#diff)
  * [.difference(...*arrays)](#Array#difference) ⇒ <code>[Array](#Array)</code>
  * [.each(callback(value,index,array), [safeIteration])](#Array#each) ⇒ <code>[Array](#Array)</code>
  * [.equals(array)](#Array#equals) ⇒ <code>boolean</code>
  * [.get(index)](#Array#get) ⇒ <code>\*</code>
  * [.intersect(...*arrays)](#Array#intersect) ⇒ <code>[Array](#Array)</code>
  * [.natsort([caseInsensitive])](#Array#natsort) ⇒ <code>[Array](#Array)</code>
  * [.numsort()](#Array#numsort) ⇒ <code>[Array](#Array)</code>
  * [.remove(...*items)](#Array#remove) ⇒ <code>[Array](#Array)</code>
  * [.rnumsort()](#Array#rnumsort) ⇒ <code>[Array](#Array)</code>
  * [.union(...*arrays)](#Array#union) ⇒ <code>[Array](#Array)</code>
  * [.uniq()](#Array#uniq)
  * [.unique([isSorted])](#Array#unique) ⇒ <code>[Array](#Array)</code>
  * [.without(...*items)](#Array#without) ⇒ <code>[Array](#Array)</code>

<a name="Array#chunk"></a>
### array.chunk([size]) ⇒ <code>[Array](#Array)</code>
Creates an array of elements split into groups the length of `size`. If the arraycan't be split evenly, the final chunk will be the remaining elements.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>1</code> | The length of each chunk. |

**Returns**: <code>[Array](#Array)</code> - An array containing the chunks.  
**Example**  
```js
[1, 2, 3, 4].chunk(2);// -> [[1, 2], [3, 4]][1, 2, 3, 4].chunk(3);// -> [[1, 2, 3], [4]]
```
<a name="Array#clear"></a>
### array.clear()
Removes all elements from the array.

**Example**  
```js
var array = [1, 2, 3];array.clear();console.log(array);// -> []
```
<a name="Array#clone"></a>
### array.clone() ⇒ <code>[Array](#Array)</code>
Creates a shallow copy of the array.

**Returns**: <code>[Array](#Array)</code> - A clone of the array.  
<a name="Array#compact"></a>
### array.compact() ⇒ <code>[Array](#Array)</code>
Returns a new array with all falsey values removed. Falsey valuesare `false`, `0`, `""`, `null`, `undefined`, and `NaN`.

**Returns**: <code>[Array](#Array)</code> - A new array containing only the truthy values of the original array.  
**Example**  
```js
[0, 1, false, 2, '', 3].compact();// -> [1, 2, 3]
```
<a name="Array#diff"></a>
### array.diff()
Alias of [difference](#Array#difference).

**See**: [difference](#Array#difference)  
<a name="Array#difference"></a>
### array.difference(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns a new array with all of the values of this array that are not inany of the input arrays (performs a set difference).


| Param | Type | Description |
| --- | --- | --- |
| ...*arrays | <code>[Array](#Array)</code> | A variable number of arrays. |

**Example**  
```js
[1, 2, 3, 4, 5].difference([5, 2, 10]);// -> [1, 3, 4]
```
<a name="Array#each"></a>
### array.each(callback(value,index,array), [safeIteration]) ⇒ <code>[Array](#Array)</code>
Invokes a callback function on each item in the array.A generic iterator method similar to `Array#forEach()` but with the following differences:1. `this` always refers to the current item in the iteration (the `value` argument to the callback).2. Returning `false` in the callback will cancel the iteration (similar to a `break` statement).3. The array is returned to allow for function chaining.4. The callback __is__ invoked for indexes that have been deleted or elided unless `safeIteration` is `true`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback(value,index,array) | <code>function</code> |  | A function to be executed on each item in the array. |
| [safeIteration] | <code>boolean</code> | <code>false</code> | When `true`, the callback will not be invoked for indexes that have been deleted or elided. |

**Returns**: <code>[Array](#Array)</code> - `this`  
**Example**  
```js
['a', 'b', 'c'].each(console.log.bind(console));// -> 'a' 0 ['a', 'b', 'c']// -> 'b' 1 ['a', 'b', 'c']// -> 'c' 2 ['a', 'b', 'c']// -> ['a', 'b', 'c']['a', 'b', 'c'].each(function(value, index) {  console.log(value);  if (index === 1) return false;});// -> 'a'// -> 'b'// -> ['a', 'b', 'c'][[1, 2], [3, 4, 5]].each(Array.prototype.pop);// -> [[1], [3, 4]]new Array(1).each(console.log.bind(console));// -> undefined 0 ['a', 'b', 'c']// -> [undefined]new Array(1).each(console.log.bind(console), true);// -> [undefined]
```
<a name="Array#equals"></a>
### array.equals(array) ⇒ <code>boolean</code>
Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.__Note:__ The order of elements in the arrays DOES matter. The elements must be found in the same orderfor the arrays to be considered equal.


| Param | Type | Description |
| --- | --- | --- |
| array | <code>[Array](#Array)</code> | An array to compare for equality. |

**Returns**: <code>boolean</code> - `true` if the arrays are equal, `false` otherwise.  
**Throws**:

- <code>TypeError</code> Throws an error if the input value is `null` or `undefined`.

**Example**  
```js
var array = [1, 2, 3];array.equals(array);// -> truearray.equals([1, 2, 3]);// -> truearray.equals([3, 2, 1]);// -> false
```
<a name="Array#get"></a>
### array.get(index) ⇒ <code>\*</code>
Retrieve an item in the array.


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | A zero-based integer indicating which item to retrieve. |

**Returns**: <code>\*</code> - The item at the specified index.  
**Example**  
```js
var array = [1, 2, 3];array.get(0);// -> 1array.get(1);// -> 2array.get(-1);// -> 3array.get(-2);// -> 2array.get(5);// -> undefined
```
<a name="Array#intersect"></a>
### array.intersect(...*arrays) ⇒ <code>[Array](#Array)</code>
Performs a set intersection on this array and the input array(s).


| Param | Type | Description |
| --- | --- | --- |
| ...*arrays | <code>[Array](#Array)</code> | A variable number of arrays. |

**Returns**: <code>[Array](#Array)</code> - An array that is the intersection of this array and the input array(s).  
**Example**  
```js
[1, 2, 3].intersect([2, 3, 4]);// -> [2, 3][1, 2, 3].intersect([101, 2, 50, 1], [2, 1]);// -> [1, 2]
```
<a name="Array#natsort"></a>
### array.natsort([caseInsensitive]) ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a natural string comparison algorithm and returns the array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [caseInsensitive] | <code>boolean</code> | <code>false</code> | Set this to `true` to ignore letter casing when sorting. |

**Returns**: <code>[Array](#Array)</code> - The array.  
**Example**  
```js
var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];files.natsort();console.log(files);// -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
```
<a name="Array#numsort"></a>
### array.numsort() ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a numerical comparison algorithm(sorts numbers from lowest to highest) and returns the array.

**Returns**: <code>[Array](#Array)</code> - The array.  
**Example**  
```js
var files = [10, 0, 2, 1];files.numsort();console.log(files);// -> [0, 1, 2, 3]
```
<a name="Array#remove"></a>
### array.remove(...*items) ⇒ <code>[Array](#Array)</code>
Removes all occurrences of the passed in items from the array if they exist in the array.


| Param | Type | Description |
| --- | --- | --- |
| ...*items | <code>\*</code> | Items to remove from the array. |

**Returns**: <code>[Array](#Array)</code> - A reference to the array (so it's chainable).  
**Example**  
```js
var array = [1, 2, 3, 3, 4, 3, 5];array.remove(1);// -> [2, 3, 3, 4, 3, 5]array.remove(3);// -> [2, 4, 5]array.remove(2, 5);// -> [4]
```
<a name="Array#rnumsort"></a>
### array.rnumsort() ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a reverse numerical comparison algorithm(sorts numbers from highest to lowest) and returns the array.

**Returns**: <code>[Array](#Array)</code> - The array.  
**Example**  
```js
var files = [10, 0, 2, 1];files.rnumsort();console.log(files);// -> [3, 2, 1, 0]
```
<a name="Array#union"></a>
### array.union(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns an array containing every distinct item that is in either this array or the input array(s).


| Param | Type | Description |
| --- | --- | --- |
| ...*arrays | <code>[Array](#Array)</code> | A variable number of arrays. |

**Returns**: <code>[Array](#Array)</code> - An array that is the union of this array and the input array(s).  
**Example**  
```js
[1, 2, 3].union([2, 3, 4, 5]);// -> [1, 2, 3, 4, 5]
```
<a name="Array#uniq"></a>
### array.uniq()
Alias of [unique](#Array#unique).

**See**: [unique](#Array#unique)  
<a name="Array#unique"></a>
### array.unique([isSorted]) ⇒ <code>[Array](#Array)</code>
Returns a duplicate-free clone of the array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [isSorted] | <code>boolean</code> | <code>false</code> | If the input array's contents are sorted and this is set to `true`, a faster algorithm will be used to create the unique array. |

**Example**  
```js
// Unsorted[4, 2, 3, 2, 1, 4].unique();// -> [4, 2, 3, 1]// Sorted[1, 2, 2, 3, 4, 4].unique();// -> [1, 2, 3, 4][1, 2, 2, 3, 4, 4].unique(true);// -> [1, 2, 3, 4] (but faster than the previous example)
```
<a name="Array#without"></a>
### array.without(...*items) ⇒ <code>[Array](#Array)</code>
Returns a copy of the current array without any elements from the input parameters.


| Param | Type | Description |
| --- | --- | --- |
| ...*items | <code>\*</code> | Items to leave out of the returned array. |

**Example**  
```js
[1, 2, 3, 4].without(2, 4);// -> [1, 3]
```
