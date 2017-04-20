const registry = require('../registry');

module.exports = function(app) {
    /***** Homepage *****/
    app.get('/', function (req, res) {
        res.render('index.twig');
    });

    /***** API *****/
    /*** Me ***/
    app.get('/api/me', function (req, res) {
        res.json({
            data: registry.getMachineByIp(req.ip),
        });
    });

    /*** Machines ***/
    app.get('/api/machines', function (req, res) {
        res.json({
            data: registry.machines,
        });
    });

    /*** Projects ***/
    app.get('/api/projects', function (req, res) {
        res.json({
            data: registry.projects,
        });
    });
}
