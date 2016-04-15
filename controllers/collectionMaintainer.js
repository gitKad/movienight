// external dependencies
var mongo = require('mongodb');

var Movie = require('../models/movie');
var Director = require('../models/director');

var collectionMaintainer = function(){
};

collectionMaintainer.prototype.updatesMovieDocument = function (documentID,cb) {
  var tmdbLurker = require('../lurkers/tmdb');
  tmdbLurker = new tmdbLurker();
  Movie.findById(documentID,function(err,foundMovieInCollection) {
    if(err) cb(err);
    tmdbLurker.searchMovieByTitleAndYear(foundMovieInCollection.title.replace(':','!'),foundMovieInCollection.release_year,5,function(tmdbResult) {
      foundMovieInCollection.score.TMDb = {"id":null, "score":null};
      foundMovieInCollection.score.TMDb.id = tmdbResult.id;
      foundMovieInCollection.score.TMDb.score = tmdbResult.vote_average;
      tmdbLurker.getDirectors(tmdbResult.id,function(directors) {
        foundMovieInCollection.directors = [];
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
                  foundMovieInCollection.directors.push(savedDirector);
                  resolve()
                });
              } else {
                foundMovieInCollection.directors.push(doc);
                resolve();
              }
            });
          }));
        }
        Promise.all(promisesOfDirectors).then(function(promisesresults) {
          foundMovieInCollection.save(function(err,savedMovieInCollection){
            if(err) cb(err);
            cb(null,savedMovieInCollection);
          });
        });
      });
    });
  });
};

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
