function Job (data) {
    /**
     * @var string
     */
    this.id = data.id || null;

    /**
     * @var object
     */
    this.blenderSettings = data.blenderSettings || {};

    /**
     * @var array
     */
    this.log = data.log || [];

    /**
     * @var object
     */
    this.machine = data.machine || null;

    /**
     * @var string
     */
    this.frameId = data.frameId || null;

    /**
     * @var string
     */
    this.status = data.status || null;

    /**
     * @var object
     *
     * https://docs.blender.org/api/blender_python_api_current/bpy.types.RenderSettings.html#bpy.types.RenderSettings
     */
    this.defaultBlenderSettings = {
        'bpy.context.scene.cycles.device': null,
        'bpy.context.scene.render.threads': null,
        'bpy.context.scene.render.border_min_x': null,
        'bpy.context.scene.render.border_max_x': null,
        'bpy.context.scene.render.border_min_y': null,
        'bpy.context.scene.render.border_max_y': null,
    };

    /**
     * @var date
     */
    this.createdAt = data.createdAt || null;

    /**
     * @var date
     */
    this.updatedAt = data.updatedAt || null;

    /**
     * @var date
     */
    this.startedAt = data.startedAt || null;

    /**
     * @var date
     */
    this.endedAt = data.endedAt || null;
}

module.exports = Job;
