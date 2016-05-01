var Promise = require('bluebird');
var models = require('../models');
var User = models.User;

var userController = function() {
};

userController.prototype.flixsterSignup = function (flixsterId, cb) {
  var flixsterLurker = require('../lurkers/flixster');
  flixsterLurker = new flixsterLurker();

  flixsterLurker.getFlixsterUsersScores(flixsterId,1,function(result) {
    var userRegistrar = require('../controllers/userRegistrar');
    userRegistrar = new userRegistrar();

    var jsonResponse = JSON.parse(result);
    userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
      cb(null,user); // no error is thrown here at this point
    });
  });
};

module.exports = userController;
