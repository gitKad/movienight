var express = require('express');
var router  = express.Router();
var models = require('../models');
var User = models.User;

// todo move this where it belongs
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/users').get(function(req, res) {
	User.findAll({})
	.then(function(users) {
		res.json(users);
	})
	.catch(function(err) {
		res.send(err);
	});
});

router.get('/users/:userId', function(req, res, next) {
	User.findById(req.params.userId)
	.then(function(user) {
		res.json(user);
	})
	.catch(function(err) {
		res.send(err);
	});
});

router.get('/users/:userId/ratings', function(req, res, next) {
	var MovieRatings = models.MovieRatings
	User.findById(req.params.userId)
	.then(function(user) {
		return user.getMovies();
	})
	.then(function(ratings){
		res.json(ratings);
	})
	.catch(function(err) {
		res.send(err);
	});
});

router.get('/users/signup/flixster/:flixsterId', function(req, res,next) {

	var flixsterLurker = require('../lurkers/flixster');
  var flixsterLrkr = new flixsterLurker();
	var userRegistrar = require('../controllers/userRegistrar');
	var userRgstrr = new userRegistrar();

  flixsterLrkr.getFlixsterUsersScores(req.params.flixsterId,1)
	.then(function(result) {
		var jsonResponse = JSON.parse(result);
    return userRgstrr.registerFlixsterUserFromMovieRatings(jsonResponse[0]);
	})
	.then(function(user) {
    res.json(user);
  })
	.catch(function(err) {
		res.send(err);
	});
});

router.get('/users/:userId/refreshFlixsterRatings', function(req, res,next) {
	res.json('[]');
});

module.exports = router;
