function Render (data) {
    /**
     * @var string
     */
    this.id = data.id || null;

    /**
     * @var string
     */
    this.type = data.type || null;

    /**
     * @var string
     */
    this.name =  data.name || null;

    /**
     * @var string
     */
    this.blenderRenderFormat = data.blenderRenderFormat || null;

    /**
     * @var int
     */
    this.renderFrame = data.renderFrame || null;

    /**
     * @var string
     */
    this.blenderEngine = data.blenderEngine || null;

    /**
     * @var string
     */
    this.blenderVersion = data.blenderVersion || null;

    /**
     * @var int
     */
    this.frameStart = data.frameStart || null;

    /**
     * @var int
     */
    this.frameEnd = data.frameEnd || null;

    /**
     * @var int
     */
    this.frameJump = data.frameJump || null;

    /**
     * @var object
     */
    this.blenderSettings = data.blenderSettings || {};

    /**
     * @var string
     */
    this.blendFilePath = data.blendFilePath || null;

    /**
     * @var string
     */
    this.status = data.status || null;

    /**
     * @var string
     */
    this.projectId = data.projectId || null;

    /**
     * @var object
     *
     * https://docs.blender.org/api/blender_python_api_current/bpy.types.RenderSettings.html#bpy.types.RenderSettings
     */
    this.defaultBlenderSettings = {
        'bpy.context.scene.cycles.device': null,
        'bpy.context.scene.render.threads': null,
        'bpy.context.scene.render.resolution_percentage': null,
        'bpy.context.scene.render.resolution_x': null,
        'bpy.context.scene.render.resolution_y': null,
        'bpy.context.scene.render.border_min_x': null,
        'bpy.context.scene.render.border_max_x': null,
        'bpy.context.scene.render.border_min_y': null,
        'bpy.context.scene.render.border_max_y': null,
        'bpy.context.scene.render.tile_x': null,
        'bpy.context.scene.render.tile_y': null,
        'bpy.context.scene.render.use_border': null,
        'bpy.context.scene.render.use_crop_to_border': null,
        'bpy.context.scene.render.use_bake_antialiasing': null,
        'bpy.context.scene.render.use_shadows': null,
        'bpy.context.scene.render.use_simplify': null,
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

module.exports = Render;
