# generator-oasp

> [Yeoman](http://yeoman.io) generator for AngularJS applications powered by [OASP4JS](https://github.com/oasp/oasp4js).


## Getting Started

Before you start to use generator-oasp it is important to install the prerequisites. You will need the Node.js, Bower and Gulp. [Here](https://github.com/oasp/oasp4js/wiki/Prerequisites) you can learn how to install the necessary tools.  

### Why it is worth using


#### It offers more than other application seeds

There are a lot of JavaScript/AngularJS application seeds like [angular-seed](https://github.com/angular/angular-seed) or [angularjs-seed](https://www.npmjs.org/package/angularjs-seed). All of them are great, but they focus rather on a quick & easy start and work well for small-scale projects. oasp4js is built as a base for bigger, modularized, enterprise projects, where different modules are often developed independently and simultaneously by many teams.

#### It does not reinvent the wheel

oasp4js just brings its idea on an application structure and makes use of well-known tools such as [Gulp](http://gulpjs.com/) or [Bower](http://bower.io/) which support developers in their activities. This all makes coding, testing and building the application extremely efficient.

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

If you are using Windows Command Line it is recommended to run it as an administrator.

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-oasp from npm, run:

```bash
npm install -g generator-oasp
```

Create a directory in which you will later call the generator:

```bash
mkdir <directory_name>
cd <directory_name>
```

Finally, initiate the generator in the created directory:

```bash
yo oasp
```

## Enjoy

Please note that all commands below must be executed in project root directory.

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

## License

Apache License 2.0
