'use strict';

exports.stripNewlines = stripNewlines;
exports.tableHead = tableHead;
exports.tableAttributes = tableAttributes;

// This will be unnecessary when https://github.com/jsdoc2md/ddata/pull/1 gets merged
function stripNewlines(input) {
  return input ? input.replace(/[\r\n]+/g, '') : '';
}

/**
 * Returns a gfm table header row only with columns that contain data included in the output.
 */
function tableHead() {
  var numArgs = arguments.length;
  var args = new Array(numArgs);
  for (var i = 0; i < numArgs; i++) {
    args[i] = arguments[i];
  }
  var data = args.shift();
  if (!data) return;
  args.pop();
  var cols = args;
  var colHeaders = cols.map(function(col) {
    var spl = col.split('|');
    return spl[1] || spl[0];
  });
  cols = cols.map(function(col) {
    return col.split('|')[0];
  });
  var toSplice = [];
  cols = cols.filter(function(col, index){
    var hasValue = data.some(function(row) {
      return col.split(',').some(function(c) {
        return typeof row[c] !== 'undefined';
      });
    });
    if (!hasValue) toSplice.push(index);
    return hasValue;
  });
  toSplice.reverse().forEach(function(index) {
    colHeaders.splice(index, 1);
  });

  var table = '| ' + colHeaders.join(' | ') + ' |\n';
  table += cols.reduce(function(p) {
    return p + ' --- |';
  }, '|') + '\n';
  return table;
}

/**
 * Returns the Attributes row of a params table in gfm.
 */
function tableAttributes(variable, nullable) {
  var res = '';
  if (variable) {
    res = '<repeatable>';
  }
  if (nullable) {
    res += (res ? ', ' : '') + '<nullable>';
  }
  if (res) {
    res += ' | ';
  }
  return res;
}
