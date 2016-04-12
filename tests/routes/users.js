var expect = require('chai').expect,
    request = require('supertest'),
    express = require('express');

describe('My user api', function() {

  var server;

  beforeEach(function () {
    server = require('../../factories/server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to "get all" user requests', function(done) {
      request(server)
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('responds to a "get" user requests', function(done) {
    var randomUserId = parseInt((Math.random() * 100), 10)
    request(server)
    .get('/api/users/'+randomUserId)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(done);
  });

  it('responds to the signup of a flixster user', function(done) {
    var testFlixsterID = 789760392;
    request(server)
    .get('/api/users/signup/flixster/'+testFlixsterID)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(done);
  });

});
