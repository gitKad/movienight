var express = require('express'),
    router = express.Router(),
    flixsterLurker = require('../lurkers/flixster'),
    userRegistrar = require('../controllers/userRegistrar'),
    User = require('../models/user');

// router.use('/users', require('./user'));
// router.use('/movies', require('./movie'));

router.get('/', function(req, res, next) {
  res.json({'version' : '0.0.1'});
});

router.get('/users', function(req, res) {
  User.find({},function(err, docs) {
    return res.send(docs);
  });
});

router.get('/users/signup/flixster/:flixsterId', function(req, res) {
  flixsterLurker = new flixsterLurker();
  flixsterLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(response) {
    var jsonResponse = JSON.parse(response);
    userRegistrar = new userRegistrar();
    userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
      return res.send(user);
    });
  });
});

module.exports = router;
