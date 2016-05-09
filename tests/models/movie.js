require('../testUtils');
var Promise = require('bluebird');
var expect = require('chai').expect;
var models = require('../../models');
var Movie = models.Movie;

describe('A movie', function() {

  beforeEach(function(done) {
    var theMatrix = {
      title: 'The Matrix',
      release_year: 1999
    };
    Movie.create(theMatrix).then(function() {
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('can be found in the database', function(done){
    Movie.findOne({})
    .then(function(movie) {
      expect(movie).to.be.ok;
      expect(movie).to.have.property('title','The Matrix');
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

  it('is played by actors', function(done) {
    var Actor = models.Actor;

    var keanu = {name: 'Keanu Reeves'};
    var carrie = {name: 'Carrie-Anne Moss'};
    var theMatrix;

    var promises = [];
    promises.push(Actor.create(keanu));
    promises.push(Actor.create(carrie));
    Promise.all(promises)
    .then(function(result) {
      keanu = result[0];
      carrie = result[1];
      return Movie.find({where:{title:'The Matrix'}});
    })
    .then(function(movie) {
      theMatrix = movie;
      return theMatrix.countActors();
    })
    .then(function(actorsCount) {
      expect(actorsCount).to.be.equal(0);
      promises = [];
      promises.push(theMatrix.addActor(keanu, {importance: 1}));
      promises.push(theMatrix.addActor(carrie, {importance: 2}));
      return Promise.all(promises);
    })
    .then(function() {
      return theMatrix.getActors();
    })
    .then(function(actors) {
      expect(actors).to.be.ok;
      expect(actors).to.have.lengthOf(2);
      expect(actors[0]).to.have.property('name');
      done();
    })
    .catch(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('was realised by directors', function(done) {
    var Director = models.Director;

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
      expect(err).to.be.null;
      done();
    });
  });

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

  it('can hold movie titles with special caracters in its title'); // "Che:" part one and two caused crashes

});
