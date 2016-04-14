var Movie = require('../models/movie');

var movieController = function() {
};

movieController.prototype.get = function (docId,cb) {
  Movie.findOne({_id: docId}, function(err, rating) {
    cb(err, rating);
  });
};

movieController.prototype.getAll = function (cb) {
  Movie.find(function(err, ratings) {
    cb(err, ratings);
  });
};

module.exports = movieController;
