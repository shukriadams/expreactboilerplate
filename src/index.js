// apply custom .env settings
require('custom-env').env();

let Express = require('express'),
    fs = require('fs'),
    app = Express(),
    settings = require('./helpers/settings'),
    path = require('path'),
    routeFiles = fs.readdirSync(path.join(__dirname, 'routes'));

(async function(){

    // set up routes that express handles
    for (let routeFile of routeFiles){
        let routes = require('./routes/' + routeFile.match(/(.*).js/).pop());
        routes(app);
    }

    // there are two static folders - client is for single page app, public is 
    // for direct express files
    app.use(Express.static('./client'));
    app.use(Express.static('./public'));

    app.listen(settings.port);

    console.log(`Server listening on port ${settings.port}`);
})()
