const {app} = require('electron');
const path = require('path');
const electronSettings = require('electron-settings');
const config = require('./config');
const argv = require('yargs').argv;

let self = module.exports = {
    data: {
        ssh_port: electronSettings.has('ssh_port')
            ? electronSettings.get('ssh_port')
            : config.ssh_port,
        web_port: electronSettings.has('web_port')
            ? electronSettings.get('web_port')
            : config.web_port,
        host_ip: electronSettings.has('host_ip')
            ? electronSettings.get('host_ip')
            : null,
        projects_dir: electronSettings.has('projects_dir')
            ? electronSettings.get('projects_dir')
            : path.join(
                app.getPath('userData'),
                'projects'
            ),
        is_server: argv.server === true,
        is_worker: argv.worker === true,
    },
    get: (key) => {
        if (typeof key == 'undefined') {
            return self.data;
        }

        return self.data[key];
    },
    set: (key, value) => {
        self.data[key] = value;

        electronSettings.set(key, value);

        return self;
    },
    save: (data) => {
        self.data = data;

        electronSettings.setAll(data);
    },
};
