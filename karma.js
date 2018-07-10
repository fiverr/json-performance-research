const { Server } = require('karma');
const phrase = require('paraphrase/double');
const { writeFile, readFile, unlink } = require('fs').promises;
const { resolve } = require('path');
const data = require('./src/data.json');
const iterations = 2;
const types = ['object', 'string'];

(async() => {
    const array = full_array(iterations, 1);

    await Promise.all([
        ...types.map(context),
        ...types.map(setup),
    ])

    while (array.pop()) {
        await Promise.all(
            types.map(type => run({configFile: `${__dirname}/config.${type}.js`}))
        );
    }

    addline('./results.log', JSON.stringify(await analyse('./logfile.log')))

    // Cleanup
    await Promise.all([
        ...types.map(type => unlink(resolve(`./config.${type}.js`))),
        ...types.map(type => unlink(resolve(`./contexts/${type}.html`))),
        unlink(resolve('./logfile.log'))
    ]);
})();

async function context(type) {
    const template = (await readFile(resolve(`./contexts/${type}.tmpl.html`))).toString();

    await writeFile(
        resolve(`./contexts/${type}.html`),
        phrase(template, {
            data: JSON.stringify(data)
        })
    );
    return;
}

const run = (options) => new Promise(resolve => new Server(options, resolve).start());

async function setup(type) {
    const template = (await readFile(resolve('./config.tmpl.js'))).toString();

    await writeFile(
        resolve(`./config.${type}.js`),
        phrase(template, {type, dirname: __dirname})
    );
}

function full_array(length, value = 0) {
    const array = [];
    array.length = length;
    array.fill(value);
    return array;
}

async function analyse(logfile) {
    const results = (await readFile(resolve(logfile))).toString().split('\n').filter(line => !!line);
    const sums = {};

    results.forEach(line => {
        const [key, value] = Object.entries(JSON.parse(line.trim())).pop();
        sums[key] = sums[key] || 0;
        sums[key] += value;
    });

    return Object.entries(sums).reduce(
        (accumulator, [key, value]) => Object.assign(
            accumulator,
            {[key]: value / iterations}
        ),
        {iterations}
    );
}

async function addline(file, line) {
    let lines = '';

    try {
        lines += (await readFile(resolve(file))).toString()
    } catch (e) { /* ignore */ }

    lines += line + '\n';

    await writeFile(resolve(file), lines);
}
