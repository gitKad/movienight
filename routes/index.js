var express = require('express'),
    router = express.Router(),
    flixsterLurker = require('../lurkers/flixster'),
    userRegistrar = require('../controllers/userRegistrar'),
    User = require('../models/user');

router.get('/', function(req, res, next) {
  res.json({'version' : '0.0.1'});
});

module.exports = router;
