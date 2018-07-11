const { resolve } = require('path');
const { writeFile, readFile } = require('fs').promises;

module.exports = async function addline(file, line) {
    let lines = [];

    try {
        lines.push((await readFile(resolve(file))).toString())
    } catch (e) { /* ignore */ }

    lines.push(line);

    await writeFile(resolve(file), lines.join('\n'));
};
