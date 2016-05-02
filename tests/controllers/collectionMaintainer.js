require('../utils');
var expect = require('chai').expect;
var models = require('../../models');
var Movie = models.Movie;
var collectionMaintainer = require('../../controllers/collectionMaintainer');

require('../utils');

describe('My collection maintainer', function() {

  before(function(done){
    collectionMaintainer = new collectionMaintainer();
    done();
  });

  beforeEach(function(done){
    var fightClub = {
      title: 'Fight Club',
      TMDb_id: 550
    };
    var pulpFiction = {
      title: 'Pulp Fiction',
      release_year: 1994
    };
    var forestGump = {
      title: 'Forest Gump'
    };

    var promises = [];
    promises.push(Movie.create(fightClub));
    promises.push(Movie.create(pulpFiction));
    promises.push(Movie.create(forestGump));
    Promise.all(promises).then( function() {done();});
  });

  it('can retrieve data about a movie it only has basic information on',function(done) {
    this.timeout(5000);
    Movie.findOne({where:{title: 'Pulp Fiction'}})
    .then(function(aMovie) {
      expect(aMovie).to.not.be.undefined;
      expect(aMovie.TMDb_id).to.be.null;
      return collectionMaintainer.updatesMovieDocument(aMovie.id);
    })
    .then(function(aMovie) {
      expect(aMovie).to.be.ok;
      expect(aMovie).to.have.property('TMDb_id',680);
      return aMovie.getDirectors();
    })
    .then(function(directors) {
      expect(directors).to.have.lengthOf(1);
      expect(directors[0]).to.have.property('name','Quentin Tarantino');
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
    });
  });

  it('can add a movie discovered in a flixster rating to its collection', function(done){
    var flixsterLurker = require('../../lurkers/flixster');
    flixsterLurker = new flixsterLurker();
    var jsonResponse, nMoviesBefore;
    flixsterLurker.getFlixsterUsersScores(789760392,1)
    .then(function(response) {
      jsonResponse = JSON.parse(response);
      return Movie.count({title: jsonResponse[0].movie.title, release_year:jsonResponse[0].movie.year});
    })
    .then(function(c) {
      nMoviesBefore = c;
      return collectionMaintainer.hearsAboutThisMovieFromFlixster(jsonResponse[0].movie);
    })
    .then(function() {
      return Movie.count({title: jsonResponse[0].movie.title, release_year:jsonResponse[0].movie.year});
    })
    .then(function(nMoviesAfter) {
      expect(nMoviesAfter).to.equal(nMoviesBefore+1);
      done();
    });
  });

  it('will not add a movie discovered in a flixster rating that is already in the collection');

});
