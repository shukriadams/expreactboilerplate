#cp ./src/client/lib/system.js ./src/public/scripts
#cp ./src/client/app/config.js ./src/public/scripts

mkdir -p ./.tmp/scripts
mkdir -p ./.tmp/bundles

cp ./src/client/lib/system.js ./.tmp/scripts
cp ./src/client/app/config.js ./.tmp/scripts


cd ./src/client/app/
#jspm bundle-sfx main/main.js ./../../public/scripts/bundle.js
jspm bundle-sfx main/main.js ./../../../.tmp/scripts/bundle.js
cd -

concat-cli -f ./.tmp/scripts/*.js -o ./.tmp/bundles/bundle.js

uglifyjs -c -v -o ./.tmp/bundles/bundle.min.js -- ./.tmp/bundles/bundle.js
cp ./.tmp/bundles/* ./src/public/scripts