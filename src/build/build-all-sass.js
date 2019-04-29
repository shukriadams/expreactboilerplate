const fs = require('fs-extra'),
    concatenate = require('./concatenate-css'),
    runner = require('node-sass-runner');

(async function(){
    await fs.ensureDir('./.tmp/css');

    try {

        await runner({
            cssOutFolder : './.tmp/css',
            scssPath : './client/app/**/*.scss'
        });

        await concatenate();

    } catch(ex){
        console.log(`failed with ${ex}`);
    }
})()
