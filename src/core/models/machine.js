function Machine (data) {
    /**
     * @var string
     */
    this.hostname = data.hostname || null;

    /**
     * @var string
     */
    this.os = data.os || null;

    /**
     * @var string
     */
    this.ip = data.ip || null;

    /**
     * @var array
     */
    this.cpus = data.cpus || null;

    /**
     * @var string
     */
    this.status = data.status || 'idle';

    /**
     * @var object
     */
    this.memory = data.memory || {};

    /**
     * @var bool
     */
    this.is_server = data.is_server || false;

    /**
     * @var bool
     */
    this.is_worker = data.is_worker || false;
}

module.exports = Machine;
