const { readFile } = require('fs').promises;
const { resolve } = require('path');
const {
    addline,
    context,
    fullArray,
    remove,
    run,
    setup,
    webhook,
 } = require('./lib');

process.on('unhandledRejection', console.error);

(async() => {
    const types = ['object', 'string'];
    const iterations = parseInt(process.env.npm_config_i || 2);
    const array = fullArray(iterations, 1);

    await Promise.all([
        ...types.map(context),
        ...types.map(setup),
    ])

    while (array.pop()) {
        await Promise.all(
            types.map(async type => run({configFile: `${__dirname}/config.${type}.js`}))
        );
    }

    const results = await analyse('./logfile.log', {iterations});

    await Promise.all([
        addline('./results.log', JSON.stringify(results)),
        message(results),
        remove(
            ...types.reduce(
                (accumulator, type) => [
                    ...accumulator,
                    `./config.${type}.js`,
                    `./${type}.html`
                ],
                []
            ),
            './logfile.log'
        ),
    ]);
})();

async function analyse(logfile, {iterations}) {
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

const message = async results => webhook(
    {
        text: `Here are your results from \`json-performance-research\` test:
${Object.keys(results).filter(key => key !== 'iterations').map(metric => `Average time of test "${metric}": ${results[metric]}`).join('\n')}
Tested ${results.iterations} iterations.`,
    }
);
