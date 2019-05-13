// apply custom .env settings
require('custom-env').env();

let http = require('http'),
    Express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = Express(),
    settings = require('./server/helpers/settings'),
    socket = require('./server/helpers/socket'),
    path = require('path'),
    defaultRoute = null,
    routeFiles = fs.readdirSync(path.join(__dirname, 'server', 'routes'));
    
(async function(){

    // middleware must be loaded before routes
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // there are two static folders - client is for single page app, public is 
    // for direct express files
    // static folders must be defined before routes or routes will override them
    app.use(Express.static('./client')); // for dev only, not available on builds
    app.use(Express.static('./public'));
    
    // load routes from all files in /routes folder. These files must return a function that
    // accepts app as arg. Note that route file with name 'default' is reserved and always bound
    // last, this should contain the route that catches all unbound route names and forces them
    // to our Single Page App root page.
    for (let routeFile of routeFiles){

        let name = routeFile.match(/(.*).js/).pop();

        let routes = require(`./server/routes/${name}`);
        if (name === 'default'){
            defaultRoute = routes;
            continue;
        }

        routes(app);
    }

    // finally, load default route. This must be bound last because its pattern works
    // as a catchall for anything that isn't caught by a more specific fixed pattern.
    if (defaultRoute)
        defaultRoute(app);

    let server = http.createServer(app);
    server.listen(settings.port);

    socket.initialize(server);

    console.log(`Server listening on port ${settings.port}`);
})()
