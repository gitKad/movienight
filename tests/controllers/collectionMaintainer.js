var expect = require('chai').expect,
    promise = require('promise'),
    Movie = require('../../models/movie'),
    collectionMaintainer = require('../../controllers/collectionMaintainer');

describe('My collection maintainer', function() {

  beforeEach(function(done){
    collectionMaintainer = new collectionMaintainer();
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
    promiseArr.push(Movie.create(fightClub));
    promiseArr.push(Movie.create(pulpFiction));
    promiseArr.push(Movie.create(forestGump));

    promise.all(promiseArr).then(done());

  });

  it('can retrieve data for a movie in the collection',function(done) {
    Movie.findOne({title: 'Pulp Fiction'},function(err,aMovie) {
      expect(aMovie).to.have.property('release_year',1994);
      expect(aMovie.score.TMDb.id).to.be.an('undefined');
      collectionMaintainer.updatesMovieDocument(aMovie._id,function(result) {
        expect(result).to.have.deep.property('score.TMDb.id',680);
        done();
      });
    });
  });

});
