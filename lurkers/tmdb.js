var request = require('request-promise');

var tmdbLurker = function() {
  this.key = process.env.movienight_tmdbapikey;
};

tmdbLurker.prototype.getMovie = function (tmdbMovieID,limit,cb) {
  var options = {
    url: 'https://api.themoviedb.org/3/movie/'+tmdbMovieID+'?api_key='+this.key
  };

  request(options)
    .then(function(body) {
      cb(body);
    });
}

tmdbLurker.prototype.getDirectors = function (tmdbMovieID,cb) {
  var options = {
    url: 'https://api.themoviedb.org/3/movie/'+tmdbMovieID+'/credits?api_key='+this.key
  };

  request(options).then(function(body) {
    var jsonBody = JSON.parse(body);
    var directors = jsonBody.crew.filter(function (el) {
      return el.job == 'Director' & el.department == 'Directing';
    });
    cb(directors);
  });
}

tmdbLurker.prototype.searchMoviePagesByTitle = function (title,page,cb) {
  var options = {
    url: 'https://api.themoviedb.org/3/search/movie?api_key='+this.key+'&query='+escape(title)+'&page='+page
  };

  request(options).then(function(body) {
    cb(body);
  });
}

tmdbLurker.prototype.searchMovieByTitle = function (title,limit,cb) {

  var i = 1;
  var result = [];
  var jsonBody;
  var tmdbLurker = this;

  (function appendPages(i) {
    i = i || 1;
    tmdbLurker.searchMoviePagesByTitle(title,i,function(response) {
      jsonBody = JSON.parse(response);
      Array.prototype.splice.apply(result, [1,0].concat(jsonBody.results));
      result.splice(limit,result.length-limit);
      if(result.length < limit && jsonBody.total_pages > i ) {
        appendPages(++i);
      } else {
        cb(result);
      }
    });
  })();
}

tmdbLurker.prototype.searchMovieByTitleAndYear = function (title,year,limit,cb) {
  this.searchMovieByTitle(title,limit,function(response) {
    for (var i = 0; i < response.length; i++) {
      if(response[i].release_date.substring(0,4) == year) {
        cb(response[i]);
        break;
      }
    }
  });
}

module.exports = tmdbLurker;
