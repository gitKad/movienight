var should = require('should'),
    DB = require('../../db'),
    fixtures = require('../fixtures/model-movies');

var movie      = require('../../models/movie'),
    tmdbLurker = require('../../lurkers/tmdb');

describe('themoviedb Lurker',function() {

  before(function(done){
    tmdbLurker = new tmdbLurker();
    DB.connect(DB.MODE_TEST, done);
  });

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) {
        return done(err);
      }
      DB.fixtures(fixtures, done);
    });
  });

  it('can retrieve a movie from its TMDb id', function(done) {
    tmdbLurker.getMovie(550,1,function(response){
      var jsonResponse = JSON.parse(response);
      jsonResponse.title.should.eql('Fight Club');
      done();
    });
  });

  it('can browse first page of search results',function(done){
    tmdbLurker.searchMoviePagesByTitle('test',1, function(response) {
      var jsonResponse = JSON.parse(response);
      jsonResponse.should.have.property('page',1);
      jsonResponse.should.have.property('total_results');
      jsonResponse.should.have.property('total_pages');
      done();
    });
  });

  it('can browse second page of search results',function(done) {
    tmdbLurker.searchMoviePagesByTitle('test', 2, function(response) {
      var jsonResponse = JSON.parse(response);
      jsonResponse.should.have.property('page',2);
      jsonResponse.should.have.property('total_results');
      jsonResponse.should.have.property('total_pages'); //test if its higher than 1
      done();
    });
  });

  it('can return multiple pages of results',function(done) {
    var numberOfItems = 21;
    tmdbLurker.searchMovieByTitle('test', numberOfItems, function(response) {
      response.should.have.lengthOf(numberOfItems);
      done();
    });
  });

  it('can search movies by title and year',function(done) {
    tmdbLurker.searchMovieByTitleAndYear('Test',2014,5,function(response) {
      var release_year = response.release_date.substring(0,4);
      response.should.have.property('title','Test');
      response.should.have.property('release_date');
      release_year.should.equal('2014');
      done();
    });
  });

});
