# Boilerplate

Personal boilerplate, used for client projects, built on what I consider best tools and practices.

Consists of 

- NodeJS 10 
- Sass with lightning-fast targetted compiler
- Typescript
- React-Redux
- Jspm clientside bundler
- Express server with essential middleware
- Handlebars serverside templating
- NPM build runner/watcher written in vanilla NodeJS
- Mongodb CRUD
- Vagrant


## Setup

    cd src
    npm install (or "yarn" if in Vagrant on Windows, use "--no-bin-links" too)
    jspm install -y

# Run

    cd src
    npm run dev
    http://localhost:3000

Debugging mode is always on, Sass changes will autobuild to CSS, server-side JS changes will auto-restart Express.

# Build

    cd src
    npm run build
