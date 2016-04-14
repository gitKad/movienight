var expect = require('chai').expect,
    request = require('supertest'),
    express = require('express');

describe('My movie api', function() {

  var server;

  beforeEach(function () {
    server = require('../../factories/server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to "get all" requests', function(done) {
      request(server)
      .get('/api/movies/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('responds to a "get" requests', function(done) {
    var randomId = parseInt((Math.random() * 100), 10)
    request(server)
    .get('/api/movies/'+randomId)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(done);
  });

});
