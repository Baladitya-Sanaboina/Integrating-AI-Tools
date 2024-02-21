/**
 * arrayOf: Returns an array of n repetitions
 * @param  {string} content
 * @param  {number} length
 * @return {Array} n repetition of an item
 *
 * @example arrayOf('-', 3) // ['-', '-', '-']
 */
module.exports = (content, length) => new Array(length + 1).join(content);
