let handlebars = require('./../helpers/handlebars');

module.exports = function(app){
    app.get('/', async function(req, res){
        let view = handlebars.getView('mypage'),
            model = {};

        res.send(view(model));
    });
}

