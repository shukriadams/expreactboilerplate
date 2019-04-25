// apply custom .env settings
require('custom-env').env();

let Express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = Express(),
    settings = require('./helpers/settings'),
    path = require('path'),
    defaultRoute = null,
    routeFiles = fs.readdirSync(path.join(__dirname, 'routes'));

(async function(){

    // body parser must be loaded before routes
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // load routes from all files in /routes folder. These files must return a function that
    // accepts app as arg. Note that route file with name 'default' is reserved and always bound
    // last, this should contain the route that catches all unbound route names and forces them
    // to our Single Page App root page.
    for (let routeFile of routeFiles){
        let name = routeFile.match(/(.*).js/).pop();

        let routes = require(`./routes/${name}`);
        if (name === 'default'){
            defaultRoute = routes;
            continue;
        }

        routes(app);
    }

    if (defaultRoute)
        defaultRoute(app);


    // there are two static folders - client is for single page app, public is 
    // for direct express files
    app.use(Express.static('./client'));
    app.use(Express.static('./public'));

    app.listen(settings.port);

    console.log(`Server listening on port ${settings.port}`);
})()
