var models = require('../models');
var Movie = models.Movie;
var Director = models.Director;

var tmdbLurker = require('../lurkers/tmdb');

var collectionMaintainer = function(){
  tmdbLrkr = new tmdbLurker();
  collectionMtnr = this;
};

collectionMaintainer.prototype.hearsAboutThisMovieFromFlixster = function (flixsterMovie) {
  var thisPointer = this;
  return new Promise(function(resolve, reject) {
    var movie;
    Movie.findOrCreate({where:{title: flixsterMovie.title, release_year:flixsterMovie.year}})
    .spread(function(aMovie, isCreated) {
      movie = aMovie
      if(isCreated) {
        return thisPointer.updatesMovieDocument(movie.id);
      } else {
        resolve(movie);
      }
    })
    .then(function() {
      resolve(movie);
    })
    .catch(function(err) {
      reject(err);
    });
  });
};

collectionMaintainer.prototype.updatesMovieDocument = function (documentID) {
  return new Promise(function(resolve, reject) {
    var foundMovieInCollection;
    Movie.findById(documentID)
    .then(function(aMovie) {
      foundMovieInCollection = aMovie;
      return tmdbLrkr.searchMovieByTitleAndYear(foundMovieInCollection.title,foundMovieInCollection.release_year,5);
    })
    .then(function(tmdbResult) {
      foundMovieInCollection.TMDb_id = tmdbResult.id;
      foundMovieInCollection.TMDb_score = tmdbResult.vote_average;
      return foundMovieInCollection.save();
    })
    .then(function() {
      return collectionMtnr.maintainDirectorsOfAMovie(documentID);
    })
    .then(function(updatedMovieDoc) {
      resolve(updatedMovieDoc);
    })
    .catch(reject);
  });
};

collectionMaintainer.prototype.maintainDirectorsOfAMovie = function(documentID) {
  return new Promise(function(resolve, reject) {
    var movieDoc;
    Movie.findById(documentID)
    .then(function(aMovie) {
      movieDoc = aMovie;
      if(movieDoc == null || movieDoc.TMDb_id == null) {
        reject('this movie doesn\'t have a reference to tmdb');
      } else {
        return tmdbLrkr.getDirectors(movieDoc.TMDb_id);
      }
    })
    .then(function(directors) {
      return Promise.all(directors.map(function(TMDbDirector) {
        return Director.findOrCreate({where:{name: TMDbDirector.name}});
      }))
      .then(function(spreadedDirectors) {
        return Promise.all(spreadedDirectors.map(function(spreadedDirector2) {
          return movieDoc.addDirector(spreadedDirector2[0])
        }))
      })
      .then(function(){resolve(movieDoc);})
      .catch(reject);
    });
  });
}



module.exports = collectionMaintainer;
