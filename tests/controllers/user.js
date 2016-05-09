require('../testUtils');
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

    Promise.all([
      User.create(Jason),
      User.create(Morgane)
    ])
    .then(function() {
      done();
    });
  });

  it('signs up an account by flixsterId',function(done) {
    this.timeout(5000);
    var testFlixsterID = 789760392;
    userController.flixsterSignup(testFlixsterID)
    .then(function(user) {
      expect(user).to.have.property('flixster_id',testFlixsterID);
      done();
    });
  });

});
