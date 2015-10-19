# express-angular-starter

![](https://travis-ci.org/xie-qianyue/express-angular-starter.svg?branch=master)  

A starter project of express 4X and angular 1.3

This project is based on my sub project of [Node Tutorial](https://github.com/xie-qianyue/NodeTutorial).  

The todo sample is based on this [todomvc tutorial](http://todomvc.com/examples/angularjs/#/).

Travis CI is used for continuous integration.

## Live Demo
Here is a [Live Demo](https://express-angular-starter.herokuapp.com/). This demo is deployed on [Heroku](https://www.heroku.com/), using its [mongolab](https://mongolab.com/) addon.


## Install
* Run the command `npm install` for the server dependencies, maybe you need the administrator right with `sudo npm install`.
* Run the command `bower install` for the client dependencies.
* Move the dependencies : `gulp move`.

## Test
Unit test is supported by [KARMA](http://karma-runner.github.io/0.13/index.html), [Mocha](http://mochajs.org/), [chaijs](http://chaijs.com/) and [phantomjs](http://phantomjs.org/).
The E2E test is supported by Mocha and [shouldjs](https://github.com/shouldjs/should.js) and [Zombiejs](http://zombie.js.org/). 
Today the E2E test covers the url connections. Run the command `npm test` for the E2E test.

## Todo
- complete unit test
- complete E2E test
- add service in todo sample - DONE
- add mongodb service - DONE

## License
MIT
