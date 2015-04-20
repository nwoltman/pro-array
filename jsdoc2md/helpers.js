'use strict';

// This will be unnecessary when https://github.com/jsdoc2md/ddata/pull/1 gets merged
exports.stripNewlines = function(input) {
  return input ? input.replace(/[\r\n]+/g, '') : '';
};
