let process = require('process');

// defaults
let settings = {
    port : 3000,
    poolSize : 10,
    bundle: true,
    bundlemode : '', // ''|.min
    forceReloadViews : false
};

// capture settings from process.env
for (let property in settings)
    settings[property] = process.env[property] || settings[property];

// use strings because docker-compose doesn't allow bools
settings.bundle = settings.bundle === 'true' 
    || settings.bundle === '1' 
    || settings.bundle === 1;

settings.forceReloadViews = settings.forceReloadViews === 'true' 
    || settings.forceReloadViews === '1'
    || settings.forceReloadViews === 1;

module.exports = settings;
