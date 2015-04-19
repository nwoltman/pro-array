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

##### Read the [API docs](https://github.com/woollybogger/pro-array/blob/master/docs/Array.md) to see the new things you can do with arrays.

#### Example 1 - Remove falsey values with [`.compact()`](https://github.com/woollybogger/pro-array/blob/master/docs/Array.md#Array#compact)

```js
[0, 1, false, 2, '', 3].compact();
// -> [1, 2, 3]
```

#### Example 2 - Sort strings using a "natural order" algorithm [`.natsort()`](https://github.com/woollybogger/pro-array/blob/master/docs/Array.md#Array#natsort)

```js
var files = ['a.txt', 'a10.txt', 'a2.txt', 'a1.txt'];
files.natsort();
console.log(files);
// -> ['a.txt', 'a1.txt', 'a2.txt', 'a10.txt']
```
