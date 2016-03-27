var expect = require('chai').expect,
    request = require('supertest'),
    express = require('express');
    app = require('../../app.js');

describe('My user API', function(){

  it('responds with a json success message', function(done) {
    request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('signs up an account by flixsterId',function(done) {
    request(app)
    .get('/users/signup/flixster/789760392')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
