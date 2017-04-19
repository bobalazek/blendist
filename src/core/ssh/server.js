const {app} = require('electron');
const fs = require('fs');
const ssh2 = require('ssh2');
const path = require('path');
const keypair = require('keypair');
const config = require('./../config');
const settings = require('./../settings');
const machine = require('./../machine');

/* Prepare */
const keyPath = path.join(
    app.getPath('userData'),
    '.ssh/rsa_key'
);
const machineIp = machine.ip;
const sshPort = settings.get('ssh_port');
let server;

/* Main */
function start (listenCallback, connectedCallback) {
    if (fs.existsSync(keyPath)) {
        server = createServer(listenCallback, connectedCallback);
    } else {
        generateKeys(() => {
            server = createServer(listenCallback, connectedCallback);
        });
    }
}

function stop (cb) {
    if (config.debug) {
        console.log('Stopping SSH Server ...');
    }

    server.close(() => {
        if (config.debug) {
            console.log('SSH Server stopped.');
        }

        if (typeof cb != 'undefined') {
            cb();
        }
    });
}

/* Server stuff */
function createServer (listenCallback, connectedCallback) {
    if (config.debug) {
        console.log('Starting SSH server ...');
    }

    const sshServerSettings = {
        hostKeys: [
            fs.readFileSync(keyPath),
        ],
    };

    return new ssh2.Server(
        sshServerSettings,
        (client) => {
            onClientConnected(client);

            if (typeof connectedCallback != 'undefined') {
                connectedCallback(client);
            }
        }
    ).listen(
        sshPort,
        '0.0.0.0',
        () => {
            if (config.debug) {
                console.log('SSH Server started.');
                console.log('SSH Server is listening on ' + machineIp + ':' + sshPort);
            }

            if (typeof listenCallback != 'undefined') {
                listenCallback();
            }
        }
    );
}

/* Client functions */
function onClientConnected (client) {
    if (config.debug) {
        console.log('Client connected!');
    }

    client
        .on('authentication', onClientAuthentication)
        .on('ready', () => {
            onClientReady(client);
        })
        .on('end', onClientEnd)
    ;
}

function onClientAuthentication (ctx) {
    if (
        ctx.method === 'password' &&
        ctx.username === config.ssh_username &&
        ctx.password === config.ssh_password
    ) {
        ctx.accept();
    } else {
        ctx.reject();
    }
}

function onClientReady (client) {
    if (config.debug) {
        console.log('Client authenticated!');
    }

    client.on('session', onSession);
}

function onClientEnd () {
    if (config.debug) {
        console.log('Client disconnected');
    }
}

/* Session functions */
function onSession (accept, reject) {
    var session = accept();

    session.once('exec', onSessionExec);
}

function onSessionExec (accept, reject, info) {
    if (config.debug) {
        console.log('Client wants to execute: ' + info.command);
    }

    var stream = accept();

    if (info.command === 'ping') {
        pingCommand(stream);
    } else if (info.command === 'machine-info') {
        machineInfoCommand(stream);
    }
    // TODO: blender

    stream.exit(0);
    stream.end();
}

/* Commands */
function pingCommand (stream) {
    stream.write('pong');
}

function machineInfoCommand (stream) {
    stream.write(JSON.stringify(machine));
}

/* Helpers */
function generateKeys (cb) {
    if (config.debug) {
        console.log('Generating SSH keys ...');
    }

    const pair = keypair();
    const dir = path.join(
        keyPath,
        '../'
    );

    fs.mkdir(dir, () => {
        fs.writeFile(keyPath, pair.private, (err) => {
            if (err) throw err;

            if (config.debug) {
                console.log('SSH keys generated');
            }

            if (typeof cb != 'undefined') {
                cb();
            }
        });
    });
}

/* Export */
module.exports = {
    port: sshPort,
    start: start,
    stop: stop,
};
