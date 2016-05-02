var express = require('express');
var router  = express.Router();
var models = require('../models');
var Movie = models.Movie;

router.route('/movies').get(function(req, res) {
	Movie.findAll({})
	.then(function(movies) {
		res.json(movies);
	})
	.catch(function(err) {
		res.send(err);
	});
});

router.get('/movies/:movieId', function(req, res, next) {
	Movie.findById(req.params.movieId)
	.then(function(movie) {
		res.json(movie);
	})
	.catch(function(err) {
		res.send(err);
	});
});

module.exports = router;
