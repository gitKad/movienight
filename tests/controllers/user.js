// Test libraries and utilities
require('../utils');
var expect = require('chai').expect;
var userController = require('../../controllers/user.js');
var UserModel = require('../../models/user');

describe('My user controller', function(){

  before(function(){
    userController = new userController();
  })

  beforeEach(function(done) {
    var Jason = {firstname:"Jason"};
    var Morgane = {firstname:"Morgane"};
    UserModel.create(Jason,function(){
      UserModel.create(Morgane,function(){
        done();
      })
    })
  });

  it('can get all users',function(done) {
    userController.getAll(function(err,users){
      expect(users).to.have.lengthOf(2);
      done();
    });
  });

  it('can get a user from its id',function(done) {
    // This query ensures the test is not passing because we access the first doc
    UserModel.find({}).skip(1).limit(1).exec(err,docs){
      var userId = docs[0]._id;
      userController.get(userId,function(err, user) {
        expect(user).to.have.property('_id');
        expect(String(user._id)).to.eql(String(userId));
        done();
      });
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
