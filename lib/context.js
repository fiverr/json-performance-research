const { resolve } = require('path');
const { writeFile, readFile } = require('fs').promises;
const phrase = require('paraphrase/double');

module.exports = async function context(type) {
    const template = (await readFile(resolve(`./templates/${type}.html`))).toString();
    const data = require('../src/data.json');

    await writeFile(
        resolve(`./${type}.html`),
        phrase(template, {
            data: JSON.stringify(data)
        })
    );
    return;
};
