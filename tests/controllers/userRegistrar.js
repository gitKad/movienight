var expect = require('chai').expect,
    promise = require('promise'),
    User = require('../../models/user'),
    userRegistrar = require('../../controllers/userRegistrar'),
    flixsterLurker = require('../../lurkers/flixster');

describe('My user Registrar', function() {

  before(function(done){
    userRegistrar = new userRegistrar();
    flixsterLurker = new flixsterLurker();
    done();
  });

  beforeEach(function(done){
    var barbu = {
      profile: {
        firstName: 'Alexis',
        lastName: 'Philippe'
      },
      accounts: {
        flixster: 789760392
      }
    };
    User.create(barbu,function(err,doc){
      done();
    });
  });

  it('will save a never before seen user lurked by my flixster lurker',function(done) {
    User.count({},function(err,c){
      expect(err).to.be.null;
      var initialCount = c;
      flixsterLurker.getFlixsterUsersScores(826612548,1,function(result){
        var jsonResult = JSON.parse(result);
        userRegistrar.registerFlixsterUserFromMovieRatings(jsonResult[0],function(aUser){
          User.count({},function(err,c){
            expect(err).to.be.null;
            expect(c).to.equal(initialCount+1);
            expect(aUser).to.have.deep.property('accounts.flixster',jsonResult[0].user.id)
            done();
          });
        });
      });
    });
  });

  it('will not duplicate accounts of previously lurked users by my flixster lurker',function(done){
    User.count({},function(err,c){
      expect(err).to.be.null;
      expect(c).to.equal(1);
      flixsterLurker.getFlixsterUsersScores(789760392,1,function(result){
        var jsonResult = JSON.parse(result);
        userRegistrar.registerFlixsterUserFromMovieRatings(jsonResult[0],function(aUser){
          User.count({},function(err,c){
            expect(c).to.equal(1);
            expect(aUser).to.have.deep.property('accounts.flixster',jsonResult[0].user.id)
            done();
          });
        });
      });
    });
  });

});
