const phrase = require('paraphrase/double');
const { writeFile, readFile } = require('fs').promises;
const { resolve } = require('path');

module.exports = async function setup(type) {
    const template = (await readFile(resolve('./templates/config.js'))).toString();

    await writeFile(
        resolve(`./config.${type}.js`),
        phrase(template, {type, dirname: __dirname})
    );
};
