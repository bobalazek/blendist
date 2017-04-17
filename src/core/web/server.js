const express = require('express');
const app = express();
const config = require('./../config');
const settings = require('./../settings');
const machine = require('./../machine');

/* Prepare */
const machineIp = machine.ip;
const webPort = settings.get('web_port');
let server;

/* Main */
function start (cb) {
    if (config.debug) {
        console.log('Starting Web Server ...');
    }

    server = app.listen(
        webPort,
        machineIp
    );
    require('./routes')(app);

    if (config.debug) {
        console.log('Web Server started.');
        console.log('Web Server is listening on ' + machineIp + ':' + webPort);
    }

    if (typeof cb != 'undefined') {
        cb();
    }
}

function stop (cb) {
    if (config.debug) {
        console.log('Stopping Web Server ...');
    }

    server.close(() => {
        if (config.debug) {
            console.log('Web Server stopped.');
        }

        if (typeof cb != 'undefined') {
            cb();
        }
    });
}

/* Export */
module.exports = {
    start: start,
    stop: stop,
};
