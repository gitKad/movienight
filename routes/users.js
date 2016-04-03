var express = require('express'),
    router = express.Router(),
    flixsterLurker = require('../lurkers/flixster'),
    userRegistrar = require('../controllers/userRegistrar'),
    mongoose = require('mongoose'),
    User = require('../models/user');

router.get('/', function(req, res, next) {
  User.find({},function(err, docs) {
    res.json(docs);
  });
});

router.get('/signup/flixster/:flixsterId', function(req, res,next) {
  flixsterLurker = new flixsterLurker();
  flixsterLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(response) {
    var jsonResponse = JSON.parse(response);
    userRegistrar = new userRegistrar();
    userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
      res.json(user);
    });
  });
});

module.exports = router;
