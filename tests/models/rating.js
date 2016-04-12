require('../utils');
var expect = require('chai').expect,
    promise = require('promise');

var Rating = require('../../models/rating');

describe('My rating model', function() {

  beforeEach(function(done){
    var jasonInceptionRating = new Rating({
      user: {
        _id: 1234
      },
      movie: {
        _id: 8765
      },
      rating: 96
    });

    Rating.create(jasonInceptionRating, function(err,newRating) {
      newRating.save(function(err){
        done();
      });
    });
  });

  it('gets created with all its properties', function(done) {
    var fakeUserId = 1234;
    var fakeMovieId = 4321;
    var rating = 92;

    var jasonInterstellarRating = new Rating({
      user: {
        _id: fakeUserId
      },
      movie: {
        _id: fakeMovieId
      },
      rating: rating
    });

    Rating.create(jasonInterstellarRating, function(err,newRating) {
      newRating.save(function(err){
        expect(newRating).to.be.an('object');
        expect(newRating).to.have.property('_id');
        expect(newRating).to.have.deep.property('user._id',fakeUserId);
        expect(newRating).to.have.deep.property('movie._id',fakeMovieId);
        expect(newRating).to.have.property('rating',rating);
        done();
      });
    });
  });

  it('can be found in the journal',function(done){
    Rating.findOne({},function(err,doc) {
      expect(doc).to.have.deep.property('user._id',1234);
      expect(doc).to.have.deep.property('movie._id',8765);
      expect(doc).to.have.property('rating',96);
      done();
    });
  });

  it('can be updated in journal',function(done){
    Rating.findOne({},function(err,docBefore) {
      expect(docBefore).to.have.deep.property('user._id',1234);
      expect(docBefore).to.have.deep.property('movie._id',8765);
      expect(docBefore).to.have.property('rating',96);
      docBefore.rating = 100;
      docBefore.save(function(err){
        Rating.findOne({},function(err,docAfter) {
          expect(docAfter).to.have.deep.property('user._id',1234);
          expect(docAfter).to.have.deep.property('movie._id',8765);
          expect(docAfter).to.have.property('rating',100);
          done();
        });
      });
    });
  });

  it('can be removed from the journal', function(done) {
    Rating.count({},function(err,nRatings) {
      expect(nRatings).to.equal(1);
      Rating.remove({},function(err){
        Rating.count({},function(err,nRatings) {
          expect(nRatings).to.equal(0);
          done();
        });
      });
    });
  });
});
