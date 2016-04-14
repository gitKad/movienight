var User = require('../models/user');
var criticsJournal = require('../controllers/criticsJournal');
var promise = require('promise');

var userRegistrar = function(){
  criticsJrnl = new criticsJournal();
};

userRegistrar.prototype.registerFlixsterUserFromMovieRatings = function (flixsterMovieRating,cb) {
  var promiseOfAUser = new Promise(function (resolve, reject) {
    User.findOne({'accounts.flixster': flixsterMovieRating.user.id},function(err,doc) {
      if(err) { reject(err); }
      if(doc == null) {
        var newUser = new User({
          profile: {
            firstName: flixsterMovieRating.user.firstName,
            lastName: flixsterMovieRating.user.lastName
          },
          accounts: {
            flixster: flixsterMovieRating.user.id
          }
        });
        newUser.save(function(err,doc) {
          if(err) { reject(err); }
          resolve(doc);
        });
      }
      else {
        resolve(doc);
      }
    });
  });

  promiseOfAUser.then(function(promisedUser) {
    // The hardcoded one here should be 1000, but it takes like a minute to load 300 ratings!!
    criticsJrnl.getFlixsterRatings(promisedUser._id,1,function(){
      cb(promisedUser);
    });
  });
};

module.exports = userRegistrar;
