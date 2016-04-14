// Test libraries and utilities
require('../utils');
var expect = require('chai').expect;

// Tested modules
var directorController = require('../../controllers/director');
var DirectorModel = require('../../models/director');

describe('My director controller', function(){

  before(function(){
    directorCtrl = new directorController();
  })

  beforeEach(function(done) {
    DirectorModel.create({rating: 50},function(){
      DirectorModel.create({rating: 80},function(){
        done();
      })
    })
  });

  it('can get all directors',function(done) {
    directorCtrl.getAll(function(err,users){
      expect(users).to.have.lengthOf(2);
      done();
    });
  });

  it('can get a director from its id',function(done) {
    // This query ensures the test is not passing because we access the first rating
    DirectorModel.find({}).skip(1).limit(1).exec(function (err, docs) {
      var directorId = docs[0]._id;
      directorCtrl.get(directorId,function(err, director) {
        expect(director).to.have.property('_id');
        expect(String(director._id)).to.eql(String(directorId));
        done();
      });
    });
  });

});
