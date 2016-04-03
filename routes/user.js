// var router = require('express').Router(),
//     flixsterLurker = require('../lurkers/flixster'),
//     userRegistrar = require('./userRegistrar'),
//     mongoose = require('mongoose'),
//     User = require('../models/user');
//
// // Routes
// // router.use(function(req, res, next) {
// //   console.log('%s %s %s', req.method, req.url, req.path);
// //   next();
// // });
//
// router.get('/', function(req, res) {
//   console.log('sup');
//   User.find({},function(err, docs) {
//     console.log('hey!',docs,err);
//     return res.send(docs);
//   });
// });
//
// router.get('/signup/flixster/:flixsterId', function(req, res) {
//   flixsterLurker = new flixsterLurker();
//   flixsterLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(response) {
//     var jsonResponse = JSON.parse(response);
//     userRegistrar = new userRegistrar();
//     userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user) {
//       return res.send(user);
//     });
//   });
// });
//
// module.exports = router;
