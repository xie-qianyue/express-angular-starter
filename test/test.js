var should = require('should');
var http = require('http');
var app = require(__dirname + '/../app.js');
var server;
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
        })
    });

    after(function (done) {
        server.close();
        done();
    });

    it('should exist', function (done) {
        should.exist(app);
        done();
    });

    it('should be listening at localhost:' + portTest, function (done) {
        http.get('http://localhost:3001/', function (res) {
            res.statusCode.should.eql(200);
            done();
        });
    });

});