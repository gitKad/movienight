var express = require('express');
var router     = express.Router();

var config = require('../config');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dev');
var User       = require('../models/user');

router.use(function(req, res, next) {
	console.log('Something is happening.');
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


// router.get('/signup/flixster/:flixsterId', function(req, res,next) {
//   flixsterLurker = new flixsterLurker();
//   flixsterLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(response) {
//     var jsonResponse = JSON.parse(response);
//     userRegistrar = new userRegistrar();
//     userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
//       res.json(user);
//     });
//   });
// });

module.exports = router;
