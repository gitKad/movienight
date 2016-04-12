var Rating = require('../models/rating');

var ratingController = function() {
};

ratingController.prototype.get = function (docId,cb) {
  Rating.findOne({_id: docId}, function(err, rating) {
    cb(err, rating);
  });
};

ratingController.prototype.getAll = function (cb) {
  Rating.find(function(err, ratings) {
    cb(err, ratings);
  });
};

module.exports = ratingController;
