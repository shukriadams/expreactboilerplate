const fileconcat = require('fileconcat'),
    runner = require('node-sass-runner');

async function conc(){
    return new Promise(function(resolve, reject){
        try {
            fileconcat(['./client/css/*.css'], './public/style.css').then(() => {
                resolve();
            })
        } catch(ex){
            resolve(ex);
        }
    })
}

(async function(){

    try {
        await runner({
            cssOutFolder : './client/css',
            scssPath : './client/app/**/*.scss'
        });

        await conc();

        } catch(ex){
            console.log(`failed with ${ex}`);
        }
})()
