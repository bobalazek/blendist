const machine = require('../core/machine');

let self = module.exports = {
    machine: machine,
    machines: [],
    projects: [],
    getMachineByIp: (ip) => {
        if (self.machines.length > 0) {
            for (let i = 0; i < self.machines.length; i++) {
                var singleMachine = self.machines[i];
                if (singleMachine.ip === ip) {
                    return singleMachine;
                }
            }
        }
        return null;
    },
    getServerMachine: () => {
        return self.machine;
    },
};
