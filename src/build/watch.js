const concatenate = require('./concatenate-css'),
    fs = require('fs-extra'),
    chokidar = require('chokidar'),
    path = require('path'),
    sass = require('node-sass');

let _triggerFile = null;

function sassToCss(file){
    return path.join(
        './.tmp/css',
        path.basename(file).substr(0, path.basename(file).length - 5) + '.css'); // remove .scss extension
}

async function compileSassFile(file){
    return new Promise(function(resolve, reject){

        try {
            sass.render({
                file: file,
                sourceComments: true
            }, function(err, result){
                if (err)
                    return resolve(err);

                const outfile = sassToCss(file);
                            
                fs.writeFileSync(outfile, result.css);
                console.log(`compiled ${outfile}`);
                resolve();
        
            });
        }catch(ex){
            reject(ex);
        }
    });
}

async function handleFileChange(file){
    _triggerFile = file;
    
    await compileSassFile(file);

    if (_triggerFile === file){
        await concatenate();
        console.log(`concatenated css after last change to ${file}`);
    }
}

(async function(){
    await fs.remove('./.tmp/css');
    await fs.ensureDir('./.tmp/css');

    let watcher = chokidar.watch(['./client/app/**/*.scss'], {
        persistent: true,
        usePolling: true,
        //ignoreInitial : true,
    });

    watcher
        .on('add', async function(file) {
            await handleFileChange(file);
        })
        .on('change', async function(file){
            await handleFileChange(file);
        })
        .on('unlink', async function(file){
            const outfile = sassToCss(file);
            await fs.remove(outfile);
            await concatenate();
            console.log(`processed delete ${file}`);
        });

    console.log('watching');

    // keep alive
    setInterval(function(){

    }, 1000)
})()
