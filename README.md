# Boilerplate

Personal boilerplate, used for client projects, built on what I consider best tools and practices.

Consists of 

- Node 10 
- Typescript
- React-Redux
- Jspm bundler
- Express server with essential middleware
- Handlebars server-side templating
- Mongodb CRUD
- Vagrant
- NPM build runner / watcher

## Setup

    cd src
    npm install (or "yarn" if in Vagrant on Windows, use "--no-bin-links" too)
    jspm install

# Run

    cd src
    npm run dev
    http://localhost:3000

Debugging mode is always on, Sass changes will autobuild to CSS, server-side JS changes will auto-restart Express.

# Build

    cd src
    npm run build
