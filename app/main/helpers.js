const {app} = require('electron');
const settings = require('../core/settings');
const networkScanner = require('../core/network/scanner');
const sshServer = require('../core/ssh/server');
const webServer = require('../core/web/server');
const helpers = require('./helpers');

function checkSshPort (cb) {
    networkScanner.isPortTaken(
        sshServer.port,
        (err, res) => {
            if (res) {
                console.log(
                    'SSH server could not be started, because another process already uses the port ' +
                    sshServer.port
                );
                app.quit();

                return false;
            }

            cb();
        }
    );
}

function checkWebPort (cb) {
    networkScanner.isPortTaken(
        webServer.port,
        (err, res) => {
            if (res) {
                console.log(
                    'SSH server could not be started, because another process already uses the port ' +
                    webServer.port
                );
                app.quit();

                return false;
            }

            cb();
        }
    );
}

module.exports = {
    checkSshPort: checkSshPort,
    checkWebPort: checkWebPort,
};
