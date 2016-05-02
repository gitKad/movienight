var Promise = require('bluebird');
var models = require('../models');
var User = models.User;
var criticsJournal = require('../controllers/criticsJournal');

var userRegistrar = function(){
  criticsJrnl = new criticsJournal();
};

userRegistrar.prototype.registerFlixsterUserFromMovieRatings = function (flixsterMovieRating) {
  return new Promise(function (resolve, reject) {

    var newUser = {
      firstName: flixsterMovieRating.user.firstName,
      lastName: flixsterMovieRating.user.lastName,
      flixster_id: flixsterMovieRating.user.id
    }

    User.findOrCreate({where:newUser})
    .spread(function(aUser,isCreated) {
      newUser = aUser
      return criticsJrnl.getFlixsterRatings(newUser.id,2);
    })
    .then(function(ratings) {
      resolve(newUser);
    })
    .catch(reject);

  });
};

module.exports = userRegistrar;
