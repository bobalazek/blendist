const {app} = require('electron');
const config = require('../core/config');
const sshServer = require('../core/ssh/server');

app.on('ready', () => {
    if (config.debug) {
        console.log('App is ready.');
    }

    sshServer.start();
});
