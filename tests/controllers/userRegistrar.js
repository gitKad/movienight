require('../utils');
var expect = require('chai').expect;
var models = require('../../models');
var User = models.User;
var userRegistrar = require('../../controllers/userRegistrar');
var flixsterLurker = require('../../lurkers/flixster');

describe('My user Registrar', function() {

  before(function(done){
    userRegistrar = new userRegistrar();
    flixsterLurker = new flixsterLurker();
    done();
  });

  beforeEach(function(done) {
    var kad = {
      firstName: 'Alexis',
      lastName: 'Philippe',
      flixster_id: 789760392
    };
    User.create(kad)
    .then(function() {
      done();
    });
  });

  it('will save a never before seen user lurked by my flixster lurker', function(done) {
    this.timeout(5000);
    var nUsersBefore, jsonResult;

    User.count({})
    .then(function(c) {
      nUsersBefore = c;
      return flixsterLurker.getFlixsterUsersScores(826612548,1);
    })
    .then(function(result) {
      jsonResult = JSON.parse(result);
      return userRegistrar.registerFlixsterUserFromMovieRatings(jsonResult[0]);
    })
    .then(function() {
      return User.findAndCountAll({});
    })
    .then(function(result) {
      var flixsterIds = [];
      flixsterIds.push(result.rows[0].flixster_id);
      expect(result.count).to.equal(nUsersBefore+1);
      expect(result.rows).to.be.ok;
      result.rows.map(function(user) {
        flixsterIds.push(user.flixster_id);
      });
      expect(flixsterIds).to.include(jsonResult[0].user.id);
      done();
    })
    .catch(function(err) {
      console.log(err);
      expect(err).to.be.null;
      done();
    });
  });

  it('will not duplicate accounts of previously lurked users by my flixster lurker',function(done){
    this.timeout(5000);
    var jsonResult, userFlixsterId;

    User.findAndCountAll({})
    .then(function(result) {
      expect(result.count).to.equal(1);
      userFlixsterId = result.rows[0].flixster_id;
      return flixsterLurker.getFlixsterUsersScores(userFlixsterId,1);
    })
    .then(function(result) {
      jsonResult = JSON.parse(result);
      return userRegistrar.registerFlixsterUserFromMovieRatings(jsonResult[0])
    })
    .then(function() {
      return User.findAndCountAll({});
    })
    .then(function(result) {
      expect(result.count).to.equal(1);
      expect(result.rows[0]).to.have.property('flixster_id',userFlixsterId)
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

});
