# generator-oasp

> [Yeoman](http://yeoman.io) generator for AngularJS applications powered by [OASP4JS](https://github.com/oasp/oasp4js).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-oasp from npm, run:

```bash
npm install -g generator-oasp
```

Finally, initiate the generator:

```bash
yo oasp
```

You can review the Yeoman-generated app afterwards: Open up the directory in which you executed the `yo oasp` command to take a look at what was actually scaffolded. 

You can also preview your app in the browser: Run a Gulp task to create a local, Node-based http server on [localhost:9000](http://localhost:9000) (or [127.0.0.1:9000](http://127.0.0.1:9000) for some configurations) by typing: 

```bash
gulp serve
```
Your web browser will launch your newly scaffolded application in a new tab. 

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Gulp](http://gulpjs.com/) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

Apache License 2.0
