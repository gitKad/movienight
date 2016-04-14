var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/users').get(function(req, res) {
	var userController = require('../controllers/user');
  var userCtrl = new userController();
	userCtrl.getAll(function(err, users) {
		if (err) {
			res.send(err);
    }
		res.json(users);
	});
});

router.get('/users/:userId', function(req, res, next) {
	var userController = require('../controllers/user');
	var userCtrl = new userController();
	userCtrl.get(req.params.userId,function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

router.get('/users/signup/flixster/:flixsterId', function(req, res,next) {

	var flixsterLurker = require('../lurkers/flixster');
  var flixsterLrkr = new flixsterLurker();

  flixsterLrkr.getFlixsterUsersScores(req.params.flixsterId,1,function(result) {
    var userRegistrar = require('../controllers/userRegistrar');
    var userRgstrr = new userRegistrar();

		var jsonResponse = JSON.parse(result);
    userRgstrr.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
      res.json(user);
    });
  });
});

router.get('/users/:userId/refreshFlixsterRatings', function(req, res,next) {
	res.json('[]');
});

module.exports = router;
