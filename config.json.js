const settings = {
    logLevel: 'INFO',
    singleRun: true,
    basePath: '',
    frameworks: [
        'mocha',
    ],
    browsers: [
        'Chrome',
    ],
    browserNoActivityTimeout: 60000,
    port: 9876,
    hooks: [
        'karma-webpack',
        'karma-chrome-launcher',
        'karma-log-reporter',
        'karma-mocha',
        'karma-mocha-reporter',
    ],
    reporters: [
        'log-reporter',
        'mocha',
    ],
    logReporter: {
        'outputName': 'logfile.log',
    },
    mochaReporter: {
        showDiff: true,
    },
    webpackServer: {
        noInfo: true,
        stats: 'errors-only',
    },
    files: [
        '/spaceship/json-perf/env.js',
        {
            pattern: 'tests/json.js',
        },
    ],
    preprocessors: {
        'tests/json.js': [
            'webpack',
        ],
        '/spaceship/json-perf/env.js': [
            'webpack',
        ],
    },
    customContextFile: 'contexts/json.html',
};

module.exports = (config) => {
    config.set(settings);
};