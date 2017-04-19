const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

let config = {};
const env = argv.env || 'dev';

const configDistPath = path.join(
    __dirname,
    '../config/config.dist.json'
);
const envConfigPath = path.join(
    __dirname,
    '../config/config_' + env + '.json'
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
    if (fs.existsSync(envConfigPath)) {
        let envConfigContent = fs.readFileSync(envConfigPath);
        let envConfigData = JSON.parse(''+envConfigContent);
        configData = Object.assign(configData, envConfigData);
    }

    // Merge data together
    config = configData;
    config.version = packageData.version;
    config.env = env;
}

module.exports = config;
