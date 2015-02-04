Application Template
=============

oasp4js offers you a template for building JavaScript/AngularJS client applications.

Offers more than other application seeds
-----
There are a lot of JavaScript/AngularJS application seeds like [angular-seed](https://github.com/angular/angular-seed) or [angularjs-seed](https://www.npmjs.org/package/angularjs-seed). All of them are great, but they focus rather on a quick & easy start and work well for small-scale projects. oasp4js is built as a base for bigger, modularized, enterprise projects, where different modules are often developed independently and simultaneously by many teams.

Does not reinvent the wheel
-----
oasp4js just brings its idea on an application structure and makes use of well-known tools such as [Gulp](http://gulpjs.com/) or [Bower](http://bower.io/) which support developers in their activities. This all makes coding, testing and building the application extremely efficient.

The template integrates best-in-class frameworks and libraries such as AngularJS and Bootstrap. Also, if you would like to take advantage of the [oasp4js AngularJS modules](https://github.com/oasp/oasp4js), [here](https://github.com/oasp/oasp4js) you can learn how to do it.

How it works
-----
The application template has, in fact, just two simple modules: [here](http://oasp.github.io/oasp4js/app-template) you can see how the application's starting point looks like. [Here](http://oasp-ci.cloudapp.net/oasp4j-sample/jsclient), on the other hand, you can see a much more complex case: the current sample application built on the template.

Getting Started
----
To get started you simply need to clone this repository and install the dependencies.
### 1. Install prerequisites
You need a Git client to clone the repository and the Node.js platform (including its package manager - npm) which allows Gulp and Bower to install the dependencies and build the application. [Here](https://github.com/oasp/oasp4js/wiki/Prerequisites) you can learn how to install the prerequisites.     
### 2. Clone the Git repository
Clone the application template repository using Git (e.g. to the `myapp` directory):

```
git clone https://github.com/oasp/oasp4js-app-template.git myapp
```
### 3. Install the dependencies
The application template has two kinds of dependencies: tools used to develop, test and build the application and JavaScript libraries the application uses.

For installing both kinds of dependencies go to project root directory:

```
cd myapp
```

and install the dependencies via:

```
npm install
```

The tools are installed in the `myapp/node_modules` directory, while the JavaScript libraries in the `myapp/app/bower_components` directory (as configured in `myapp/.bowerrc`). Please note that the latter was actually done by Bower's `bower install` which was called as the npm's post install step (as configured in `myapp/package.json`).       

### 4. Enjoy

Please note that all command below must be executed in project root directory.

#### Developing

Start the application using Gulp:

```
gulp serve
```

The above Gulp's task opens the application in your default browser and watches for any HTML/JavaScript/CSS changes. Once you do one, the page is reloaded automatically! 

#### Testing

Run application's Jasmine tests:

```
gulp test:tdd
```

This Gulp's task uses the Karma test runner to execute Jasmine tests (against the PhantomJS) and watches for any change in your JavaScript files (both sources and specs).  Test Driven Development has never been easier :)

If you would like to run the tests against a real browser (rather than against the PhantomJS) or use it to debug a test, call: 

```
gulp test:tdd:debug
```

#### Building

Build the application: 

```
gulp serve:dist
```

The above Gulp's task creates the `myapp/dist` directory and put there HTML documents, CSS files (compiled from Less files) and JavaScript files (merged, minimized and obfuscated).
 
#### More info

For more details, please refer to the [wiki](https://github.com/oasp/oasp4js/wiki).

