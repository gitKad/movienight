var express = require('express'),
    mongoose = require ("mongoose"),
    flixLurker = require('../lurkers/flixster'),
    userRegistrar = require('../controllers/userRegistrar'),
    User = require('../models/user');

var app = express();

// Routes
app.get('/', function(req, res) {
  res.json({'version' : '0.0.1'});
});

app.get('/users', function(req, res) {
  User.find({},function(err, result) {
    res.json(result);
  });
});

app.get('/users/:id', function(req, res) {
  User.findById(req.params.id, function(err, result) {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json({result: result});
    }
  });
});

app.get('/users/signup/flixster/:flixsterId', function(req, res) {
  flixLurker.getFlixsterUsersScores(req.params.flixsterId,1,function(response){
    var jsonResponse = JSON.parse(response);
    userRegistrar.registerFlixsterUserFromMovieRatings(jsonResponse[0],function(user){
      res.json(user);
    })
  });
});

// startup server
app.listen(1337, function() {
  flixLurker = new flixLurker();
  userRegistrar = new userRegistrar();
});

module.exports = app;
