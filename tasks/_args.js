const argv = require('yargs').argv;

module.exports = () => {
    let args = [];

    if (argv.server) {
        args.push('--server');
    }

    if (argv.worker) {
        args.push('--worker');
    }

    return args;
};
