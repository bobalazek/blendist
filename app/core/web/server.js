const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
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

    // Prepare express stuff
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, '../../web')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Define the routes
    require('./routes')(app);

    // Start the server
    server = app.listen(
        webPort,
        '0.0.0.0'
    );

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
    port: webPort,
    start: start,
    stop: stop,
};
