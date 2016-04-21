require('../utils');
var expect = require('chai').expect
var Movie = require('../../models/movie');
var User = require('../../models/user.js');

describe('My user model', function() {

  it('gets created', function(done) {
    var jason = new User({
      profile:{
        firstName:'Jason',
        lastName:'Duff'
      }
    });

    User.create(jason, function(err,newUser) {
      newUser.save(function(err){
        expect(newUser).to.be.an('object');
        expect(newUser).to.have.property('_id');
        expect(newUser).to.have.deep.property('profile.firstName','Jason');
        expect(newUser).to.have.deep.property('profile.lastName','Duff');
        done();
      });
    });
  });

  it('can be found in the user registry',function(done){
    var jason = new User({
      profile:{
        firstName:'Jason',
        lastName:'Duff'
      }
    });

    User.create(jason, function(err,newUser) {
      newUser.save(function(err){
        User.findOne({},function(err,doc) {
          expect(doc).to.have.deep.property('profile.firstName','Jason');
          expect(doc).to.have.deep.property('profile.lastName','Duff');
          done();
        });
      });
    });
  });

  it('can be removed', function(done) {
    var morgane = new User({
      profile:{
        firstName:'Morgane',
        lastName:'Widmer'
      }
    });

    User.create(morgane, function(err,newUser) {
      newUser.save(function(err){
        User.count({},function(err,nUsers) {
          expect(nUsers).to.equal(1);
          User.remove({},function(err){
            User.count({},function(err,nUsers) {
              expect(nUsers).to.equal(0);
              done();
            });
          });
        });
      });
    });
  });
});
