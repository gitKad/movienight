require('../utils');
var expect = require('chai').expect;
var models = require('../../models');
var User = models.User;

describe('My user', function() {

  beforeEach(function(done) {
    User.create({
      firstName: 'Jason',
      lastName: 'Duff'
    })
    .then(function() {
      done();
    });
  });

  it('can be found in the database', function(done){
    User.findOne({})
    .then(function(user) {
      expect(user).to.be.ok;
      expect(user).to.have.property('firstName','Jason');
      done();
    });
  });

  it('gets created with all its properties', function(done) {
    var testFirstName = 'Morgane';
    var testLastName = 'Widmer';

    User.create({
      firstName: testFirstName,
      lastName: testLastName
    })
    .then(function() {
      return User.findAll({where:{firstName: testFirstName, lastName: testLastName}})
    })
    .then(function (users) {
      expect(users).to.be.ok;
      expect(users).to.have.lengthOf(1);
      expect(users[0]).to.have.property('firstName',testFirstName);
      expect(users[0]).to.have.property('lastName',testLastName);
      done();
    });
  });

  it('can be removed from the database', function(done) {
    var nUsersBefore;

    User.findAndCountAll()
    .then(function(result) {
      nUsersBefore = result.count;
      return result.rows[0].destroy();
    })
    .then(function() {
      return User.count();
    })
    .then(function(c) {
      expect(c).to.equal(nUsersBefore-1);
      done();
    });
  });

  it('can rate a movie',function(done) {
    var Movie = models.Movie;

    var inception = {title: 'Inception'};
    var jason;

    User.findOne({})
    .then(function(user) {
      jason = user;
      return Movie.create(inception);
    })
    .then(function(movie) {
      inception = movie;
      return inception.countUsers();
    })
    .then(function(ratingsCount) {
      expect(ratingsCount).to.be.equal(0);
      return inception.addUser(jason, {rating: 96});
    })
    .then(function(ratings) {
      expect(ratings).to.be.ok;
      expect(ratings[0]).to.have.lengthOf(1);
      expect(ratings[0][0]).to.have.property('rating',96);
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('has actor preferences', function(done) {
    var Actor = models.Actor;

    var leonardo = {name:'Leonardo DiCaprio'};
    var jason;

    var testCount = 5;
    var testAvg = 87;
    var testStd = 7;
    var testWeight = 0.7143;

    var preferenceStats = {
      count: testCount,
      avg: testAvg,
      std: testStd,
      weight: testWeight
    };

    User.findOne({})
    .then(function(user) {
      jason = user;
      return Actor.create(leonardo);
    })
    .then(function(actor) {
      leonardo = actor;
      return leonardo.countUsers();
    })
    .then(function(preferencesCount) {
      expect(preferencesCount).to.be.equal(0);
      return leonardo.addUser(jason, preferenceStats);
    })
    .then(function(preferences) {
      expect(preferences).to.be.ok;
      expect(preferences[0]).to.have.lengthOf(1);
      expect(preferences[0][0]).to.be.an('object');
      expect(preferences[0][0]).to.have.property('count',testCount);
      expect(preferences[0][0]).to.have.property('avg',testAvg);
      expect(preferences[0][0]).to.have.property('std',testStd);
      expect(preferences[0][0]).to.have.property('weight',testWeight);
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});
