/**
 * Create an occupied array of a certain length
 * @param  {Number} length Length of the array
 * @param  {Number} value  Item for each of the members
 * @return {Array}
 */
module.exports = function fullArray(length, value = 0) {
    const array = [];
    array.length = length;
    array.fill(value);
    return array;
};
