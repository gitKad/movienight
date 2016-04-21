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
  userCtrl.get(userId,function(err, user) {
    if(err) cb(err);
    if(!(user || user.accounts || user.accounts.flixster)){
      cb('this user doesn\'t have a flixster account');
    }

    // todo manage a large amount of flixster ratings (can take up to a minute! with 400 ratings)
    flixLurker.getFlixsterUsersScores(user.accounts.flixster,limit,function(result) {
      var jsonResult = JSON.parse(result);
      var promiseArr = [];
      for (var i = 0; i < jsonResult.length; i++) {
        promiseArr.push(new Promise(function(resolve,reject) {
          var flixsterRating = jsonResult[i];
          collectionMtnr.hearsAboutThisMovieFromFlixster(jsonResult[i].movie,function(err,movie) {
            if(err) reject(err);
            Rating.findOne({movie:{_id:movie._id}, user:{id:userId}},function(err,existingRating) {
              if(err) reject(err);
              if(existingRating) {
                existingRating.rating = parseInt(flixsterRating.score);
                existingRating.save(resolve);
              } else {
                var newRating = new Rating({
                  movie:{
                    _id: movie._id,
                    title: movie.title
                  },
                  user:{
                    _id: userId
                  },
                  rating: parseInt(flixsterRating.score)
                });
                newRating.save(function(err,doc){
                  if(err) reject(err);
                  resolve(doc);
                });
              }
            });
          });
        }));
      }
      Promise.all(promiseArr).then(function(){
        cb(null);
      },function(err){
        cb(err);
      });
    });
  });
};

module.exports = criticsJournal;
