var expect = require('chai').expect,
    request = require('supertest'),
    express = require('express'),
    User = require('../../models/user'),
    app = require('../../app.js');

describe('My user API', function(){

  it('returns all users documents',function(done){
    var alexis = {profile: {firstName:'Alexis', lastName:'Philippe'}};
    var morgane = {profile: {firstName:'Morgane', lastName:'Widmer'}};

    User.create(alexis,function(err,doc) {
      User.create(morgane,function(err,doc) {
        request(app)
        .get('/users/')
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

  it('signs up an account by flixsterId',function(done) {
    request(app)
    .get('/users/signup/flixster/789760392')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
