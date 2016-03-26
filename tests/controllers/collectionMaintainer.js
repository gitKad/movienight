var should = require('should'),
    Movie = require('../../models/movie'),
    collectionMaintainer = require('../../controllers/collectionMaintainer');

describe('Collection Maintainer', function() {

  beforeEach(function(done){
    collectionMaintainer = new collectionMaintainer();
    console.log('creating fixture');
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
    Movie.create(fightClub, function(err,newMovie) {
        newMovie.save(function(err){
          // done();
        });
    });
    Movie.create(pulpFiction, function(err,newMovie) {
        newMovie.save(function(err){
          // done();
        });
    });
    Movie.create(forestGump, function(err,newMovie) {
        newMovie.save(function(err){

        });
    });
    setTimeout(done,1000);

  });

  before

  it('can retrieve data for a movie in the collection',function(done) {
    // this.timeout(5000);
    Movie.find({},function(err,movies) {
      collectionMaintainer.updatesMovieDocument(movies[1]._id,function(result) {
        done();
      });
    });
  });

});
