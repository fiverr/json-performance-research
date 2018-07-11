const { resolve } = require('path');
const { writeFile, readFile, unlink } = require('fs').promises;

/**
 * Delete files
 * @param  {...String} names
 * @return {Promise}
 */
module.exports = (...names) => Promise.all(
    names.map(
        async name => unlink(resolve(name))
    )
);