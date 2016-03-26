var expect = require('chai').expect,
    tmdbLurker = require('../../lurkers/tmdb');

describe('My themoviedb lurker',function() {

  before(function(done) {
    tmdbLurker = new tmdbLurker();
    done();
  });

  it('can retrieve a movie from its TMDb id', function(done) {
    tmdbLurker.getMovie(550,1,function(response){
      var jsonResponse = JSON.parse(response);
      expect(jsonResponse).to.have.property('title','Fight Club');
      done();
    });
  });

  it('can browse first page of search results',function(done){
    tmdbLurker.searchMoviePagesByTitle('test',1, function(response) {
      var jsonResponse = JSON.parse(response);
      expect(jsonResponse).to.have.property('page',1);
      expect(jsonResponse).to.have.property('total_results');
      expect(jsonResponse).to.have.property('total_pages');
      done();
    });
  });

  it('can browse second page of search results',function(done) {
    tmdbLurker.searchMoviePagesByTitle('test', 2, function(response) {
      var jsonResponse = JSON.parse(response);
      expect(jsonResponse).to.have.property('page',2);
      expect(jsonResponse).to.have.property('total_results');
      expect(jsonResponse).to.have.property('total_pages'); //test if its higher than 1
      done();
    });
  });

  it('can return multiple pages of results',function(done) {
    var numberOfItems = 21;
    tmdbLurker.searchMovieByTitle('test', numberOfItems, function(response) {
      expect(response).to.have.lengthOf(numberOfItems);
      done();
    });
  });

  it('can search movies by title and year',function(done) {
    tmdbLurker.searchMovieByTitleAndYear('Test',2014,5,function(response) {
      var release_year = response.release_date.substring(0,4);
      expect(response).to.have.property('title','Test');
      expect(response).to.have.property('release_date');
      expect(release_year).to.equal('2014');
      done();
    });
  });

});
