module.exports = function(app){
    app.get('/lists', async function(req, res){
        let model = [
            'two', 'three'
        ];
        res.send(model);
    });
}

