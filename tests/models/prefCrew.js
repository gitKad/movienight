require('../utils');
var expect = require('chai').expect;

var CrewPref = require('../../models/prefCrew');

describe('My Crew Preferences model', function() {

  beforeEach(function(done){
    var ChristopherNolan = new CrewPref({
      user: {_id:211901, name:'Alexis Philippe'},
      crew: {_id:031801, name:'Christopher Nolan'},
      count: 5,
      avg: 87,
      std: 7,
      weight: 0.7143
    });
    ChristopherNolan.save(done);
  });

  it('gets created with all its properties', function(done) {
    var testDirectorName = 'Tim Burton';
    var testUserName = 'Alexis Philippe';
    var testCount = 5;
    var testAvg = 87;
    var testStd = 7;
    var testWeight = 0.7143;

    var ChristopherNolan = new CrewPref({
      user: {_id:211901, name:testUserName},
      crew: {_id:031801, name:testDirectorName},
      count: testCount,
      avg: testAvg,
      std: testStd,
      weight: testWeight
    });

    ChristopherNolan.save(function(err,savedDirectorPref) {
      var leanSavedDirectorPref = savedDirectorPref.toObject();
      expect(leanSavedDirectorPref).to.be.an('object');
      expect(leanSavedDirectorPref).to.have.property('_id');
      expect(leanSavedDirectorPref).to.have.property('count',testCount);
      expect(leanSavedDirectorPref).to.have.property('avg',testAvg);
      expect(leanSavedDirectorPref).to.have.property('std',testStd);
      expect(leanSavedDirectorPref).to.have.property('weight',testWeight);
      expect(leanSavedDirectorPref).to.have.deep.property('user.name',testUserName);
      expect(leanSavedDirectorPref).to.have.deep.property('crew.name',testDirectorName);
      done();
    });
  });

  it('can be found in the database',function(done){
    CrewPref.findOne({},function(err,anyPref) {
      expect(err).to.be.null;
      expect(anyPref).to.have.deep.property('crew.name','Christopher Nolan');
      done();
    });
  });

  it('can be removed from the database', function(done) {
    CrewPref.count({},function(err,nCrewPrefBefore) {
      expect(nCrewPrefBefore).to.equal(1);
      CrewPref.remove({},function(err){
        CrewPref.count({},function(err,nCrewPrefAfter) {
          expect(nCrewPrefAfter).to.equal(0);
          done();
        });
      });
    });
  });
});
