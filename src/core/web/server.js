const express = require('express');
const app = express();
const config = require('./../config');
const settings = require('./../settings');
const machine = require('./../machine');

/* Prepare */
const webServerIp = machine.ip;
const webServerPort = settings.get('web_port');

/* Main */
function start (cb) {
    if (config.debug) {
        console.log('Starting Web Server ...');
    }

    app.listen(
        webServerPort,
        webServerIp
    );
    require('./routes')(app);

    if (config.debug) {
        console.log('Web Server started.');
        console.log('Web Server is listening on ' + webServerIp + ':' + webServerPort);
    }

    if (typeof cb != 'undefined') {
        cb();
    }
}

/* Export */
module.exports = {
    start: start,
};
