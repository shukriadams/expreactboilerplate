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



settings.bundle = settings.bundle === 'true';
settings.forceReloadViews = settings.forceReloadViews === 'true';

module.exports = settings;
