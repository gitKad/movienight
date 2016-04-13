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

  it('will transcribe ratings a user had done on flixster',function(done) {
    User.findOne({}, function(err, user) {
      Rating.count({}, function(err,nRatings) {
        expect(nRatings).to.be.equal(0);
        criticsJournal.getFlixsterRatings(user._id, function(err,doc){
          Rating.count({}, function(err,nRatings) {
            expect(nRatings).to.be.above(0);
            done();
          });
        });
      });
    });
  });

});
