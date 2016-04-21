var Rating = require('../models/Rating');
var Movie = require('../models/Movie');
var CrewPref = require('../models/prefCrew');

var marcel = function() {
  this.weightOfTheDirectorRole = 1;
};

marcel.prototype.computePreferedCrewOf = function (userId,cb) {

  CrewPref.remove({user:{_id: userId}},function(err){
    if(err) cb(err);
    Rating.find({user:{_id: userId}},function(err,thisUserRatings){
      if(err) cb(err);
      var promises = [];
      var crewPrefWorkTable = [];
      for (var i = 0; i < thisUserRatings.length; i++) {
        for (var j = 0; j < thisUserRatings[i].directors.length; j++) {
          crewPromises.push(new Promise(function(resolve,reject) {
            CrewPref.insert({user: {_id: userId},crew:{_id:thisUserRatings[i].directors[j]._id}})
          }));
        }
      }
      Promise.all(promises).then(function(){
        cb(null);
      });
    });
  });
};

module.exports = marcel;
