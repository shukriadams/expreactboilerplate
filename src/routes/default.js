let handlebars = require('./../helpers/handlebars');

module.exports = function(app){

    /**
     * This is a catch-all route that forces all page views to our single page app
     */
    app.get(/^[^.]+$/, async function (req, res) {
        let view = handlebars.getView('default'),
            model = {};

        res.send(view(model));

    });
}
