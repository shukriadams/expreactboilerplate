# set up work directories
mkdir -p ./.tmp/scripts
mkdir -p ./.tmp/bundles


# ./.tmp/scripts is where we stage all files which will be bundles. 
# This means system.js (which is needed to load everything), config.js(jspm's config)
# and finally app.js, which is all the scripts from our actual app
cp ./src/client/lib/system.js ./.tmp/scripts
cp ./src/client/app/config.js ./.tmp/scripts

cd ./src/client/app/
jspm bundle-sfx main/main.js ./../../../.tmp/scripts/app.js
cd -


# bundle all stages scripts into our final bundle, then minify it with uglify
concat-cli -f ./.tmp/scripts/*.js -o ./.tmp/bundles/bundle.js
uglifyjs -c -v -o ./.tmp/bundles/bundle.min.js -- ./.tmp/bundles/bundle.js


# finally, move the minifies and unminified script to it's final deploy spot in ./src/public/scripts,
cp ./.tmp/bundles/* ./src/public/scripts