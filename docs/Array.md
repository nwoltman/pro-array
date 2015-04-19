<a name="Array"></a>
## Array
The native Array object.

**See**: [Array - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)  

* [Array](#Array)
  * [.chunk([size])](#Array#chunk) ⇒ <code>[Array](#Array)</code>
  * [.clear()](#Array#clear)
  * [.clone()](#Array#clone) ⇒ <code>[Array](#Array)</code>
  * [.compact()](#Array#compact) ⇒ <code>[Array](#Array)</code>
  * [.diff(...*arrays)](#Array#diff) ⇒ <code>[Array](#Array)</code>
  * [.each(callback(value,index,array))](#Array#each) ⇒ <code>[Array](#Array)</code>
  * [.equals(array)](#Array#equals) ⇒ <code>boolean</code>
  * [.get(index)](#Array#get) ⇒ <code>\*</code>
  * [.intersect(...*arrays)](#Array#intersect) ⇒ <code>[Array](#Array)</code>
  * [.natsort([caseInsensitive])](#Array#natsort) ⇒ <code>[Array](#Array)</code>
  * [.numsort()](#Array#numsort) ⇒ <code>[Array](#Array)</code>
  * [.remove(...*items)](#Array#remove) ⇒ <code>[Array](#Array)</code>
  * [.rnumsort()](#Array#rnumsort) ⇒ <code>[Array](#Array)</code>
  * [.union(...*arrays)](#Array#union) ⇒ <code>[Array](#Array)</code>
  * [.unique([isSorted])](#Array#unique) ⇒ <code>[Array](#Array)</code>
  * [.without(...*items)](#Array#without) ⇒ <code>[Array](#Array)</code>

<a name="Array#chunk"></a>
### array.chunk([size]) ⇒ <code>[Array](#Array)</code>
Creates an array of elements split into groups the length of `size`. If the array

**Returns**: <code>[Array](#Array)</code> - An array containing the chunks.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>1</code> | The length of each chunk. |

**Example**  
```js
[1, 2, 3, 4].chunk(2);
```
<a name="Array#clear"></a>
### array.clear()
Removes all elements from the array.

**Example**  
```js
var array = [1, 2, 3];
```
<a name="Array#clone"></a>
### array.clone() ⇒ <code>[Array](#Array)</code>
Creates a shallow copy of the array.

**Returns**: <code>[Array](#Array)</code> - A clone of the array.  
<a name="Array#compact"></a>
### array.compact() ⇒ <code>[Array](#Array)</code>
Returns a new array with all falsey values removed. Falsey values

**Returns**: <code>[Array](#Array)</code> - A new array containing only the truthy values of the original array.  
**Example**  
```js
[0, 1, false, 2, '', 3].compact();
```
<a name="Array#diff"></a>
### array.diff(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns a new array with all of the values of this array that are not in


| Param | Type | Description |
| --- | --- | --- |
| ...*arrays | <code>[Array](#Array)</code> | A variable number of arrays. |

**Example**  
```js
[1, 2, 3, 4, 5].diff([5, 2, 10]);
```
<a name="Array#each"></a>
### array.each(callback(value,index,array)) ⇒ <code>[Array](#Array)</code>
Invokes a callback function on each item in the array.

**Returns**: <code>[Array](#Array)</code> - `this`  

| Param | Type | Description |
| --- | --- | --- |
| callback(value,index,array) | <code>function</code> | A function to be executed on each item in the array. |

**Example**  
```js
['a', 'b', 'c'].each(console.log.bind(console));
```
<a name="Array#equals"></a>
### array.equals(array) ⇒ <code>boolean</code>
Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.

**Returns**: <code>boolean</code> - `true` if the arrays are equal, `false` otherwise.  
**Throws**:

- <code>TypeError</code> Throws an error if the input value is `null` or `undefined`.


| Param | Type | Description |
| --- | --- | --- |
| array | <code>[Array](#Array)</code> | An array to compare for equality. |

**Example**  
```js
var array = [1, 2, 3];
```
<a name="Array#get"></a>
### array.get(index) ⇒ <code>\*</code>
Retrieve an item in the array.

**Returns**: <code>\*</code> - The item at the specified index.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | A zero-based integer indicating which item to retrieve. |

**Example**  
```js
var array = [1, 2, 3];
```
<a name="Array#intersect"></a>
### array.intersect(...*arrays) ⇒ <code>[Array](#Array)</code>
Performs a set intersection on this array and the input array(s).

**Returns**: <code>[Array](#Array)</code> - An array that is the intersection of this array and the input array(s).  

| Param | Type | Description |
| --- | --- | --- |
| ...*arrays | <code>[Array](#Array)</code> | A variable number of arrays. |

**Example**  
```js
[1, 2, 3].intersect([2, 3, 4]);
```
<a name="Array#natsort"></a>
### array.natsort([caseInsensitive]) ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a natural string comparison algorithm and returns the array.

**Returns**: <code>[Array](#Array)</code> - The array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [caseInsensitive] | <code>boolean</code> | <code>false</code> | Set this to `true` to ignore letter casing when sorting. |

**Example**  
```js
var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
```
<a name="Array#numsort"></a>
### array.numsort() ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a numerical comparison algorithm

**Returns**: <code>[Array](#Array)</code> - The array.  
**Example**  
```js
var files = [10, 0, 2, 1];
```
<a name="Array#remove"></a>
### array.remove(...*items) ⇒ <code>[Array](#Array)</code>
Removes all occurrences of the passed in items from the array if they exist in the array.

**Returns**: <code>[Array](#Array)</code> - A reference to the array (so it's chainable).  

| Param | Type | Description |
| --- | --- | --- |
| ...*items | <code>\*</code> | Items to remove from the array. |

**Example**  
```js
var array = [1, 2, 3, 3, 4, 3, 5];
```
<a name="Array#rnumsort"></a>
### array.rnumsort() ⇒ <code>[Array](#Array)</code>
Sorts an array in place using a reverse numerical comparison algorithm

**Returns**: <code>[Array](#Array)</code> - The array.  
**Example**  
```js
var files = [10, 0, 2, 1];
```
<a name="Array#union"></a>
### array.union(...*arrays) ⇒ <code>[Array](#Array)</code>
Returns an array containing every distinct item that is in either this array or the input array(s).

**Returns**: <code>[Array](#Array)</code> - An array that is the union of this array and the input array(s).  

| Param | Type | Description |
| --- | --- | --- |
| ...*arrays | <code>[Array](#Array)</code> | A variable number of arrays. |

**Example**  
```js
[1, 2, 3].union([2, 3, 4, 5]);
```
<a name="Array#unique"></a>
### array.unique([isSorted]) ⇒ <code>[Array](#Array)</code>
Returns a duplicate-free clone of the array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [isSorted] | <code>boolean</code> | <code>false</code> | If the input array's contents are sorted and this is set to `true`, a faster algorithm will be used to create the unique array. |

**Example**  
```js
// Unsorted
```
<a name="Array#without"></a>
### array.without(...*items) ⇒ <code>[Array](#Array)</code>
Returns a copy of the current array without any elements from the input parameters.


| Param | Type | Description |
| --- | --- | --- |
| ...*items | <code>\*</code> | Items to leave out of the returned array. |

**Example**  
```js
[1, 2, 3, 4].without(2, 4);
```