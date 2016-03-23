var utils = require('../utils'),
    should = require('should'),
    Movie = require('../../models/movie.js');

describe('Model movie ', function() {

  it('gets created', function(done) {
    var fightClub = new Movie({
      title: 'Fight Club',
      release_year: 1999,
      score: {
        rottenTomato:{
          tomatometer: 79,
          avg: 7.3
        },
        flixster:{
          id: 13153,
          audienceScore: 96,
          avg: 4.2
        },
        imdb:{
          id: 'tt0137523',
          score: 8.9
        },
        TMDb:{
          id: 550,
          score: 8.0
        }
      }
    });

    Movie.create(fightClub, function(err,newMovie) {
      newMovie.save(function(err){
        should.not.exist(err);
        newMovie.title.should.equal('Fight Club');
        newMovie.release_year.should.equal(1999);
        newMovie.score.rottenTomato.tomatometer.should.equal(79);
        newMovie.score.rottenTomato.avg.should.equal(7.3);
        newMovie.score.flixster.id.should.equal(13153);
        newMovie.score.flixster.audienceScore.should.equal(96);
        newMovie.score.flixster.avg.should.equal(4.2);
        newMovie.score.imdb.id.should.equal('tt0137523');
        newMovie.score.imdb.score.should.equal(8.9);
        newMovie.score.TMDb.id.should.equal(550);
        newMovie.score.TMDb.score.should.equal(8.0);
        done();
      });
    });
  });

  it('can be found in the collection',function(done){
    var pulpFiction = new Movie({
      title: 'Pulp Fiction',
      release_year: 1994
    });

    Movie.create(pulpFiction, function(err,newMovie) {
      newMovie.save(function(err){
        Movie.find({},function(err,docs) {
          docs[0].title.should.equal('Pulp Fiction');
          docs[0].release_year.should.equal(1994);
          done();
        });
      });
    });
  });

  it('can be removed', function(done) {
    var theMatrix = new Movie({
      title: 'The Matrix',
      release_year: 1999
    });

    Movie.create(theMatrix, function(err,newMovie) {
      newMovie.save(function(err){
        Movie.count({},function(err,nMovies) {
          nMovies.should.equal(1);
          Movie.remove({},function(err){
            Movie.count({},function(err,nMovies) {
              nMovies.should.equal(0);
              done();
            });
          });
        });
      });
    });
  });
});
