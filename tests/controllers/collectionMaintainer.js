// external dependencies
var should = require('should');

// models
var movie    = require('../../models/movie'),
    fixtures = require('../fixtures/model-movies');

// modules
var collectionMaintainer = require('../../controllers/collectionMaintainer'),
    DB = require('../../db');

describe('Collection Maintainer', function() {

  before(function(done) {
    collectionMaintainer = new collectionMaintainer();
    DB.connect(DB.MODE_TEST, done);
  })

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
    });
  });

  it('can retrieve data for a movie in the collection',function(done) {
    movie.all(function(err,movies) {
      collectionMaintainer.updatesMovieDocument(movies[1]._id,function(result) {
        done();
      });
    });
  });

});
