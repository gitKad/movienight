var Director = require('../models/director');

var directorController = function() {
};

directorController.prototype.get = function (docId,cb) {
  Director.findOne({_id: docId}, function(err, rating) {
    cb(err, rating);
  });
};

directorController.prototype.getAll = function (cb) {
  Director.find(function(err, ratings) {
    cb(err, ratings);
  });
};

module.exports = directorController;
