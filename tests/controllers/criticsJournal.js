require('../testUtils');
var expect = require('chai').expect;
var models = require('../../models');
var User = models.User;
var criticsJournal = require('../../controllers/criticsJournal');

describe('My critics journal', function() {

  before(function(done){
    criticsJournal = new criticsJournal();
    done();
  });

  beforeEach(function(done){
    var barb = {flixster_id:880813768};
    User.create(barb).then(function() { done(); });
  });

  it('will transcribe two ratings a user had done on flixster',function(done) {
    this.timeout(5000);
    var numberOfRatingsToFetch = 2;
    var user;

    User.findOne({})
    .then(function(aUser) {
      user = aUser;
      return user.getMovies();
    })
    .then(function(ratings) {
      expect(ratings).to.have.lengthOf(0);
      return criticsJournal.getFlixsterRatings(user.id, numberOfRatingsToFetch);
    })
    .then(function() {
      return user.getMovies();
    })
    .then(function(ratings) {
      expect(ratings).to.have.lengthOf(numberOfRatingsToFetch);
      expect(ratings[0]).to.have.deep.property('movieratings.rating');
      done();
    })
    .catch(function(err) {
      console.log(err);
      expect(err).to.be.null;
      done();
    });
  });

});
