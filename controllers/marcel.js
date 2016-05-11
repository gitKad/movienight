var Promise = require('bluebird');
var mathUtility = require('../utils/math');
var fibonnacciTerm = mathUtility.fibonnacciTerm;
var mean = mathUtility.mean;
var stdev = mathUtility.stdev;
var sum = mathUtility.sum;
var models = require('../models');
var Movie = models.Movie;
var User = models.User;
var Actor = models.Actor;
var ActorPreferences = models.ActorPreferences;

var marcel = function() {
  this.weightOfTheDirectorRole = 1;
  this.numberOfActorsItConsiders = 3; //todo using this attribute in code exceeds the call stack...
};

marcel.prototype.computePreferedActorsOf = function (userId) {
  var user;
  var actorPrefWorkTable = [];

  return User.findById(userId)
  .then(function(aUser) {
    user = aUser;
    return user.removeActors();
  })
  .then(function() {
    return user.getMovies();
  })
  .then(function(ratedMovies) {
    return Promise.all(ratedMovies.map(function(ratedMovie) {
      return ratedMovie.getActors()
      .then(function(actors) {
        return Promise.all(actors.map(function(actor) {
          if (!actorPrefWorkTable.some(function(obj) {
            if(obj.actorId == actor.id) {
              obj.ratings.push({r: ratedMovie.movieratings.rating, i:actor.movieactors.importance});
            }
            return obj.actorId == actor.id;
          })) {
            actorPrefWorkTable.push({actorId: actor.id, ratings: [{r: ratedMovie.movieratings.rating, i:actor.movieactors.importance}]});
          }
          return Promise.resolve();
        }))
      })
    }));
  })
  .then(function() {
    return Promise.all(actorPrefWorkTable.map(function(actorPrefWorkRow) {
      var rTerms = [];
      var iTerms = [];
      return Promise.map(actorPrefWorkRow.ratings, function(rating) {
        rTerms.push(rating.r);
        iTerms.push(rating.i);
      })
      .then(function() {
        actorPrefWorkRow.avg = mean(rTerms);
        actorPrefWorkRow.stdev = stdev(rTerms);
        actorPrefWorkRow.count = actorPrefWorkRow.ratings.length;
        actorPrefWorkRow.weight = sum(
          iTerms.map(function(i) {
            return fibonnacciTerm(3-i);
          }));
      })
      .then(function() {
        return Actor.findById(actorPrefWorkRow.actorId)
        .then(function(actor) {
          return user.addActor(actor,{
            count: actorPrefWorkRow.count,
            avg: actorPrefWorkRow.avg,
            std: actorPrefWorkRow.stdev,
            weight: actorPrefWorkRow.weight
          });
        })
      })
    }));
  })
  .then(function(){
    return user.getActors();
  })
};

module.exports = marcel;
