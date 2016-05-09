require('../testUtils');
var expect = require('chai').expect;
var models = require('../../models');
var Director = models.Director;

describe('My director model', function() {

  beforeEach(function(done) {
    Director.create({name: 'Christopher Nolan'})
    .then(function() {
      done();
    }).catch(function(err) {
      expect(err).to.be.null;
      done();
    });;
  });

  it('can be found in the database', function(done){
    Director.findOne({})
    .then(function(director) {
      expect(director).to.be.ok;
      expect(director).to.have.property('name','Christopher Nolan');
      done();
    });
  });

  it('gets created with all its properties', function(done) {
    var testName = 'Lilly Wachowski';

    Director.create({
      name: testName
    })
    .then(function() {
      return Director.findAll({where:{name:testName}})
    })
    .then(function (directors) {
      expect(directors).to.be.ok;
      expect(directors).to.have.lengthOf(1);
      expect(directors[0]).to.have.property('name',testName);
      done();
    });
  });

  it('can be removed from the database', function(done) {
    var nDirectorsBefore;

    Director.findAndCountAll()
    .then(function(result) {
      nDirectorsBefore = result.count;
      return result.rows[0].destroy();
    })
    .then(function() {
      return Director.count();
    })
    .then(function(c) {
      expect(c).to.equal(nDirectorsBefore-1);
      done();
    });
  });

  it('directed movies');
});
