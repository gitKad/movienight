require('../testUtils');
var expect = require('chai').expect;
var marcel = require('../../controllers/marcel');
var models = require('../../models');
var User = models.User;
var Movie = models.Movie;
var Director = models.Director;
var Actor = models.Actor;
var CrewPref = models.CrewPref;
var ActorPreferences = models.ActorPreferences;

describe('My concierge, Marcel,', function() {

  before(function(done){
    Marcel = new marcel();
    done();
  });

  beforeEach(function(done) {
    var promises = [];

    var kad = {firstName: 'Alexis', lastName: 'Philippe', flixster_id: 789760392};
    var wolfOfWallStreet = {title: 'The Wolf of Wall Street', release_year: 2013};
    var inception = {title: 'Inception', release_year: 2010};
    var scorsese = {name: 'Martin Scorsese'};
    var chrisNolan = {name: 'Christopher Nolan'};
    var leo = {name: 'Leonardo DiCaprio'};
    var jonah = {name: 'Jonah Hill'};
    var margot = {name: 'Margot Robbie'};
    var joseph = {name: 'Joseph Gordon-Levitt'};
    var ellen = {name: 'Ellen Page'};
    promises.push(User.create(kad).then(function(user) {kad = user;}));
    promises.push(Director.create(chrisNolan).then(function(director) {chrisNolan = director;}));
    promises.push(Director.create(scorsese).then(function(director) {scorsese = director;}));
    promises.push(Actor.create(leo).then(function(actor) {leo = actor;}));
    promises.push(Actor.create(jonah).then(function(actor) {jonah = actor;}));
    promises.push(Actor.create(margot).then(function(actor) {margot = actor;}));
    promises.push(Actor.create(joseph).then(function(actor) {joseph = actor;}));
    promises.push(Actor.create(ellen).then(function(actor) {ellen = actor;}));
    promises.push(Movie.create(wolfOfWallStreet).then(function(movie) {wolfOfWallStreet = movie;}));
    promises.push(Movie.create(inception).then(function(movie) {inception = movie;}));
    Promise.all(promises)
    .then(function() {
      promises = [];
      promises.push(inception.addDirector(chrisNolan));
      promises.push(inception.addActor(leo, {importance: 1}));
      promises.push(inception.addActor(joseph, {importance: 2}));
      promises.push(inception.addActor(ellen, {importance: 3}));
      promises.push(inception.addUser(kad, {rating: 95}));
      promises.push(wolfOfWallStreet.addDirector(scorsese));
      promises.push(wolfOfWallStreet.addActor(leo, {importance: 1}));
      promises.push(wolfOfWallStreet.addActor(jonah, {importance: 2}));
      promises.push(wolfOfWallStreet.addActor(margot, {importance: 3}));
      promises.push(wolfOfWallStreet.addUser(kad, {rating: 90}));
      return Promise.all(promises);
    })
    .then(function() {
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('can infer who are the favorite actors of a user', function(done) {
    var user;

    User.findOne()
    .then(function(aUser) {
      user = aUser;
      return ActorPreferences.count({});
    })
    .then(function(c) {
      expect(c).to.be.equal(0);
      return Marcel.computePreferedActorsOf(user.id);
    })
    .then(function(prefs) {
      expect(prefs).to.have.lengthOf(5);
      expect(prefs[0].prefactors).to.have.property('userId',user.id);
      expect(prefs[0].prefactors).to.have.property('actorId');
      expect(prefs[0].prefactors).to.have.property('count');
      expect(prefs[0].prefactors).to.have.property('avg');
      expect(prefs[0].prefactors).to.have.property('std');
      expect(prefs[0].prefactors).to.have.property('weight');
      expect(prefs[0].prefactors.weight).to.be.a('number');
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });

  });

  it('can infer who are the favorite movie directors of a user');

  it('can infer who are the favorite genres of a user');
  it('can create a list of movie recommendation of a user');
  it('can guess how a user liked a movie he watched');
});
