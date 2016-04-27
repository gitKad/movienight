require('../utils');
var Promise = require('bluebird');
var expect = require('chai').expect;
var models = require('../../models');
var Movie = models.Movie;
var Director = models.Director;

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id);
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

describe('My movie model', function() {

  beforeEach(function(done) {
    var pulpFiction = {
      title: 'Pulp Fiction',
      release_year: 1994
    };
    var theMatrix = {
      title: 'The Matrix',
      release_year: 1999
    };

    var promises = [];
    promises.push(Movie.create(pulpFiction));
    promises.push(Movie.create(theMatrix));
    Promise.all(promises).then(function() {
      done();
    })
    .catch(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('can be found in the database', function(done){
    Movie.findOne({})
    .then(function(movie) {
      expect(movie).to.be.ok;
      expect(movie).to.have.property('title','Pulp Fiction');
      expect(movie).to.have.property('release_year',1994);
      done();
    });
  });

  it('gets created with all its properties', function(done) {
    var fightClub = {
      title: 'Fight Club',
      release_year: 1999,
      rottenTomato_tomatometer: 79,
      rottenTomato_avg: 7.3,
      flixster_id: 13153,
      flixster_audienceScore: 96,
      flixster_avg: 4.2,
      imdb_id: 'tt0137523',
      imdb_score: 8.9,
      TMDb_id: 550,
      TMDb_score: 8.0
    };

    Movie.create(fightClub)
    .then(function(movie) {
      expect(movie).to.have.property('title','Fight Club');
      expect(movie).to.have.property('release_year',1999);
      expect(movie).to.have.property('rottenTomato_tomatometer',79);
      expect(movie).to.have.property('rottenTomato_avg',7.3);
      expect(movie).to.have.property('flixster_id',13153);
      expect(movie).to.have.property('flixster_audienceScore',96);
      expect(movie).to.have.property('flixster_avg',4.2);
      expect(movie).to.have.property('imdb_id','tt0137523');
      expect(movie).to.have.property('imdb_score',8.9);
      expect(movie).to.have.property('TMDb_id',550);
      expect(movie).to.have.property('TMDb_score',8.0);
      done();
    });
  });





  it('was realised by directors', function(done) {
    var lilly = {name: 'Lilly Wachowski'};
    var lana = {name: 'Lana Wachowski'};
    var theMatrix;

    var promises = [];
    promises.push(Director.create(lilly));
    promises.push(Director.create(lana));
    Promise.all(promises)
    .then(function(result) {
      lilly = result[0];
      lana = result[1];
      return Movie.find({where:{title:'The Matrix'}});
    })
    .then(function(movie) {
      theMatrix = movie;
      return theMatrix.countDirectors();
    })
    .then(function(directorsCount) {
      expect(directorsCount).to.be.equal(0);
      return theMatrix.addDirectors([lilly,lana]);
    })
    .then(function() {
      return theMatrix.getDirectors();
    })
    .then(function(directors) {
      expect(directors).to.be.ok;
      expect(directors).to.have.lengthOf(2);
      expect(directors[0]).to.have.property('name');
      done();
    })
    .catch(function(err) {
      if(err) console.log(err);
      done();
    });

  });

  it('can hold movies with ":" in its title'); // "Che:" part one and two caused crashes

  it('can be removed from the database', function(done) {
    var nMoviesBefore;

    Movie.findAndCountAll()
    .then(function(result) {
      nMoviesBefore = result.count;
      return result.rows[0].destroy();
    })
    .then(function() {
      return Movie.count();
    })
    .then(function(c) {
      expect(c).to.equal(nMoviesBefore-1);
      done();
    });
  });

});
