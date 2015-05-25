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

    browser = new Browser();

    it('should be listening at ' + pathDev + ':' + portTest, function (done) {
        browser.visit('http://' + pathDev + ':' + portTest + '/', function () {
            browser.statusCode.should.eql(200);
            done();
        });
    });

    it('should be listening at ' + pathDev + ':' + portTest + '/about', function (done) {
        browser.visit('http://' + pathDev + ':' + portTest + '/about', function (res) {
            browser.statusCode.should.eql(200);
            done();
        });
    });

    it('should be listening at ' + pathDev + ':' + portTest + '/localTodo', function (done) {
        browser.visit('http://' + pathDev + ':' + portTest + '/localTodo', function (res) {         
            res.statusCode.should.eql(200);
            done();
        });
    });
});