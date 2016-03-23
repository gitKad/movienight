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
  movie.get(documentID,function(aMovie) {
    tmdbLurker.searchMovieByTitleAndYear(aMovie.title,aMovie.release_year,5,function(tmdbResult) {
      aMovie.TMDb = {"id":null, "score":null};
      aMovie.TMDb.id = tmdbResult.id;
      aMovie.TMDb.score = tmdbResult.vote_average;
      cb(aMovie);
    });
  });
};

module.exports = collectionMaintainer;
