var promise = require('promise');
var flixLurker = require('../lurkers/flixster');
var userController = require('../controllers/user');
var Rating = require('../models/rating');
var collectionMaintainer = require('../controllers/collectionMaintainer');


var criticsJournal = function() {
  flixLurker = new flixLurker();
  userController = new userController();
  collectionMaintainer = new collectionMaintainer();
};

criticsJournal.prototype.getFlixsterRatings = function (userId,cb) {
  userController.get(userId,function(err, user){
    if(!(user || user.accounts || user.accounts.flixster)){
      cb('this user doesn\'t have a flixster account');
    }

    // todo manage a large amount of flixster ratings (can take up to a minute! with 400 ratings)
    flixLurker.getFlixsterUsersScores(user.accounts.flixster,5,function(result){
      var jsonResult = JSON.parse(result);

      // I'm not good with promises yet, how can I validate that jsonResult is properly used in each context as i changes value
      var promiseArr = [];
      for (var i = 0; i < jsonResult.length; i++) {
        promiseArr.push(new Promise(function(resolve){
          console.log('I\'m rating '+jsonResult[i].movie.title+' and I\'m starting processing');
          collectionMaintainer.hearsAboutThisMovieFromFlixster(jsonResult[i].movie,function(err,movie){
            Rating.findOne({movie:{_id:movie._id}, user:{id:userId}},function(err,existingRating){
              if(existingRating) {
                existingRating.rating = result.rating;
                existingRating.save(resolve);
              } else {
                var newRating = new Rating({
                  movie:{
                    _id: movie._id
                  },
                  user:{
                    _id: userId
                  },
                  rating: result.rating
                });
                console.log('I\'m rating '+movie.title+' and I\'m done processing');
                newRating.save(resolve);
              }
            });
          });
        }));
      }
      promise.all(promiseArr).then(function(){
        console.log('done done!');
        cb();
      });
    });
  });
};

module.exports = criticsJournal;
