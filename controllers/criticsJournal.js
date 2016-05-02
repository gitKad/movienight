var Promise = require('bluebird');
var userController = require('./user');
var collectionMaintainer = require('./collectionMaintainer');
var flixterLurker = require('../lurkers/flixster');
var models = require('../models');
var User = models.User;

var criticsJournal = function() {
  flixLurker = new flixterLurker();
  userCtrl = new userController();
  collectionMtnr = new collectionMaintainer();
};

criticsJournal.prototype.getFlixsterRatings = function (userId,limit) {
  return new Promise(function(resolve, reject) {
    var user;
    var movieRatings = [];
    User.findOne({where:{id: userId}})
    .then(function(aUser) {
      user = aUser;
      if(user == null || user.flixster_id == null) {
        reject('this user doesn\'t have a flixster account');
      } else {
        // todo manage a large amount of flixster ratings (can take up to a minute! with 400 ratings)
        return flixLurker.getFlixsterUsersScores(user.flixster_id,limit);
      }
    })
    .then(function(flixsterResult) {
      return Promise.all(JSON.parse(flixsterResult).map(function (flixsterRating) {
        var flixsterRatingScore = parseFloat(flixsterRating.score)/5*100;
        return collectionMtnr.hearsAboutThisMovieFromFlixster(flixsterRating.movie)
        .then(function(movie) {
          return user.addMovie(movie, {rating: flixsterRatingScore});
        });
      }))
    })
    .then(resolve)
    .catch(reject);
  });
};

module.exports = criticsJournal;
