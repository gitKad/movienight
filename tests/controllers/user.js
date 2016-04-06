var expect = require('chai').expect,
    request = require('supertest'),
    express = require('express'),
    User = require('../../models/user');

// clearDB before each tests
require('../utils');

describe('My user API', function(){

  var server;

  beforeEach(function () {
    server = require('../../factories/server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('returns all users documents',function(done){
    var alexis = {profile: {firstName:'Alexis', lastName:'Philippe'}};
    var morgane = {profile: {firstName:'Morgane', lastName:'Widmer'}};

    User.create(alexis,function(err,doc) {
      User.create(morgane,function(err,doc) {
        request(server)
        .get('/api/users/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res) {
          expect(res.body).to.have.lengthOf(2);
          done();
        });
      });
    });
  });

  it('signs up an account by flixsterId',function(done) {
    request(server)
    .get('/api/users/signup/flixster/789760392')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err,res) {
      expect(res.body).to.have.deep.property('accounts.flixster',789760392);
      done();
    });
  });

});
