const {app} = require('electron');
const config = require('../core/config');
const settings = require('../core/settings');
const networkScanner = require('../core/network/scanner');
const sshServer = require('../core/ssh/server');
const webServer = require('../core/web/server');
const helpers = require('./helpers');

app.on('ready', () => {
    if (config.debug) {
        console.log('App is ready.');
    }

    helpers.checkSshPort(() => {
        if (settings.get('is_server')) {
            helpers.checkWebPort(() => {
                sshServer.start();
                webServer.start();
                networkScanner.findMachines();
            });
        } else {
            sshServer.start();
        }
    });
});
