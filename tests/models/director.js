require('../utils');
var expect = require('chai').expect;

var Director = require('../../models/director');

describe('My director model', function() {

  beforeEach(function(done){
    var ChristopherNolan = new Director({
      name: 'Christopher Nolan'
    });
    ChristopherNolan.save(done);
  });

  it('gets created with all its properties', function(done) {
    var testName = 'Lilly Wachowski';

    var LillyWachowski = new Director({
      name: testName
    });

    LillyWachowski.save(function(err,savedDirector) {
      var leanSavedDirector = savedDirector.toObject();
      expect(leanSavedDirector).to.be.an('object');
      expect(leanSavedDirector).to.have.property('_id');
      expect(leanSavedDirector).to.have.property('name',testName);
      done();
    });
  });

  it('can be found in the database',function(done){
    Director.findOne({},function(err,anyDirector) {
      expect(anyDirector).to.have.property('name','Christopher Nolan');
      done();
    });
  });

  it('can be removed from the database', function(done) {
    Director.count({},function(err,nDirectorsBefore) {
      expect(nDirectorsBefore).to.equal(1);
      Director.remove({},function(err){
        Director.count({},function(err,nDirectorsAfter) {
          expect(nDirectorsAfter).to.equal(0);
          done();
        });
      });
    });
  });
});
