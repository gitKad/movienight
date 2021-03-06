process.env.NODE_ENV = 'test';

var models = require('../models');
var Actor = models.Actor;
var Director = models.Director;
var User = models.User;
var Movie = models.Movie;
var MovieDirectors = models.MovieDirectors;
var MovieActors = models.MovieActors;
var MovieRatings = models.MovieRatings;
var ActorPreferences = models.ActorPreferences;

before(function (done){
  // Drop and create every models
  Movie.sync()
  .then(function() {
    return Director.sync();
  })
  .then(function() {
    return Actor.sync();
  })
  .then(function() {
    return MovieDirectors.sync();
  })
  .then(function() {
    return MovieActors.sync();
  })
  .then(function() {
    return User.sync();
  })
  .then(function() {
    return MovieRatings.sync();
  })
  .then(function() {
    return ActorPreferences.sync();
  })
  .then(function() {
    done();
  })
  .catch(function(err) {
    expect(err).to.be.null;
    done();
  });
});

beforeEach(function (done) {
  Director.destroy({where:{}})
  .then(function() {
    return Movie.destroy({where:{}})
  })
  .then(function() {
    return Actor.destroy({where:{}})
  })
  .then(function() {
    return User.destroy({where:{}})
  })
  .then(function() {
    done();
  })
  .catch(function(err) {
    expect(err).to.be.null;
    done();
  });
});
