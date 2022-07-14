# Innovation 2.0 Starter
This is a set of scripts that automate data structuring from Archie Docs, building of static files, and publication of interactives for The Philadelphia Inquirer. 

## Requirements
* Node 16.13.1 – install this using [NVM](https://github.com/nvm-sh/nvm)


## Installation
`$ npm install`

If you plan to fetch from archie docs or build to Composer, you'll need to run `$ export AES_KEY=<our-secret-key> && npm run decrypt-secrets`. Ask a member of the Interactive team for `our-secret-key`.


## Run locally
`$ npm run dev`

You will get a live reloading dev server at http://localhost:8080


## Docs
`$ npm run docs` or `$ npm run docs --project=PROJECT`
This will pull all data and story information specified in the `config.json`; if `PROJECT` isn't specified, it will pull the first config in that array.

If the `id` in config begins with `__TMP-`, this is a *templated* interactive, and it will pull the necessary information to build from [innovator-slack-app-data](https://github.com/phillymedia/innovator-slack-app-data).


## Build
`$ npm run build`

This will create `dist/index.html` that has a div for the app root and all the minified JS in a script tag.


## Publish
`$ npm run publish` or `$ npm run publish --project=PROJECT`

This will pull the latest data from Google Docs, build the HTML, and push a new draft to Composer. You will need to go to Composer and click "Update" to actually publish the new version.

Specify `PROJECT` to select which config to use in a multi-config project. If not specified, the publish script will use the first config in the array.


## Configure
In `_config/config.json`, add keys here:
```
[
  {
    "id": "STARTER",
    "composer": "26K7UIYIUVBL3ACWTT6RZ4A26E",
    "docs": {
      "data": "1eADbhOL3o5M28s6xCRViI3uhBQVi3wzwHsPGtfwRI7c"
    }
  }
]
```

The `composer` id is for the Composer link in Arc that you would like to publish this project to.

Each entry in this array will create a unique `PROJECT` for you to switch between using the `docs` or `publish` commands (detailed above). It will also create multiple entries within Innovator for your non-technical colleagues to build from. 


## Updating secrets
Make any changes in secrets.json (ignored by git), and then run:

`$ export AES_KEY=<our-secret-key> && npm run encrypt-secrets`


## Developing
Make any changes in `src/App.tsx`. You can create child components in `src/custom/` to import into `App.tsx`.
