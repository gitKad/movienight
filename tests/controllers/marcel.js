var expect = require('chai').expect;

var Rating = require('../../models/rating');
var Movie = require('../../models/movie');
var CrewPref = require('../../models/prefCrew');
var marcel = require('../../controllers/marcel');

describe('My concierge, Marcel,', function() {

  before(function(done){
    Marcel = new marcel();
    done();
  });

  beforeEach(function(done){
    promiseArr = [];
    new Promise(function(resolve) {
      new Movie({
        directors:[{_id:040901},{_id:040902}],
        actors:[{_id:010301,order:0},{_id:010302,order:1},{_id:010303,order:2},{_id:010304,order:3},{_id:010305,order:4}]
      }).save(function(err,savedMovie) {
        new Rating({user:{_id:211901},movie:{_id:savedMovie._id},rating:70}).save(resolve)
      });
    });
    new Promise(function(resolve) {
      new Movie({directors:[{_id:040901}],
        actors:[{_id:010308,order:0},{_id:010307,order:1},{_id:010306,order:2},{_id:010305,order:3},{_id:010304,order:4}]
      }).save(function(err,savedMovie) {
        new Rating({user:{_id:211901},movie:{_id:savedMovie._id},rating:60}).save(resolve)
      });
    });
    new Promise(function(resolve) {
      new Movie({directors:[{_id:040903}],
        actors:[{_id:010308,order:0},{_id:010309,order:1},{_id:010310,order:2},{_id:010311,order:3},{_id:010312,order:4}]
      }).save(function(err,savedMovie) {
        new Rating({user:{_id:211901},movie:{_id:savedMovie._id},rating:80}).save(resolve)
      });
    });
    Promise.all(promiseArr).then(done());
  });

  it.skip('can infer who are the favorite movie directors of a user', function(done){
    CrewPref.count({},function(err,n) {
      expect(n).to.be.equal(0);
      Marcel.computePreferedCrewOf(211901,function(err,prefs) {
        expect(err).to.be.null;
        expect(prefs).to.have.lengthOf(3);
        expect(prefs[0]).to.have.deep.property('user._id',211901);
        expect(prefs[0]).to.have.deep.property('crew._id',010308);
        expect(prefs[0]).to.have.property('count',2);
        expect(prefs[0]).to.have.property('average',65);
        expect(prefs[0]).to.have.property('stdev',5);
        expect(prefs[0]).to.have.property('weight');
        expect(prefs[0].weight).to.be.a(numeric);
        done();
      });
    });
  });

  it.skip('can infer who are the favorite actors of a user', function(done){
    ActorPref.count({},function(err,n) {
      expect(n).to.be.equal(0);
      Marcel.computePreferedActorsOf(211901,function(err,prefs) {
        expect(err).to.be.null;
        expect(prefs).to.have.lengthOf(12);
        expect(prefs[0]).to.have.deep.property('user._id',211901);
        expect(prefs[0]).to.have.deep.property('actor._id',040901);
        expect(prefs[0]).to.have.property('count',2);
        expect(prefs[0]).to.have.property('average',65);
        expect(prefs[0]).to.have.property('stdev',5);
        expect(prefs[0]).to.have.property('weight');
        expect(prefs[0].weight).to.be.a(numeric);
        done();
      });
    });
  });

  it('can infer who are the favorite genres of a user');
  it('can create a list of movie recommendation of a user');
  it('can guess how a user liked a movie he watched');


});
