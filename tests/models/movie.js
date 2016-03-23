var should = require('should')
  , DB = require('../../db')
  , fixtures = require('../fixtures/model-movies');

var movie = require('../../models/movie');

describe('Model movie Tests', function() {

  before(function(done) {
    DB.connect(DB.MODE_TEST, done);
  })

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
    });
  });

  it('all', function(done) {
    movie.all(function(err, movies) {
      movies.length.should.eql(3)
      done();
    })
  })

  it('create', function(done) {
    movie.create('Fight Club', 1999, 'tt0137523', 13153, 550, 8.9, 79, 7.3, 96, 4.2, 8.0, function(err, id) {
      movie.all(function(err, movies) {
        movies.length.should.eql(4);
        movies[3]._id.should.eql(id);
        movies[3].title.should.eql('Fight Club');
        movies[3].score.imdb.id.should.eql('tt0137523');
        movies[3].score.imdb.score.should.eql(8.9);
        // movies[3].score.tomdb._id.should.eql('');
        // movies[3].movie.year.should.eql(1999);
        // movies[3].movie.director.should.eql();
        // movies[3].movie.genre.should.eql();
        // movies[3].movie.cast.should.eql();
        movies[3].score.flixster.id.should.eql(13153);
        movies[3].score.flixster.audienceScore.should.eql(96);
        movies[3].score.flixster.avg.should.eql(4.2);
        movies[3].score.rottenTomato.tomatometer.should.eql(79);
        movies[3].score.rottenTomato.avg.should.eql(7.3);
        movies[3].score.TMDb.id.should.eql(550);
        movies[3].score.TMDb.score.should.eql(8.0);
        done();
      });
    });
  });

  it('remove', function(done) {
    movie.all(function(err, movies) {
      movie.remove(movies[0]._id, function(err) {
        movie.all(function(err, result) {
          result.length.should.eql(2)
          result[0]._id.should.not.eql(movies[0]._id)
          result[1]._id.should.not.eql(movies[0]._id)
          done()
        })
      })
    })
  })
})
