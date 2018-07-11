const { Server } = require('karma');

module.exports = (options) => new Promise(resolve => new Server(options, resolve).start());
