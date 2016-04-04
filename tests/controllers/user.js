var expect = require('chai').expect,
    request = require('supertest'),
    express = require('express'),
    User = require('../../models/user');

describe('My user API', function(){

  var server;

  before(function () {
    server = require('../../factories/server')();
  });

  after(function (done) {
    server.close(done);
  });

  it('returns all users documents',function(done){
    var alexis = {profile: {firstName:'Alexis', lastName:'Philippe'}};
    var morgane = {profile: {firstName:'Morgane', lastName:'Widmer'}};

    User.create(alexis,function(err,doc) {
      User.create(morgane,function(err,doc) {
        request(server)
        .get('/api/users/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res) {
          expect(res.body).to.have.lengthOf(2);
          done();
        });
      });
    });
  });

  it.skip('signs up an account by flixsterId',function(done) {
    request(server)
    .get('/api/users/signup/flixster/789760392')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
