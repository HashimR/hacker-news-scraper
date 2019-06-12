# Hacker News Scraper

## Local Installation

To install dependencies, execute:

```
$ npm install
```

## Docker Installation

Ensure [Docker](https://docs.docker.com/engine/installation/) is installed.

To build the image, execute:

```
$ docker build -t hacker .
```

To run the container, execute:

```
$ docker run -it hacker
```

This will open bash in the container. 

## Run Scraper

Run the scraper by executing:

```
$ node hackernews.js --posts n
```

where n is an integer number of posts between 1-100.

To run tests, execute:

```
$ npm test
```

## Libraries

* [minimist](https://github.com/substack/minimist) -
This library is very widely used for command line applications. It provides an efficient and lightweight method to parse input arguments into an object.

* [osmosis](https://github.com/rchipka/node-osmosis) -
A library with minimal dependencies for web scraping. Doesn't use JQuery syntax like other libraries. Rich in features and allows a mapping between HTML elements and object attributes.

* [valid-url](https://www.npmjs.com/package/valid-url) -
A simple and robust library to ensure URIs are valid.

* [jest](https://jestjs.io/) -
The most widely used testing framework for JavaScript. Provides a syntactically clean method for testing. Minimal configuration and an attractive interface.