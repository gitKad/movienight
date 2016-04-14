var express = require('express');
var router  = express.Router();

router.route('/ratings').get(function(req, res) {
	var ratingController = require('../controllers/rating');
  ratingController = new ratingController();
	ratingController.getAll(function(err, ratings) {
		if (err) {
			res.send(err);
    }
		res.json(ratings);
	});
});

router.get('/ratings/:ratingId', function(req, res, next) {
	var ratingController = require('../controllers/rating');
	ratingController = new ratingController();
	ratingController.get(req.params.ratingId,function(err, rating) {
		if (err) {
			res.send(err);
		}
		res.json(rating);
	});
});

module.exports = router;
