/*global require, describe, before, after, it, __dirname */

var should = require('should');
var http = require('http');
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

    it('should be listening at ' + pathDev + ':' + portTest, function (done) {
        http.get('http://' + pathDev + ':' + portTest + '/', function (res) {
            res.statusCode.should.eql(200);
            done();
        });
    });

    it('should be listening at ' + pathDev + ':' + portTest + '/about', function (done) {
        http.get('http://' + pathDev + ':' + portTest + '/about', function (res) {
            res.statusCode.should.eql(200);
            done();
        });
    });

    it('should be listening at ' + pathDev + ':' + portTest + '/todo', function (done) {
        http.get('http://' + pathDev + ':' + portTest + '/todo', function (res) {
            http.get('http://' + pathDev + ':' + portTest + '/todo', function (res) {
                res.statusCode.should.eql(200);
                done();
            });
        });
    });
});