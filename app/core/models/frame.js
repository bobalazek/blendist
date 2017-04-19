function Frame (data) {
    /**
     * @var string
     */
    this.id = data.id || null;

    /**
     * @var int
     */
    this.frame = data.frame || null;

    /**
     * @var object
     */
    this.blenderSettings = data.blenderSettings || {};

    /**
     * @var string
     */
    this.renderId = data.renderId || null;

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
        'bpy.context.scene.render.tile_x': null,
        'bpy.context.scene.render.tile_y': null,
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

module.exports = Frame;
