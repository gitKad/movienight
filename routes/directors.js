var express = require('express');
var router  = express.Router();

router.route('/directors').get(function(req, res) {
	var directorController = require('../controllers/director');
  directorCtrl = new directorController();
	directorCtrl.getAll(function(err, directors) {
		if (err) {
			res.send(err);
    }
		res.json(directors);
	});
});

router.get('/directors/:directorId', function(req, res, next) {
	var directorController = require('../controllers/director');
	directorCtrl = new directorController();
	directorCtrl.get(req.params.directorId,function(err, director) {
		if (err) {
			res.send(err);
		}
		res.json(director);
	});
});

module.exports = router;
