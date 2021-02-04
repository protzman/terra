# terra

This is a dumbed down early version of an application written 95% by me. The work flow is to create an order in the left panel for satellite imagery of various types, select the parameters, then it will fetch and display all of the images on the map. Satellite layers can be modified, hidden and remove but sadly we cannot interact with the apis anymore - so a majority of the functionality is no longer there. You could also export/download reports with the images overlayed on the map to a pdf while also displaying the chosen parameters for the images.

### Prerequisites

Before you are able to get the application running, you will need to make sure that you have [NodeJs](https://nodejs.org/en/) and [NPMJs](https://www.npmjs.com/get-npm) installed. Below are the minimum versions to run terra's frontend.

```
node : V11.10.0

npm : 6.9
```

After installing these two dependencies, you can verify the versions by typing `node --version` and `npm --version` in a _new command window_.

### Installing the application

Before running the application you will need to install the `node_modules` which are derived from the project's `package.json`. To do so, cd into the `front_end` directory and run

```
$ npm install
```

Given a successful install you should now be able to start the application locally.

### Configure, Start & watch

Verify the configuration

Within the `front_end` directory you should now be able to run

```
$ npm start
```

which runs the app in the development mode. The start scripts should bring up the application at `http://localhost:3000` automatically, but if not you can always navigate there independently. The application makes use of hot reloading so if you make modifications to the code, the application in the browser should reload and reflect those changes. Compilation and linting errors should show up in the console from which you ran the application.
