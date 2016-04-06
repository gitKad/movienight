var express = require('express');
var router     = express.Router();
var User       = require('../models/user');

router.use(function(req, res, next) {
	// middleware on routes?
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/users')
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
      }
			res.json(users);
		});

	});

router.get('/users/signup/flixster/:flixsterId', function(req, res,next) {

	var flixsterLurker = require('../lurkers/flixster');
  flixsterLurker = new flixsterLurker();

  flixsterLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(result) {
    var userRegistrar = require('../controllers/userRegistrar');
    userRegistrar = new userRegistrar();

		var jsonResponse = JSON.parse(result);
    userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
      res.json(user);
    });
  });
});

module.exports = router;
