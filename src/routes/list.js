module.exports = function(app){
    app.get('/list', async function(req, res){
        try {
            
            let model = [
                'two', 'three'
            ];
            
            res.send(model);

        } catch(ex){
            console.log(ex);
            res.status(500);
            res.end(ex.toString());
        }
    });
}

