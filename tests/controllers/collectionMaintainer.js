var expect = require('chai').expect,
    Movie = require('../../models/movie'),
    collectionMaintainer = require('../../controllers/collectionMaintainer');

require('../utils');

describe('My collection maintainer', function() {

  before(function(done){
    collectionMaintainer = new collectionMaintainer();
    done();
  });

  beforeEach(function(done){
    var fightClub = new Movie({
      title: 'Fight Club',
      score: {
        TMDb:{
          id: 550
        }
      }
    });
    var pulpFiction = new Movie({
      title: 'Pulp Fiction',
      release_year: 1994
    });
    var forestGump = new Movie({
      title: 'Forest Gump'
    });

    var promiseArr = [];
    promiseArr.push(new Promise(function(resolve,reject){fightClub.save(resolve);}));
    promiseArr.push(new Promise(function(resolve,reject){pulpFiction.save(resolve);}));
    promiseArr.push(new Promise(function(resolve,reject){forestGump.save(resolve);}));
    Promise.all(promiseArr).then(done());
  });

  it('can retrieve data about a movie it only has basic information on',function(done) {
    Movie.findOne({title: 'Pulp Fiction'},function(err,aMovie) {
      expect(aMovie.score.TMDb.id).to.be.an('undefined');
      collectionMaintainer.updatesMovieDocument(aMovie._id,function(err, result) {
        expect(result).to.have.deep.property('score.TMDb.id',680);
        expect(result).to.have.property('directors');
        expect(result.directors).to.have.lengthOf(1);
        expect(result.directors[0]).to.have.property('name','Quentin Tarantino');
        done();
      });
    });
  });

  it('can add a movie discovered in a flixster rating to its collection', function(done){
    var flixsterLurker = require('../../lurkers/flixster');
    flixsterLurker = new flixsterLurker();
    flixsterLurker.getFlixsterUsersScores(789760392,1,function(response) {
      var jsonResponse = JSON.parse(response);
      Movie.count({title: jsonResponse[0].movie.title, release_year:jsonResponse[0].movie.year},function(err,nMoviesBefore){
        collectionMaintainer.hearsAboutThisMovieFromFlixster(jsonResponse[0].movie,function(err,cb) {
          Movie.count({title: jsonResponse[0].movie.title, release_year:jsonResponse[0].movie.year},function(err,nMoviesAfter){
            expect(nMoviesAfter).to.equal(nMoviesBefore+1);
            done();
          });
        });
      });
    });
  });

  it('will not add a movie discovered in a flixster rating that is already in the collection');

});
