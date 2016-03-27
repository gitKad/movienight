var express = require('express'),
    router = express.Router()

router.use('/users', require('./user'));
// router.use('/movies', require('./movie'));

router.get('/', function(req, res) {
  res.json({'version' : '0.0.1'});
});

module.exports = router
