var User = require('../models/user');

var userController = function() {
};

userController.prototype.get = function (docId,cb) {
  User.findOne({_id: docId}, function(err, users) {
    cb(err, users);
  });
};

userController.prototype.getAll = function (cb) {
  User.find(function(err, users) {
    cb(err, users);
  });
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
