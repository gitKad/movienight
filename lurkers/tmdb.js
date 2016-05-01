var request = require('request-promise');
var Promise = require('bluebird');

var tmdbLurker = function() {
  this.key = process.env.movienight_tmdbapikey;
};

tmdbLurker.prototype.getMovie = function (tmdbMovieID,limit) {
  var options = {
    url: 'https://api.themoviedb.org/3/movie/'+tmdbMovieID+'?api_key='+this.key
  };
  return request(options);
}

tmdbLurker.prototype.getDirectors = function (tmdbMovieID) {
  var tmdbLurker = this;

  return new Promise(function(resolve,reject) {
    var options = {
      url: 'https://api.themoviedb.org/3/movie/'+tmdbMovieID+'/credits?api_key='+tmdbLurker.key
    };

    request(options).then(function(body) {
      var jsonBody = JSON.parse(body);
      var directors = jsonBody.crew.filter(function (el) {
        return el.job == 'Director' & el.department == 'Directing';
      });
      resolve(directors);
    });
  });
}

tmdbLurker.prototype.searchMoviePagesByTitle = function (title, page) {
  var options = {
    url: 'https://api.themoviedb.org/3/search/movie?api_key='+this.key+'&query='+escape(title)+'&page='+page
  };
  return request(options);
}

tmdbLurker.prototype.searchMovieByTitle = function (title, limit) {
  var tmdbLurker = this;

  return new Promise(function(resolve,reject){
    var i = 1;
    var result = [];
    var jsonBody;

    (function appendPages(i) {
      i = i || 1;
      tmdbLurker.searchMoviePagesByTitle(title,i)
      .then(function(response) {
        jsonBody = JSON.parse(response);
        Array.prototype.splice.apply(result, [1,0].concat(jsonBody.results));
        result.splice(limit,result.length-limit);
        if(result.length < limit && jsonBody.total_pages > i ) {
          appendPages(++i);
        } else {
          resolve(result);
        }
      });
    })();
  });
}

tmdbLurker.prototype.searchMovieByTitleAndYear = function (title,year,limit) {
  var tmdbLurker = this;
  return new Promise(function(resolve,reject){
    tmdbLurker.searchMovieByTitle(title,limit)
    .then(function(response) {
      for (var i = 0; i < response.length; i++) {
        if(response[i].release_date.substring(0,4) == year) {
          resolve(response[i]);
          break;
        }
      }
    });
  });
}

module.exports = tmdbLurker;
