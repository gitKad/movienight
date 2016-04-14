var express = require('express');
var router  = express.Router();

router.route('/movies').get(function(req, res) {
	var movieController = require('../controllers/movie');
  movieController = new movieController();
	movieController.getAll(function(err, ratings) {
		if (err) {
			res.send(err);
    }
		res.json(ratings);
	});
});

router.get('/movies/:movieId', function(req, res, next) {
	var movieController = require('../controllers/movie');
	movieController = new movieController();
	movieController.get(req.params.movieId,function(err, rating) {
		if (err) {
			res.send(err);
		}
		res.json(rating);
	});
});

module.exports = router;
