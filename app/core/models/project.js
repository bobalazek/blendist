function Project (data) {
    /**
     * @var string
     */
    this.id = data.id || null;

    /**
     * @var string
     */
    this.name =  data.name || null;

    /**
     * @var date
     */
    this.createdAt = data.createdAt || null;

    /**
     * @var date
     */
    this.updatedAt = data.updatedAt || null;
}

module.exports = Project;
