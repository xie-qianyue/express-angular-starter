/*global require, describe, before, after, it, __dirname */

var should = require('should');
var Browser = require('zombie');
var app = require(__dirname + '/../app.js');
var server;
var pathDev = 'localhost';
var portTest = 3001;

describe('app', function () {
    'use strict';
    before(function (done) {
        server = app.listen(portTest, function (err, result) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });

    after(function () {
        server.close();
        // done();
    });

    it('should exist', function (done) {
        should.exist(app);
        done();
    });

    var browser = new Browser();

    it('should be listening at ' + pathDev + ':' + portTest, function (done) {
        browser.visit('http://' + pathDev + ':' + portTest + '/', function () {
            // Asserts that selected element(s) have the expected text content. 
            browser.assert.text('title', 'Express Angular Starter');
            done();
        });
    });

    it('should be listening at ' + pathDev + ':' + portTest + '/#/about', function (done) {
        browser.visit('http://' + pathDev + ':' + portTest + '/#/about', function () {
            // Asserts that one element matching selection exists.
            browser.assert.element('div .jumbotron');
            done();
        });
    });

    it('should be listening at ' + pathDev + ':' + portTest + '/#/localTodo', function (done) {
        browser.visit('http://' + pathDev + ':' + portTest + '/#/localTodo', function () {                     
            browser.assert.text('h1', 'todos');
            done();
        });
    });
});