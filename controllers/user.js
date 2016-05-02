var Promise = require('bluebird');
var models = require('../models');
var User = models.User;

var userController = function() {
};

userController.prototype.flixsterSignup = function (flixsterId) {
  return new Promise(function (resolve, reject) {
    var flixsterLurker = require('../lurkers/flixster');
    flixsterLurker = new flixsterLurker();
    var userRegistrar = require('../controllers/userRegistrar');
    userRegistrar = new userRegistrar();

    flixsterLurker.getFlixsterUsersScores(flixsterId,1)
    .then(function(result) {
      var jsonResponse = JSON.parse(result);
      return userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0]);
    })
    .then(function(user,created) {
      resolve(user);
    })
    .catch(reject);
  });
};

module.exports = userController;
