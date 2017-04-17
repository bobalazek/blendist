const {app} = require('electron');
const config = require('../core/config');
const sshServer = require('../core/ssh/server');
const webServer = require('../core/web/server');

app.on('ready', () => {
    if (config.debug) {
        console.log('App is ready.');
    }

    sshServer.start();
    webServer.start();
});
