// external dependencies
var mongo = require('mongodb');

var Movie = require('../models/movie');

var collectionMaintainer = function(){

};

collectionMaintainer.prototype.updatesMovieDocument = function (documentID,cb) {
  var tmdbLurker = require('../lurkers/tmdb');
  tmdbLurker = new tmdbLurker();
  Movie.findById(documentID,function(err,foundMovieInCollection) {
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

collectionMaintainer.prototype.hearsAboutThisMovieFromFlixster = function (flixsterMovie,cb) {
  Movie.findOne({title: flixsterMovie.title, release_year:flixsterMovie.year},function(err,theMovieAlreadyInTheCollection){
    if(!theMovieAlreadyInTheCollection){
      var newMovieThatBelongsInCollection = new Movie({
        title: flixsterMovie.title,
        release_year:flixsterMovie.year
      });
      newMovieThatBelongsInCollection.save(function(err,savedMovie){
        cb(err,savedMovie);// this.updatesMovieDocument(newMovieThatBelongsInCollection._id,cb);
      });
    }
  })
};

module.exports = collectionMaintainer;
