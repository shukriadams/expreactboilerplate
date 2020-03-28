let process = require('process');

// defaults
let settings = {
    port : 3000,
    poolSize : 10,
    bundle: true,
    bundlemode : '',         // ''|.min
    forceReloadViews : true  // serverside views will be parsed on each page load. good for dev, bad for production
};

// capture settings as env variables
for (let property in settings)
    settings[property] = process.env[property] || settings[property];

// env vars don't come in as booleans, force bool
function toBoolean(name){
    if(settings[name] === true || settings[name] === 'true' || settings[name] === '1' || settings[name] === 1) 
        settings[name] = true;
    else
        settings[name] = false;
}

toBoolean('bundle');
toBoolean('forceReloadViews');

if (!settings.bundle)
    settings.bundlemode = '';

module.exports = settings;
