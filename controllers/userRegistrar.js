var mongo = require('mongodb'),
    User = require('../models/user');

var userRegistrar = function(){
};

userRegistrar.prototype.registerFlixsterUserFromMovieRatings = function (flixsterMovieRating,cb) {
  User.findOne({'accounts.flixster': flixsterMovieRating.user.id},function(err,doc) {
    if(doc == null) {
      var newUser = {
        profile: {
          firstName: flixsterMovieRating.user.firstName,
          lastName: flixsterMovieRating.user.lastName
        },
        accounts: {
          flixster: flixsterMovieRating.user.id
        }
      };
      User.create(newUser,function(err,doc){
        cb(doc);
      });
    }
    else {
      cb(doc);
    }
  });
};

module.exports = userRegistrar;
