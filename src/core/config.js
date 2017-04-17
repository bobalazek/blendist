const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

let config = {};
let env = argv.env || 'dev';

let configDistPath = path.join(
    __dirname,
    '../config/config.dist.json'
);

if (fs.existsSync(configDistPath)) {
    let configContent = fs.readFileSync(configDistPath);
    config = JSON.parse(''+configContent);
} else {
    // Package data
    let packageContent = fs.readFileSync(
        path.join(
            __dirname,
            '../../package.json'
        )
    );
    let packageData = JSON.parse(''+packageContent);

    // Global config data
    let configContent = fs.readFileSync(
        path.join(
            __dirname,
            '../config/config.json'
        )
    );
    let configData = JSON.parse(''+configContent);

    // Environment config data
    if (fs.existsSync(
        path.join(
            __dirname,
            '../config/config_' + env + '.json'
        )
    )) {
        let envConfigData = JSON.parse(''+configContent);
        configData = Object.assign(configData, envConfigData);
    }

    // Merge data together
    config = configData;
    config.version = packageData.version;
    config.env = env;
}

module.exports = config;
