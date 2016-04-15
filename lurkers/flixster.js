var request = require('request-promise');

var flixLurker = function() {
};

flixLurker.prototype.getFlixsterUsersScores = function (userid,limit,callback) {
  var options = {
    url: 'http://www.flixster.com/api/users/'+userid+'/movies/ratings?scoreTypes=numeric&limit='+limit
  };

  request(options).then(function(body) {
    callback(body);
  });
};

flixLurker.prototype.getFlixsterUsersWantToSee = function (userid,limit,callback) {
  var options = {
    url: 'http://www.flixster.com/api/users/'+userid+'/movies/ratings?scoreTypes=wts&limit='+limit
  };

  request(options).then(function(body) {
    callback(body);
  });
};

module.exports = flixLurker;
