var expect = require('chai').expect,
    User = require('../../models/user'),
    Rating = require('../../models/rating'),
    criticsJournal = require('../../controllers/criticsJournal');

describe('My critics journal', function() {

  before(function(done){
    criticsJournal = new criticsJournal();
    done();
  });

  beforeEach(function(done){
    var barb = new User({
      accounts: {
        flixster: 880813768
      }
    });
    barb.save(done);
  });

  it('will transcribe a rating a user had done on flixster',function(done) {
    User.findOne({}, function(err, user) {
      Rating.count({}, function(err,nRatings) {
        expect(nRatings).to.be.equal(0);
        criticsJournal.getFlixsterRatings(user._id, 2, function(err,doc){
          Rating.find().lean().exec(function(err,ratings) {
            expect(ratings[0]).to.have.property('rating');
            expect(ratings[0]).to.have.deep.property('movie._id');
            expect(ratings[0]).to.have.deep.property('user._id');
            done();
          });
        });
      });
    });
  });

});
