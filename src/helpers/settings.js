let process = require('process');

// defaults
let settings = {
    port : 3000,
    poolSize : 10,
    forceReloadViews : false
};

// capture settings from process.env
for (let property in settings)
    settings[property] = process.env[property] || settings[property];

module.exports = settings;
