// external dependencies
var mongo = require('mongodb');

// models
var movie    = require('../models/movie');

// modules
var tmdbLurker = require('../lurkers/tmdb'),
    flixLurker = require('../lurkers/flixster');

var collectionMaintainer = function(){
  tmdbLurker = new tmdbLurker();
  flixLurker = new flixLurker();
};

collectionMaintainer.prototype.updatesMovieDocument = function (documentID,cb) {
  movie.findById(documentID,function(err,foundMovieInCollection) {
    tmdbLurker.searchMovieByTitleAndYear(foundMovieInCollection.title,foundMovieInCollection.release_year,5,function(tmdbResult) {
      foundMovieInCollection.score.TMDb = {"id":null, "score":null};
      foundMovieInCollection.score.TMDb.id = tmdbResult.id;
      foundMovieInCollection.score.TMDb.score = tmdbResult.vote_average;
      foundMovieInCollection.save(function(err,savedMovieInCollection){
        cb(savedMovieInCollection);
      })
    });
  });
};

module.exports = collectionMaintainer;
