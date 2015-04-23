'use strict';

/* jshint expr: true */
/* global describe: true */
/* global it: true */

require('../pro-array');
var should = require('should');

describe('Array', function() {

  describe('.prototype', function() {
    it('should not have enumerable properties', function() {
      Array.prototype.should.be.empty;
    });
  });


  describe('#chunk()', function() {
    var array = [0, 1, 2, 3, 4, 5];

    it('should return an array of chunks', function() {
      var chunks = array.chunk(3);
      should.deepEqual(chunks, [[0, 1, 2], [3, 4, 5]]);
    });

    it('should return the last chunk as remaining elements', function() {
      var chunks = array.chunk(4);
      should.deepEqual(chunks, [[0, 1, 2, 3], [4, 5]]);
    });

    it('should run with a default chunk size of 1', function() {
      var chunks = array.chunk();
      should.deepEqual(chunks, [[0], [1], [2], [3], [4], [5]]);
    });
  });


  describe('#clean()', function() {
    var array = [1, 2, 3];

    it('should empty an array', function() {
      array.clear();
      array.should.be.empty;
    });
  });


  describe('#clone()', function() {
    var array = [1, 99, '', {}, ['a', 'b'], false, /regex/];

    it('should make an exact copy of an array', function() {
      var clone = array.clone();
      clone.should.not.equal(array);
      should.deepEqual(clone, array);
    });
  });


  describe('#compact()', function() {
    var array = ['a', '', 1, 2, 0, null, true, undefined, false, NaN, should];

    it('should return an array with falsey values filtered out', function() {
      var compacted = array.compact();
      should.deepEqual(compacted, ['a', 1, 2, true, should]);
    });
  });


  describe('#difference()', function() {
    var array = [1, 2, 3, 4, 5, 2];

    it('should return a clone when called with no parameters', function() {
      var diff = array.difference();
      diff.should.not.equal(array);
      should.deepEqual(diff, array);
    });

    it('should perform a set difference when given one array as input', function() {
      var diff = array.difference([4, 5, 10]);
      should.deepEqual(diff, [1, 2, 3, 2]);
    });

    it('should perform a set difference when given multiple arrays as input', function() {
      var diff = array.difference([5, 2], [1, 4]);
      should.deepEqual(diff, [3]);
    });
  });


  describe('#diff()', function() {
    it('should be an alias of #difference()', function() {
      var array = [];
      array.diff.should.equal(array.difference);
    });
  });


  describe('#each()', function() {
    it('should return the array it was called on', function() {
      var array = [];
      array.each(function() {}).should.equal(array);
      array.each(function() {}, true).should.equal(array);
    });

    it('should iterate over an array, calling the callback with the correct arguments', function() {
      var array = [3, 4, 5];
      var seen = [];
      array.each(function(v, k, a) {
        seen.push({key: k, value: v, array: a});
      });
      should.deepEqual(seen, [
        {key: 0, value: 3, array: array},
        {key: 1, value: 4, array: array},
        {key: 2, value: 5, array: array}
      ]);
    });

    it('should stop iterating if the callback returns false', function() {
      var seen = [];
      [1, 2, 3].each(function(v, k) {
        seen.push(v);
        if (k === 1) {
          return false;
        }
      });
      should.deepEqual(seen, [1, 2]);
    });

    it('should invoke the callback in the context of the value', function() {
      [{}, []].each(function(v) {
        this.should.equal(v);
      });
    });

    it('should invoke the callback on deleted and elided indices by default', function() {
      var array = new Array(3);
      array[0] = 'a';
      array[1] = 'b';
      delete array[0];

      var seen = [];
      array.each(function(v) {
        seen.push(v);
      });

      should.deepEqual(seen, [undefined, 'b', undefined]);
    });

    it('should not invoke the callback on deleted and elided indices when safeIteration is true', function() {
      var array = new Array(3);
      array[0] = 'a';
      array[1] = 'b';
      delete array[0];

      var seen = [];
      array.each(function(v, k, a) {
        seen.push({key: k, value: v, array: a});
      }, true);

      should.deepEqual(seen, [{key: 1, value: 'b', array: array}]);
    });
  });


  describe('#equals()', function() {
    var array = [1, 2, 3];

    it('should report that an array equals itself', function() {
      array.equals(array).should.be.true;
    });

    it('should report that an array equals another array with the same values', function() {
      array.equals([1, 2, 3]).should.be.true;
    });

    it('should report that an array does not equal another array with the same values but out of order', function() {
      array.equals([3, 2, 1]).should.be.false;
    });

    it('should report that an array does not equal another that has a different length', function() {
      array.equals([1, 2]).should.be.false;
    });

    it('should return false when the input is null or undefined', function() {
      array.equals(null).should.be.false;
      array.equals().should.be.false;
    });
  });


  describe('#get()', function() {
    var array = [1, 2, 3];

    it('should return the specified item in the array', function() {
      array.get(0).should.equal(1);
      array.get(1).should.equal(2);
      array.get(2).should.equal(3);
      should.strictEqual(array.get(3), undefined);
      array.get(-1).should.equal(3);
      array.get(-2).should.equal(2);
      array.get(-3).should.equal(1);
      should.strictEqual(array.get(-4), undefined);
    });
  });


  describe('#intersect()', function() {
    var array = [1, 2, 3];

    it('should return an empty array when called with no parameters', function() {
      array.intersect().should.be.an.empty.Array;
    });

    it('should return the intersection when given one array as input', function() {
      var actual = array.intersect([2, 3, 4]);
      should.deepEqual(actual, [2, 3]);
    });

    it('should return the intersection when given multiple arrays as input', function() {
      var actual = array.intersect([107, 1, 50, 2], [2, 1]);
      should.deepEqual(actual, [1, 2]);

      array.intersect(array, [], array).should.be.an.empty.Array;
    });
  });


  describe('#natsort()', function() {
    var array = [
      'a10',
      'a1',
      'a2',
      'a',
      'A3'
    ];

    it('should return the array it was called on', function() {
      array.natsort().should.equal(array);
    });

    it('should sort the array using natural string comparison', function() {
      should.deepEqual(array, [
        'A3',
        'a',
        'a1',
        'a2',
        'a10'
      ]);
    });

    it('should sort perform a case-insensitive sort when caseInsensitive is true', function() {
      array.natsort(true);
      should.deepEqual(array, [
        'a',
        'a1',
        'a2',
        'A3',
        'a10'
      ]);
    });
  });


  describe('#numsort()', function() {
    var array = [1, 10, 2, 0, 3];

    it('should return the array it was called on', function() {
      array.numsort().should.equal(array);
    });

    it('should sort the array using numerical comparison', function() {
      should.deepEqual(array, [0, 1, 2, 3, 10]);
    });
  });


  describe('#rnumsort()', function() {
    var array = [1, 10, 2, 0, 3];

    it('should return the array it was called on', function() {
      array.rnumsort().should.equal(array);
    });

    it('should sort the array using reverse numerical comparison', function() {
      should.deepEqual(array, [10, 3, 2, 1, 0]);
    });
  });


  describe('#remove()', function() {
    var array = [1, 2, 3, 3, 4, 3, 4];

    it('should return the array it was called on', function() {
      array.remove(2).should.equal(array);
    });

    it('should remove the input value from the array', function() {
      should.deepEqual(array, [1, 3, 3, 4, 3, 4]);
    });

    it('should remove all instances of the input value', function() {
      array.remove(3);
      should.deepEqual(array, [1, 4, 4]);
    });

    it('should remove nothing if the specified value is not in the array', function() {
      array.remove(2);
      should.deepEqual(array, [1, 4, 4]);
    });

    it('should remove all instances of multiple input values', function() {
      array.remove(1, 4);
      should.deepEqual(array, []);
    });
  });


  describe('#rem()', function() {
    it('should be an alias of #remove()', function() {
      var array = [];
      array.rem.should.equal(array.remove);
    });
  });


  describe('#union()', function() {
    var array = [1, 2, 3, 2];

    it('should return a clone without duplicates when called with no parameters', function() {
      var union = array.union();
      union.should.not.equal(array);
      should.deepEqual(union, [1, 2, 3]);
    });

    it('should perform a set union when given one array as input', function() {
      var union = array.union([2, 3, 4, 5]);
      should.deepEqual(union, [1, 2, 3, 4, 5]);
    });

    it('should perform a set union when given multiple arrays as input', function() {
      var union = array.union([3, 4], [50, 9]);
      should.deepEqual(union, [1, 2, 3, 4, 50, 9]);
    });
  });


  describe('#unique()', function() {
    it('should return a clone if the array is already unique', function() {
      var array = [1, 2, 3, 0];
      var actual = array.unique();
      actual.should.not.equal(array);
      should.deepEqual(actual, array);
    });

    it('should return a unique set when called on an unsorted array with duplicates', function() {
      should.deepEqual([4, 2, 3, 2, 1, 4].unique(), [4, 2, 3, 1]);
    });

    it('should return a unique set when called on a sorted array with duplicates', function() {
      should.deepEqual([1, 2, 2, 3, 4, 4].unique(), [1, 2, 3, 4]);
    });

    it('should return a unique set when called on a sorted array with duplicates and isSorted is true', function() {
      should.deepEqual([1, 2, 2, 3, 4, 4].unique(true), [1, 2, 3, 4]);
    });

    it('should correctly unique an array with undefined as the last element when isSorted is true', function() {
      should.deepEqual([1, 2, 2, 3, undefined].unique(true), [1, 2, 3, undefined]);
    });

    // Not very useful, but satifies code coverage
    it('should return a new empty array when the original array is empty', function() {
      var array = [];
      array.unique().should.be.an.Array.and.be.empty.and.not.equal(array);
      array.unique(true).should.be.an.Array.and.be.empty.and.not.equal(array);
    });
  });


  describe('#uniq()', function() {
    it('should be an alias of #unique()', function() {
      var array = [];
      array.uniq.should.equal(array.unique);
    });
  });


  describe('#without()', function() {
    var array = [1, 2, 3, 3, 4, 3];

    it('should return a clone when called with no parameters', function() {
      var without = array.without();
      should.deepEqual(without, array);
    });

    it('should return a new array without a single specified item', function() {
      should.deepEqual(array.without(2), [1, 3, 3, 4, 3]);
    });

    it('should return a new array without all instances of the input value', function() {
      should.deepEqual(array.without(3), [1, 2, 4]);
    });

    it('should return a new array without all instances of multiple input values', function() {
      should.deepEqual(array.without(1, 4, 3), [2]);
    });
  });


  describe('#xor()', function() {
    it('should return a clone without duplicates when called with no parameters', function() {
      var actual = [4, 2, 3, 2, 1, 4].xor();
      should.deepEqual(actual, [4, 2, 3, 1]);
    });

    it('should return the symmetric difference of the given arrays', function() {
      var actual = [1, 2, 5].xor([2, 3, 5], [3, 4, 5]);
      should.deepEqual(actual, [1, 4, 5]);
    });

    it('should return an array of unique values', function() {
      var actual = [1, 1, 2, 2, 5].xor([2, 2, 3, 5], [3, 4, 5, 5]);
      should.deepEqual(actual, [1, 4, 5]);

      actual = [4, 2, 3, 2, 1, 4].xor([2, 1]);
      should.deepEqual(actual, [4, 3]);
    });
  });

});
