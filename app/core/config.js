const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

let config = {};
const env = argv.env || 'dev';

const configPath = path.join(
    __dirname,
    '../config/config.json'
);
const configDistPath = path.join(
    __dirname,
    '../config/config.dist.json'
);
const envConfigPath = path.join(
    __dirname,
    '../config/config_' + env + '.json'
);
const packagePath = path.join(
    __dirname,
    '../../package.json'
);

if (fs.existsSync(configDistPath)) {
    const configContent = fs.readFileSync(configDistPath);
    config = JSON.parse(''+configContent);
} else {
    // Package data
    const packageContent = fs.readFileSync(packagePath);
    const packageData = JSON.parse(''+packageContent);

    // Global config data
    const configContent = fs.readFileSync(configPath);
    const configData = JSON.parse(''+configContent);

    // Environment config data
    if (fs.existsSync(envConfigPath)) {
        const envConfigContent = fs.readFileSync(envConfigPath);
        const envConfigData = JSON.parse(''+envConfigContent);
        configData = Object.assign(configData, envConfigData);
    }

    // Merge data together
    config = configData;
    config.version = packageData.version;
    config.env = env;
}

module.exports = config;
