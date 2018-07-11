module.exports = [
    'report',
].reduce(
    (accumulator, modul) => ({...accumulator, [modul]: require(`./${modul}`)}),
    {}
);
