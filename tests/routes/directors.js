var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');

describe('My director api', function() {

  var server;

  beforeEach(function () {
    server = require('../../factories/server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to "get all" requests', function(done) {
      request(server)
      .get('/api/directors/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('responds to a "get" requests', function(done) {
    var randomId = parseInt((Math.random() * 100), 10)
    request(server)
    .get('/api/directors/'+randomId)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(done);
  });

});
