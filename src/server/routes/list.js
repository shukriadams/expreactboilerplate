const  { ModelProvider } = require(_$+ 'types/ModelProvider');

module.exports = function(app){
    app.get('/list', async function(req, res){
        try {
            const modelProvider = new ModelProvider();

            let model = modelProvider.getModel();
            
            res.send(model);

        } catch(ex){
            console.log(ex);
            res.status(500);
            res.end(ex.toString());
        }
    });
}

