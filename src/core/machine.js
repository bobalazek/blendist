const os = require('os');
const ip = require('ip');
const settings = require('./settings');

module.exports = {
    hostname: os.hostname(),
    os: os.platform(),
    ip: ip.address(),
    cpus: os.cpus(),
    status: 'idle',
    memory: {
        total: parseInt(os.totalmem() / 1024 / 1024),
        free: parseInt(os.freemem() / 1024 / 1024),
    },
    is_server: settings.get('is_server'),
    is_worker: settings.get('is_worker'),
};
