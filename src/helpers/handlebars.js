let Handlebars = require('handlebars'),
    fs = require('fs'),
    pages = null,
    views,
    path = require('path'),
    layouts = require('handlebars-layouts');

function findViews(root){
    let result = [];
    
    function process(root){
        let items = fs.readdirSync(root);

        for (let i = 0; i < items.length; i ++){
            const file = path.join(root, items[i]);
            if (fs.statSync(file).isDirectory())
                process(file)
            else
                result.push(file);
        }
    }

    process(root);
    return result;
}    


// register handlebars helpers
Handlebars.registerHelper('eq', function(value1, value2, options){
    if (value1 === value2)
        return options.fn(this);

    return options.inverse(this);                    
});
          
Handlebars.registerHelper(layouts(Handlebars));


module.exports = {

    getView: function(page){

        if (!pages || settings.forceReloadViews){

            pages = {};
            views = {};
        
            // partials
            let partialPaths = findViews(path.join(__dirname,'./../views/partials'));
            for (let partialPath of partialPaths){
                let content = fs.readFileSync(partialPath, 'utf8'),
                    name = path.basename(partialPath).match(/(.*).hbs/).pop(); 

                if (views[name]){
                    console.warn(`The partial "${name}" (from view ${partialPath}) is already taken by another partial.`);
                    continue;
                }    

                Handlebars.registerPartial(name, content);
                views[name] = true;
            }
        
            // pages
            let pagePaths = findViews(path.join(__dirname, './../views/pages'));
            for (let pagePath of pagePaths){
                let content = fs.readFileSync(pagePath, 'utf8'),
                    name = path.basename(pagePath).match(/(.*).hbs/).pop();

                if (pages[name]){
                    console.warn(`The page "${name}" (from view ${pagePath}) is already taken by another view.`);
                    continue;
                }    
                    
                pages[name] = Handlebars.compile(content);
            }
        }

        return pages[page];
    },
    
};
