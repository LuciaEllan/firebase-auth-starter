# Firebase Auth Starter Kit

Basic email+password authorization starter kit, powered by [Quasar framework](https://v1.quasar-framework.org/) and [Firebase](https://firebase.google.com/). This is written in Javascript(ES6).

## What's in the box
* A basic Quasar SPA app with following pages:
  * Sign-in
  * Sign-up (create a new account)
  * Email verify page (on-confirm landing page included)
  * Change password
  * Client-side auth-protected page exmaple (do not use this for SENSITIVE data)
  * Server-side auth-protected endpoint example

## Prerequisites
* Node.js >= 8.9.0
* Have [Quasar CLI](https://v1.quasar-framework.org/start/quasar-cli) installed globally.
* If you're planning to use Firebase hosting and deploy via command line, have [Firebase CLI](https://firebase.google.com/docs/cli/) installed globally.

## Setup
1. Create your Firebase project, or select an existing one to use. Enable email authentication method for the project.
1. Clone this repository.
1. From your Firebase console, copy the setup code for a web application and paste it into `/quasar/configs/firebase-config.js`. See `/quasar/configs/firebase-config.template.js` for syntax.
1. From your Firebase console, create a new service account (or use existing one) and obtain JSON file. Paste it into `/node/dist/service_account.json`. You'll need to create the directory `/node/dist/` if necessary.
1. Install dependencies.
   * `cd ./firebase/functions && npm install`
   * `cd ./node && npm install`
   * `cd ./quasar && npm install`
1. Build the SPA app by using
   * `cd ./quasar && quasar build`
1. Serve built SPA app and backend node server by using
   * `cd ./node && npm test`
1. Now you're good to go, check the service running at http://localhost:8080/

## Notes
* Node backend server uses [nodemon](https://www.npmjs.com/package/nodemon) for faster development, and uses [Babel](https://babeljs.io/) for ES6. So you write your code in ES6, and Babel will transpile it into ES5, and then Node will be restarted everytime you save changes in your code in `/node/src/`.