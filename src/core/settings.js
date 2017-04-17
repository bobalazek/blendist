const config = require('./config');
const electronSettings = require('electron-settings');

let self = module.exports = {
    data: {
        ssh_port: electronSettings.has('ssh_port')
            ? electronSettings.get('ssh_port')
            : config.ssh_port,
        web_interface_port: electronSettings.has('web_interface_port')
            ? electronSettings.get('web_interface_port')
            : config.web_interface_port,
        web_socket_port: electronSettings.has('web_socket_port')
            ? electronSettings.get('web_socket_port')
            : config.web_socket_port,
        host_ip: electronSettings.has('host_ip')
            ? electronSettings.get('host_ip')
            : null,
        is_server: electronSettings.has('is_server')
            ? electronSettings.get('is_server')
            : false,
        is_worker: electronSettings.has('is_worker')
            ? electronSettings.get('is_worker')
            : false,
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
