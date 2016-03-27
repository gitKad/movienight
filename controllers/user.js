var express = require('express'),
    router = express.Router(),
    flixLurker = require('../lurkers/flixster'),
    userRegistrar = require('../controllers/userRegistrar'),
    User = require('../models/user');

// Routes

router.get('/', function(req, res) {
  User.find({},function(err, result) {
    res.json(result);
  });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, result) {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json({result: result});
    }
  });
});

router.get('/signup/flixster/:flixsterId', function(req, res) {
  flixLurker = new flixLurker();
  userRegistrar = new userRegistrar();
  flixLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(response){
    var jsonResponse = JSON.parse(response);
    userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user){
      res.json(user);
    })
  });
});

module.exports = router;
