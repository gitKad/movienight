var promise = require('promise');
var userController = require('./user');
var collectionMaintainer = require('./collectionMaintainer');
var flixterLurker = require('../lurkers/flixster');
var Rating = require('../models/rating');

var criticsJournal = function() {
  flixLurker = new flixterLurker();
  userCtrl = new userController();
  collectionMtnr = new collectionMaintainer();
};

criticsJournal.prototype.getFlixsterRatings = function (userId,limit,cb) {
  userCtrl.get(userId,function(err, user){
    if(!(user || user.accounts || user.accounts.flixster)){
      cb('this user doesn\'t have a flixster account');
    }

    // todo manage a large amount of flixster ratings (can take up to a minute! with 400 ratings)
    flixLurker.getFlixsterUsersScores(user.accounts.flixster,limit,function(result){
      var jsonResult = JSON.parse(result);

      // I'm not good with promises yet, how can I validate that jsonResult is properly used in each context as i changes value
      var promiseArr = [];
      for (var i = 0; i < jsonResult.length; i++) {
        promiseArr.push(new Promise(function(resolve){

          var flixsterRating = jsonResult[i];

          console.log('I\'m rating '+flixsterRating.movie.title+' and I\'m starting processing');
          collectionMtnr.hearsAboutThisMovieFromFlixster(jsonResult[i].movie,function(err,movie){
            Rating.findOne({movie:{_id:movie._id}, user:{id:userId}},function(err,existingRating){
              if(existingRating) {
                existingRating.rating = parseInt(flixsterRating.score);
                existingRating.save(resolve);
              } else {
                var newRating = new Rating({
                  movie:{
                    _id: movie._id
                  },
                  user:{
                    _id: userId
                  },
                  rating: parseInt(flixsterRating.score)
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
