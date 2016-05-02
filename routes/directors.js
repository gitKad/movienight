var express = require('express');
var router  = express.Router();
var models = require('../models');
var Director = models.Director;

router.route('/directors').get(function(req, res) {
	Director.findAll({})
	.then(function(directors) {
		res.json(directors);
	})
	.catch(function(err) {
		res.send(err);
	});
});

router.get('/directors/:directorId', function(req, res, next) {
	Director.findById(req.params.directorId)
	.then(function(director) {
		res.json(director);
	})
	.catch(function(err) {
		res.send(err);
	});
});

module.exports = router;
