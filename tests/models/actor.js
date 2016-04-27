require('../utils');
var expect = require('chai').expect;
var models = require('../../models');
var Actor = models.Actor;

describe('My actor model', function() {

  beforeEach(function(done) {
    Actor.create({name: 'Christopher Nolan'})
    .then(function() {
      done();
    });
  });

  it('can be found in the database', function(done){
    Actor.findOne({})
    .then(function(actor) {
      expect(actor).to.be.ok;
      expect(actor).to.have.property('name','Christopher Nolan');
      done();
    });
  });

  it('gets created with all its properties', function(done) {
    var testname = 'Lilly Wachowski';

    Actor.create({name: testname})
    .then(function() {
      return Actor.findAll({where:{name: testname}})
    })
    .then(function (actors) {
      expect(actors).to.be.ok;
      expect(actors).to.have.lengthOf(1);
      expect(actors[0]).to.have.property('name',testname);
      done();
    });
  });

  it('can be removed from the database', function(done) {
    var nActorMembersBefore;

    Actor.findAndCountAll()
    .then(function(result) {
      nActorMembersBefore = result.count;
      return result.rows[0].destroy();
    })
    .then(function() {
      return Actor.count();
    })
    .then(function(c) {
      expect(c).to.equal(nActorMembersBefore-1);
      done();
    });
  });
});
