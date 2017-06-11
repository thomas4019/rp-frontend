# Racepass Frontend

> Contains the files for racepass.com.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Structure

The frontend is created with Vue.js 2 and uses vuex to store the global application state.

## Crawling

It seems that Google parses Javascript and follows internal links so the site should be crawlable. Facebook does not parse JavaScript when people share links so we'll need to add some metatags programmatically to make pages look better there.

## Tooling

Visual Studio Code with the ["vetur" extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur) works well

## Conventions

* Use the functions in rp.js to do HTTP requests.
* Use [scoped CSS](https://vue-loader.vuejs.org/en/features/scoped-css.html) wherever possible to keep things simple.

## Misc

For details about the template this Vue project was built with, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).