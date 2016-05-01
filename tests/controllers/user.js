require('../utils');
var expect = require('chai').expect;
var userController = require('../../controllers/user.js');
var models = require('../../models');
var User = models.User;

describe('My user controller', function(){

  before(function(){
    userController = new userController();
  })

  beforeEach(function(done) {
    var Jason = {firstname:"Jason"};
    var Morgane = {firstname:"Morgane"};
    User.create(Jason)
    .then(function() {
      User.create(Morgane)
    })
    .then(function() {
      done();
    });
  });

  it('signs up an account by flixsterId',function(done) {
    var testFlixsterID = 789760392;
    userController.flixsterSignup(testFlixsterID,function(err,user) {
      expect(user).to.have.deep.property('accounts.flixster',testFlixsterID);
      done();
    });
  });

});
