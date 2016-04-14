// Test libraries and utilities
require('../utils');
var expect = require('chai').expect;

// Tested modules
var movieController = require('../../controllers/movie');
var movieModel = require('../../models/movie');

describe('My movie controller', function(){

  before(function(){
    movieController = new movieController();
  })

  beforeEach(function(done) {
    movieModel.create({rating: 50},function(){
      movieModel.create({rating: 80},function(){
        done();
      })
    })
  });

  it('can get all movies',function(done) {
    movieController.getAll(function(err,users){
      expect(users).to.have.lengthOf(2);
      done();
    });
});

  it('can get a movie from its id',function(done) {
    // This query ensures the test is not passing because we access the first rating
    movieModel.find({}).skip(1).limit(1).exec(function (err, docs) {
      var ratingId = docs[0]._id;
      movieController.get(ratingId,function(err, rating) {
        expect(rating).to.have.property('_id');
        expect(String(rating._id)).to.eql(String(ratingId));
        done();
      });
    });
  });

});
