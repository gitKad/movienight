process.env.NODE_ENV = 'test';

var Director = require('../models/director');
var User = require('../models/user');

beforeEach(function (done) {
  Director.truncate().then(function() {
    User.truncate().then(function() {
      done();
    });
  });
});
