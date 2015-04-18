'use strict';

/* jshint expr: true */
/* global describe: true */
/* global it: true */

require('../pro-array');
var should = require('should');

describe('Array', function() {

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

  describe('#each()', function() {
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

    it('should call the callback in the context of the value', function() {
      [{}, []].each(function(v) {
        this.should.equal(v);
      });
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
      array.equals([3, 2, 1]).should.not.be.true;
    });

    it('should report that an array does not equal another that has a different length', function() {
      array.equals([1, 2]).should.not.be.true;
    });

    it('should throw a TypeError when executed with undefined input', function() {
      (function() { array.equals(); }).should.throw(TypeError);
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

    it('should return a clone when called with no parameters', function() {
      var inter = array.intersect();
      inter.should.not.equal(array);
      should.deepEqual(inter, array);
    });

    it('should perform a set intersection when given one array as input', function() {
      var inter = array.intersect([2, 3, 4]);
      should.deepEqual(inter, [2, 3]);
    });

    it('should perform a set intersection when given multiple arrays as input', function() {
      var inter = array.intersect([107, 1, 50, 2], [2, 1]);
      should.deepEqual(inter, [1, 2]);
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

  describe('#union()', function() {
    var array = [1, 2, 3];

    it('should return a clone when called with no parameters', function() {
      var union = array.union();
      union.should.not.equal(array);
      should.deepEqual(union, array);
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
    it('should return a clone when called with no parameters', function() {
      should.deepEqual([1, 2, 3, 0].uniq(), [1, 2, 3, 0]);
    });

    it('should return a unique set when called on an unsorted array with duplicates', function() {
      should.deepEqual([4, 2, 3, 2, 1, 4].uniq(), [4, 2, 3, 1]);
    });

    it('should return a unique set when called on a sorted array with duplicates', function() {
      should.deepEqual([1, 2, 2, 3, 4, 4].uniq(), [1, 2, 3, 4]);
    });

    it('should return a unique set when called on a sorted array with duplicates and isSorted is true', function() {
      should.deepEqual([1, 2, 2, 3, 4, 4].uniq(true), [1, 2, 3, 4]);
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

});
