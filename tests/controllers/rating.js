// Test libraries and utilities
require('../utils');
var expect = require('chai').expect;

// Tested modules
var ratingController = require('../../controllers/rating');
var RatingModel = require('../../models/rating');

describe('My rating controller', function(){

  before(function(){
    ratingController = new ratingController();
  })

  beforeEach(function(done) {
    RatingModel.create({rating: 50},function(){
      RatingModel.create({rating: 80},function(){
        done();
      })
    })
  });

  it('can get all ratings',function(done) {
    ratingController.getAll(function(err,users){
      expect(users).to.have.lengthOf(2);
      done();
    });
  });

  it('can get a rating from its id',function(done) {
    // This query ensures the test is not passing because we access the first rating
    RatingModel.find({}).skip(1).limit(1).exec(function (err, docs) {
      var ratingId = docs[0]._id;
      ratingController.get(ratingId,function(err, rating) {
        expect(rating).to.have.property('_id');
        expect(String(rating._id)).to.eql(String(ratingId));
        done();
      });
    });
  });

});
