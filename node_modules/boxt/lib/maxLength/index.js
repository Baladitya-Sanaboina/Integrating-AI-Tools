const length = require('../length');

/**
 * maxLength: Get the length of the longest item
 * @param  {...string}
 * @return {number}
 */
module.exports = (...args) => args.reduce((max, arg) => Math.max(length(arg), max), 0);
