var request = require('request-promise');

var flixLurker = function() {
};

flixLurker.prototype.getFlixsterUsersScores = function (userid,limit) {
  var options = {
    url: 'http://www.flixster.com/api/users/'+userid+'/movies/ratings?scoreTypes=numeric&limit='+limit
  };
  return request(options);
};

flixLurker.prototype.getFlixsterUsersWantToSee = function (userid,limit) {
  var options = {
    url: 'http://www.flixster.com/api/users/'+userid+'/movies/ratings?scoreTypes=wts&limit='+limit
  };
  return request(options);
};

module.exports = flixLurker;
