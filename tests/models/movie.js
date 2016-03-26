var utils = require('../utils'),
    chai = require('chai'),
    expect = chai.expect,
    Movie = require('../../models/movie.js');

describe('My movie model', function() {

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
        expect(newMovie).to.have.property('title','Fight Club');
        expect(newMovie).to.have.property('release_year',1999);
        expect(newMovie).to.have.deep.property('score.rottenTomato.tomatometer',79);
        expect(newMovie).to.have.deep.property('score.rottenTomato.avg',7.3);
        expect(newMovie).to.have.deep.property('score.flixster.id',13153);
        expect(newMovie).to.have.deep.property('score.flixster.audienceScore',96);
        expect(newMovie).to.have.deep.property('score.flixster.avg',4.2);
        expect(newMovie).to.have.deep.property('score.imdb.id','tt0137523');
        expect(newMovie).to.have.deep.property('score.imdb.score',8.9);
        expect(newMovie).to.have.deep.property('score.TMDb.id',550);
        expect(newMovie).to.have.deep.property('score.TMDb.score',8.0);
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
          expect(docs[0]).to.have.property('title','Pulp Fiction');
          expect(docs[0]).to.have.property('release_year',1994);
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
          expect(nMovies).to.equal(1);
          Movie.remove({},function(err){
            Movie.count({},function(err,nMovies) {
              expect(nMovies).to.equal(0);
              done();
            });
          });
        });
      });
    });
  });
});
