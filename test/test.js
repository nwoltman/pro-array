'use strict';

var should = require('should');
var sinon = require('sinon');

require('../pro-array');
require('should-sinon');
require('string-natural-compare');

should.Assertion.add('shallowEqual', function(expected) {
  this.params = {operator: 'to be shallowly equal'};

  this.obj.length.should.equal(expected.length);
  for (var i = 0; i < expected.length; i++) {
    should.strictEqual(this.obj[i], expected[i]);
  }
});

should.Assertion.add('cloneOf', function(expected) {
  this.params = {operator: 'to be a clone'};

  this.obj.should.shallowEqual(expected).and.not.equal(expected);
});


describe('Array', function() {

  describe('.prototype', function() {
    it('should not have enumerable properties', function() {
      Array.prototype.should.be.empty();
    });
  });


  describe('#bsearch()', function() {
    it('should return the index of the specified value', function() {
      var array = [4, 5, 6];
      array.bsearch(4).should.equal(0);
      array.bsearch(5).should.equal(1);
      array.bsearch(6).should.equal(2);

      array = [2, 4, 5, 9];
      array.bsearch(2).should.equal(0);
      array.bsearch(4).should.equal(1);
      array.bsearch(5).should.equal(2);
      array.bsearch(9).should.equal(3);
    });

    it('should return one of the indexes of the specified value if there are duplicates', function() {
      var array = [1, 1, 2, 2, 3, 3, 3];
      array.bsearch(1).should.match(function(value) {
        return value === 0 || value === 1;
      });
      array.bsearch(2).should.match(function(value) {
        return value === 2 || value === 3;
      });
      array.bsearch(3).should.match(function(value) {
        return value === 4 || value === 5 || value === 6;
      });
    });

    it('should return -1 if the value cannot be found', function() {
      [].bsearch(0).should.equal(-1);
      [1, 2, 3, 11, 20].bsearch(10).should.equal(-1);
    });

    it('should accept a compareFunction', function() {
      function numericalCompare(a, b) {
        return a - b;
      }
      function numericalCompareReverse(a, b) {
        return b - a;
      }

      var array = [4, 5, 6];
      array.bsearch(4, numericalCompare).should.equal(0);
      array.bsearch(5, numericalCompare).should.equal(1);
      array.bsearch(6, numericalCompare).should.equal(2);

      array = [6, 5, 4];
      array.bsearch(6, numericalCompareReverse).should.equal(0);
      array.bsearch(5, numericalCompareReverse).should.equal(1);
      array.bsearch(4, numericalCompareReverse).should.equal(2);

      ['img1', 'img2', 'img10', 'img13'].bsearch('img2', String.naturalCompare).should.equal(1);
    });
  });


  describe('#chunk()', function() {
    var array = [0, 1, 2, 3, 4, 5];

    it('should return an array of chunks', function() {
      array.chunk(3).should.eql([[0, 1, 2], [3, 4, 5]]);
    });

    it('should return the last chunk as remaining elements', function() {
      array.chunk(4).should.eql([[0, 1, 2, 3], [4, 5]]);
      array.chunk(5).should.eql([[0, 1, 2, 3, 4], [5]]);
    });

    it('should run with a default chunk size of 1', function() {
      array.chunk().should.eql([[0], [1], [2], [3], [4], [5]]);
    });
  });


  describe('#clear()', function() {
    it('should empty an array', function() {
      var array = [1, 2, 3];
      array.clear();
      array.should.be.empty();
    });

    it('should return the array', function() {
      var array = [1, 2, 3];
      array.clear().should.equal(array);
    });
  });


  describe('#clone()', function() {
    it('should make an exact copy of an array', function() {
      var array = [1, 99, '', {}, ['a', 'b'], false, /regex/];
      array.clone().should.be.a.cloneOf(array);
    });
  });


  describe('#compact()', function() {
    it('should return an array with falsey values filtered out', function() {
      var array = ['a', '', 1, 2, 0, null, true, undefined, false, NaN, should];
      array.compact().should.shallowEqual(['a', 1, 2, true, should]);
    });
  });


  describe('#difference()', function() {
    it('should return a clone when called with no parameters', function() {
      var array = [1, 2, 3, 4, 5, 2];
      array.difference().should.be.a.cloneOf(array);
    });

    it('should perform a set difference when given one array as input', function() {
      [1, 2, 3, 4, 5, 2].difference([4, 5, 10]).should.eql([1, 2, 3, 2]);
    });

    it('should perform a set difference when given multiple arrays as input', function() {
      [1, 2, 3, 4, 5, 2].difference([5, 2], [1, 4]).should.eql([3]);
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
      seen.should.eql([
        {key: 0, value: 3, array: array},
        {key: 1, value: 4, array: array},
        {key: 2, value: 5, array: array},
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
      seen.should.eql([1, 2]);
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

      seen.should.eql([undefined, 'b', undefined]);
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

      seen.should.eql([{key: 1, value: 'b', array: array}]);
    });
  });


  describe('#equals()', function() {
    it('should report that an array equals itself', function() {
      var array = [1, 2, 3];
      array.equals(array).should.be.true();
    });

    it('should report that an array equals another array with the same values', function() {
      [1, 2, 3].equals([1, 2, 3]).should.be.true();
    });

    it('should report that an array does not equal another array with the same values but out of order', function() {
      [1, 2, 3].equals([3, 2, 1]).should.be.false();
    });

    it('should report that an array does not equal another that has a different length', function() {
      [1, 2, 3].equals([1, 2]).should.be.false();
    });

    it('should return false when the input is null or undefined', function() {
      [].equals(null).should.be.false();
      [].equals().should.be.false();
    });
  });


  describe('#flatten()', function() {
    beforeEach(function() {
      sinon.spy(Array.prototype, 'flattenDeep');
    });

    afterEach(function() {
      Array.prototype.flattenDeep.restore();
    });

    it('should perform a shallow flatten', function() {
      [[['a']], [['b']]].flatten().should.deepEqual([['a'], ['b']]);
    });

    it('should treat sparse arrays as dense', function() {
      var array = [[1, 2, 3], new Array(3)];
      var expected = [1, 2, 3, undefined, undefined, undefined];
      array.flatten().should.deepEqual(expected);
    });

    it('should work with empty arrays', function() {
      var array = [[], [[]], [[], [[[]]]]];
      array.flatten().should.deepEqual([[], [], [[[]]]]);
    });

    it('should support flattening of nested arrays', function() {
      var array = [1, [[], 2, 3], 4, [[5]]];
      array.flatten().should.deepEqual([1, [], 2, 3, 4, [5]]);
    });

    it('should ignore noCallStack if isDeep is not true', function() {
      var array = [1, 2, [3, [4]]];
      array.flatten(null, true).should.deepEqual([1, 2, 3, [4]]);
      array.flattenDeep.should.not.be.called();
    });

    it('should call #flattenDeep() when isDeep is true', function() {
      var array = [1, 2, [3, [4]]];

      array.flatten(true).should.deepEqual([1, 2, 3, 4]);
      array.flattenDeep.should.be.calledOnce().and.be.calledWithExactly(undefined);

      array.flatten();
      array.flattenDeep.should.be.calledOnce();
    });

    it('should call #flattenDeep(noCallStack) when isDeep is true', function() {
      var array = [1, 2, [3, [4]]];
      array.flatten(true, true).should.deepEqual([1, 2, 3, 4]);
      array.flattenDeep.should.be.calledWithExactly(true);
    });
  });


  describe('#flattenDeep(noCallStack=false)', function() {
    it('should flatten shallow nested arrays', function() {
      [['a'], ['b']].flattenDeep().should.deepEqual(['a', 'b']);
    });

    it('should treat sparse arrays as dense', function() {
      var array = [[1, 2, 3], new Array(3)];
      var expected = [1, 2, 3, undefined, undefined, undefined];
      array.flattenDeep().should.deepEqual(expected);
    });

    it('should work with empty arrays', function() {
      var array = [[], [[]], [[], [[[]]]]];
      array.flattenDeep().should.deepEqual([]);
    });

    it('should support flattening of nested arrays', function() {
      var array = [1, [[], 2, 3], 4, [[5]]];
      array.flattenDeep().should.deepEqual([1, 2, 3, 4, 5]);
    });
  });


  describe('#flattenDeep(noCallStack=true)', function() {
    it('should flatten shallow nested arrays', function() {
      [['a'], ['b']].flattenDeep(true).should.deepEqual(['a', 'b']);
    });

    it('should treat sparse arrays as dense', function() {
      var array = [[1, 2, 3], new Array(3)];
      var expected = [1, 2, 3, undefined, undefined, undefined];
      array.flattenDeep(true).should.deepEqual(expected);
    });

    it('should work with empty arrays', function() {
      var array = [[], [[]], [[], [[[]]]]];
      array.flattenDeep(true).should.deepEqual([]);
    });

    it('should support flattening of nested arrays', function() {
      var array = [1, [[], 2, 3], 4, [[5]]];
      array.flattenDeep(true).should.deepEqual([1, 2, 3, 4, 5]);
    });

    it('should not be susceptible to call stack limits', function() {
      this.timeout(0);
      var expected = [];
      var array = [];
      var nestedArray = array;
      for (var i = 0; i < 100000; i++) {
        expected.push(i);
        nestedArray.push(i, nestedArray = []);
      }
      array.flattenDeep(true).should.deepEqual(expected);
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
    it('should return an empty array when called with no parameters', function() {
      [1, 2, 3].intersect().should.be.an.empty().Array();
    });

    it('should return the intersection when given one array as input', function() {
      [1, 2, 3].intersect([2, 3, 4]).should.eql([2, 3]);
    });

    it('should return the intersection when given multiple arrays as input', function() {
      [1, 2, 3].intersect([107, 1, 50, 2], [2, 1]).should.eql([1, 2]);
      [1, 2, 3].intersect([1, 2, 3], [], [2, 3]).should.be.an.empty().Array();
    });
  });


  describe('#natsort()', function() {
    var array = [
      'a10',
      'a1',
      'a2',
      'a',
      'A3',
    ];

    it('should return the array it was called on', function() {
      array.natsort().should.equal(array);
    });

    it('should sort the array using natural string comparison', function() {
      array.should.eql([
        'A3',
        'a',
        'a1',
        'a2',
        'a10',
      ]);
    });

    it('should sort perform a case-insensitive sort when caseInsensitive is true', function() {
      array.natsort(true).should.equal(array).and.eql([
        'a',
        'a1',
        'a2',
        'A3',
        'a10',
      ]);
    });
  });


  describe('#rnatsort()', function() {
    var array = [
      'a10',
      'a1',
      'a2',
      'a',
      'A3',
    ];

    it('should return the array it was called on', function() {
      array.rnatsort().should.equal(array);
    });

    it('should sort the array using natural string comparison, but in descending order', function() {
      array.should.eql([
        'a10',
        'a2',
        'a1',
        'a',
        'A3',
      ]);
    });

    it('should sort perform a case-insensitive sort when caseInsensitive is true', function() {
      array.rnatsort(true).should.equal(array).and.eql([
        'a10',
        'A3',
        'a2',
        'a1',
        'a',
      ]);
    });
  });


  describe('#numsort()', function() {
    var array = [1, 10, 2, 0, 3];

    it('should return the array it was called on', function() {
      array.numsort().should.equal(array);
    });

    it('should sort the array using numerical comparison', function() {
      array.should.eql([0, 1, 2, 3, 10]);
    });
  });


  describe('#rnumsort()', function() {
    var array = [1, 10, 2, 0, 3];

    it('should return the array it was called on', function() {
      array.rnumsort().should.equal(array);
    });

    it('should sort the array using reverse numerical comparison', function() {
      array.should.eql([10, 3, 2, 1, 0]);
    });
  });


  describe('#remove()', function() {
    var array = [1, 2, 3, 3, 4, 3, 4];

    it('should return the array it was called on', function() {
      array.remove(2).should.equal(array);
    });

    it('should remove the input value from the array', function() {
      array.should.eql([1, 3, 3, 4, 3, 4]);
    });

    it('should remove all instances of the input value', function() {
      array.remove(3).should.eql([1, 4, 4]);
    });

    it('should remove nothing if the specified value is not in the array', function() {
      array.remove(2).should.eql([1, 4, 4]);
    });

    it('should remove all instances of multiple input values', function() {
      array.remove(1, 4).should.eql([]);
    });
  });


  describe('#pull()', function() {
    it('should be an alias of #remove()', function() {
      var array = [];
      array.pull.should.equal(array.remove);
    });
  });


  describe('#union()', function() {
    it('should return a clone without duplicates when called with no parameters', function() {
      var array = [1, 2, 3, 2];
      array.union().should.eql([1, 2, 3]).not.equal(array);
    });

    it('should perform a set union when given one array as input', function() {
      [1, 2, 3, 2].union([2, 3, 4, 5]).should.eql([1, 2, 3, 4, 5]);
    });

    it('should perform a set union when given multiple arrays as input', function() {
      [1, 2, 3].union([3, 4], [50, 9, 1]).should.eql([1, 2, 3, 4, 50, 9]);
    });
  });


  describe('#unique()', function() {
    it('should return a clone if the array is already unique', function() {
      var array = [1, 2, 3, 0];
      array.unique().should.be.a.cloneOf(array);
    });

    it('should return a unique set when called on an unsorted array with duplicates', function() {
      [4, 2, 3, 2, 1, 4].unique().should.eql([4, 2, 3, 1]);
    });

    it('should return a unique set when called on a sorted array with duplicates', function() {
      [1, 2, 2, 3, 4, 4].unique().should.eql([1, 2, 3, 4]);
    });

    it('should return a unique set when called on a sorted array with duplicates and isSorted is true', function() {
      [1, 2, 2, 3, 4, 4].unique(true).should.eql([1, 2, 3, 4]);
    });

    it('should correctly unique an array with undefined as the last element when isSorted is true', function() {
      [1, 2, 2, 3, undefined].unique(true).should.eql([1, 2, 3, undefined]);
    });

    // Not very useful, but satifies code coverage
    it('should return a new empty array when the original array is empty', function() {
      var array = [];
      array.unique().should.be.an.empty().Array().and.not.equal(array);
      array.unique(true).should.be.an.empty().Array().and.not.equal(array);
    });
  });


  describe('#uniq()', function() {
    it('should be an alias of #unique()', function() {
      var array = [];
      array.uniq.should.equal(array.unique);
    });
  });


  describe('#without()', function() {
    it('should return a clone when called with no parameters', function() {
      var array = [1, 2, 3, 3, 4, 3];
      array.without().should.be.a.cloneOf(array);
    });

    it('should return a new array without a single specified item', function() {
      [1, 2, 3, 3, 4, 3].without(2).should.eql([1, 3, 3, 4, 3]);
    });

    it('should return a new array without all instances of the input value', function() {
      [1, 2, 3, 3, 4, 3].without(3).should.eql([1, 2, 4]);
    });

    it('should return a new array without all instances of multiple input values', function() {
      [1, 2, 3, 3, 4, 3].without(1, 4, 3).should.eql([2]);
    });
  });


  describe('#xor()', function() {
    it('should return a clone without duplicates when called with no parameters', function() {
      [4, 2, 3, 2, 1, 4].xor().should.eql([4, 2, 3, 1]);
    });

    it('should return the symmetric difference of the given arrays', function() {
      [1, 2, 5].xor([2, 3, 5], [3, 4, 5]).should.eql([1, 4, 5]);
    });

    it('should return an array of unique values', function() {
      [1, 1, 2, 2, 5].xor([2, 2, 3, 5], [3, 4, 5, 5]).should.eql([1, 4, 5]);
      [4, 2, 3, 2, 1, 4].xor([2, 1]).should.eql([4, 3]);
    });
  });

});
