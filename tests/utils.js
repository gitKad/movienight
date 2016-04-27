process.env.NODE_ENV = 'test';

var models = require('../models');
var Actor = models.Actor;
var Director = models.Director;
var Movie = models.Movie;
var MovieDirectors = models.MovieDirectors;

before(function (done){
  // Drop and create every models
  Movie.sync()
  .then(function() {
    return Director.sync();
  })
  .then(function() {
    return MovieDirectors.sync();
  })
  .then(function() {
    done();
  })
  .catch(function(err) {
    if (err) console.log(err);
    if (err) throw err;
    done();
  });
});

beforeEach(function (done) {
  // MovieDirectors.destroy({where:{}})
  // .then(function() {
  //   return
  Director.destroy({where:{}})
  // })
  .then(function() {
    return Movie.destroy({where:{}})
  })
  .then(function() {
    return Actor.destroy({where:{}})
  })
  // .then(function() {
  //   return User.destroy({where:{}})
  // })
  .then(function() {
    done();
  })
  .catch(function(err) {
    if (err) console.log(err);
    if (err) throw err;
    done();
  });
});
