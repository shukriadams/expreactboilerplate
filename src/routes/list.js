module.exports = function(app){
    app.get('/list', async function(req, res){
        let model = [
            'two', 'three'
        ];
        res.send(model);
    });
}

