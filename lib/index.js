module.exports = [
    'addline',
    'context',
    'fullArray',
    'remove',
    'run',
    'setup',
    'webhook',
].reduce(
    (accumulator, modul) => ({...accumulator, [modul]: require(`./${modul}`)}),
    {}
);
