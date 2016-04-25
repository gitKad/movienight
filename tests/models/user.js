require('../utils');
var expect = require('chai').expect;
var User = require('../../models/user');

describe('My user model', function() {

  before(function(done) {
    User.sync({force: true})
    .then(function() {
      done();
    })
    .catch(function(err){
      console.log(err);
    });
  });

  beforeEach(function(done) {
    User.create({
      firstName: 'Jason',
      lastName: 'Duff'
    })
    .then(function() {
      done();
    });
  });

  it('can be found in the database', function(done){
    User.findOne({})
    .then(function(user) {
      expect(user).to.be.ok;
      expect(user).to.have.property('firstName','Jason');
      expect(user).to.have.property('lastName','Duff');
      done();
    });
  });

  it('gets created with all its properties', function(done) {
    var testFirstName = 'Morgane';
    var testLastName = 'Widmer';

    User.create({
      firstName: testFirstName,
      lastName: testLastName
    })
    .then(function() {
      User.findAll({where:{firstName: testFirstName, lastName: testLastName}})
      .then(function (users) {
        expect(users).to.be.ok;
        expect(users).to.have.lengthOf(1);
        expect(users[0]).to.have.property('firstName',testFirstName);
        expect(users[0]).to.have.property('lastName',testLastName);
        done();
      });
    });
  });

  it('can be removed from the database', function(done) {
    User.findAndCountAll()
    .then(function(result) {
      var nUsersBefore = result.count;
      result.rows[0].destroy()
      .then(function() {
        User.count()
        .then(function(c) {
          expect(c).to.equal(nUsersBefore-1);
          done();
        });
      });
    });
  });
});
