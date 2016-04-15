// external dependencies
var mongo = require('mongodb');

var Movie = require('../models/movie');
var Director = require('../models/director');

var tmdbLurker = require('../lurkers/tmdb');

var collectionMaintainer = function(){
  tmdbLrkr = new tmdbLurker();
  collectionMtnr = this;
};

collectionMaintainer.prototype.updatesMovieDocument = function (documentID,cb) {
  Movie.findById(documentID,function(err,foundMovieInCollection) {
    if(err) cb(err);
    tmdbLrkr.searchMovieByTitleAndYear(foundMovieInCollection.title,foundMovieInCollection.release_year,5,function(tmdbResult) {
      foundMovieInCollection.score.TMDb = {"id":null, "score":null};
      foundMovieInCollection.score.TMDb.id = tmdbResult.id;
      foundMovieInCollection.score.TMDb.score = tmdbResult.vote_average;
      foundMovieInCollection.save(function(err) {
        if(err) cb(err);
        collectionMtnr.maintainDirectorsOfAMovie(documentID,function(err,updatedMovieDoc){
          if(err) cb(err);
          cb(null,updatedMovieDoc)
        });
      });
    });
  });
};

collectionMaintainer.prototype.maintainDirectorsOfAMovie = function(documentID,cb) {
  Movie.findById(documentID,function(err,movieDoc) {
    if(err) cb(err);
    if(!(movieDoc || movieDoc.score || movieDoc.score.TMDb || movieDoc.score.TMDb.id)){
      cb('this movie doesn\'t have a reference to tmdb');
    }
    tmdbLrkr.getDirectors(movieDoc.score.TMDb.id,function(directors) {
      movieDoc.directors = [];
      var promisesOfDirectors = [];
      for (var i = 0; i < directors.length; i++) {
        promisesOfDirectors.push(new Promise(function(resolve,reject) {
          var tmdbDirector = directors[i];
          Director.findOne({name: tmdbDirector.name}, function(err,doc) {
            if(err) reject(err);
            if(doc == null) {
              var newDirector = new Director({
                name: tmdbDirector.name
              });
              newDirector.save(function(err,savedDirector) {
                if(err) reject(err);
                movieDoc.directors.push(savedDirector);
                resolve()
              });
            } else {
              movieDoc.directors.push(doc);
              resolve();
            }
          });
        }));
      }
      Promise.all(promisesOfDirectors).then(function(promisesresults) {
        movieDoc.save(function(err,savedMovieInCollection){
          if(err) cb(err);
          cb(null,savedMovieInCollection);
        });
      });
    });
  });
}

collectionMaintainer.prototype.hearsAboutThisMovieFromFlixster = function (flixsterMovie,cb) {
  var thisPointer = this;
  Movie.findOne({title: flixsterMovie.title, release_year:flixsterMovie.year},function(err,theMovieAlreadyInTheCollection){
    if(err) cb(err);
    if(theMovieAlreadyInTheCollection == null) {
      var newMovieThatBelongsInCollection = new Movie({
        title: flixsterMovie.title,
        release_year:flixsterMovie.year
      });
      newMovieThatBelongsInCollection.save(function(err,savedMovie,numberSaved) {
        if(err) cb(err);
        thisPointer.updatesMovieDocument(savedMovie._id,function(err, updatedMovie) {
          if(err) cb(err);
          cb(null,updatedMovie);
        });
      });
    }
  })
};

module.exports = collectionMaintainer;
