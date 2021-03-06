const ssh2 = require('ssh2');
const net = require('net');
const Socket = net.Socket;
const config = require('./../config');
const settings = require('./../settings');
const registry = require('./../registry');
const Machine = require('./../models/machine');

/* Prepare */
const timeout = 1000;
let ips = [];

/* Main */
function scan (cb) {
    ips = [];
    let remainingIps = 256;

    for (var i = 0; i < 256; i++) {
        scanPort(
            settings.get('ssh_port'),
            '192.168.1.' + i,
            (port, host) => {
                ips.push(host);
                remainingIps--;
            },
            () => {
                remainingIps--;
            }
        );
    }

    let interval = setInterval(() => {
        if (remainingIps <= 0) {
            clearInterval(interval);

            if (config.debug) {
                console.log('Found the following IPs:');
                console.log(ips);
            }

            if (typeof cb != 'undefined') {
                cb(ips);
            }
        }
    }, 200);
}

function scanPort(port, host, successCallback, errorCallback) {
    if (config.debug) {
        console.log('Start scanning ' + host + ':' + port + ' ...');
    }

    const client = new Socket();

    client.setTimeout(timeout);
    client.on('connect', function() {
        successCallback(port, host);
        client.end();
    });

    client.on('timeout', function() { errorCallback(); client.destroy(); });
    client.on('error', function(exception) { errorCallback(); });
    client.on('close', function(exception) { errorCallback(); });

    client.connect(port, host);
}

function findMachines (cb) {
    scan((ips) => {
        getMachinesInfo(ips, (machines) => {
            if (typeof cb != 'undefined') {
                cb(machines);
            }
        });
    });
}

function isPortTaken(port, fn) {
    var success_ix = 0;
    var net = require('net')
    var test_ipv4 = net.createServer()
        .once('error', (err) => {
            if (err.code != 'EADDRINUSE') {
                return fn(err);
            }

            fn(null, true);
        })
        .once('listening', () => {
            test_ipv4
                .once('close', () => {
                    success_ix++;

                    if (success_ix == 2) {
                        fn(null, false)
                    }
                })
                .close();
        })
        .listen(port, '0.0.0.0');

    var test_ipv6 = net.createServer()
        .once('error', (err) => {
            if (err.code != 'EADDRINUSE') {
                return fn(err);
            }

            fn(null, true)
        })
        .once('listening', () => {
            test_ipv6
                .once('close', () => {
                    success_ix++;

                    if (success_ix == 2) {
                        fn(null, false)
                    }
                })
                .close();
        })
        .listen(port, '::');
}

/* Helpers */
function getMachinesInfo (ips, cb) {
    const ipsCount = ips.length;
    let machines = [];
    let remainingIps = ipsCount;

    if (ipsCount) {
        for (let i = 0; i < ipsCount; i++) {
            const ip = ips[i];
            getHostInfo(ip, (data) => {
                machines.push(
                    new Machine(data)
                );

                remainingIps--;
            });
        }
    }

    let interval = setInterval(() => {
        if (remainingIps <= 0) {
            clearInterval(interval);

            if (config.debug) {
                console.log('Got infos for all machines.');
            }

            registry.machines = machines;

            if (typeof cb != 'undefined') {
                cb(registry.machines);
            }
        }
    }, 200);
}

function getHostInfo (host, cb) {
    if (config.debug) {
        console.log('Getting host info for ' + host + ' ...');
    }

    const client = ssh2.Client();
    client.on('ready', () => {
        client.exec('machine-info', (err, stream) => {
            if (err) {
                console.log(err);

                return client.end();
            }

            if (config.debug) {
                console.log('Got host info for ' + host);
            }

            stream.on('data', (data) => {
                cb(JSON.parse(''+data));
            })
        });
    }).connect({
        host: host,
        port: settings.get('ssh_port'),
        username: config.ssh_username,
        password: config.ssh_password,
    });
}

/* Export */
module.exports = {
    scan: scan,
    findMachines: findMachines,
    isPortTaken: isPortTaken,
};
