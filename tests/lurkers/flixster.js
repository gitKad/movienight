var expect = require('chai').expect,
    flixsterLurker = require('../../lurkers/flixster');

describe('My Flixster lurker',function() {

  before(function(done) {
    flixsterLurker = new flixsterLurker();
    done();
  });

  it('can retrieve a single movie rating from a user\'s flixster id', function(done) {
    flixsterLurker.getFlixsterUsersScores(789760392,1,function(response){
      var jsonResponse = JSON.parse(response);
      expect(jsonResponse).to.have.lengthOf(1);
      expect(jsonResponse[0]).to.have.deep.property('user.id',789760392);
      expect(jsonResponse[0]).to.have.deep.property('movie.id');
      done();
    });
  });

  it('can retrieve two movie ratings from a user\'s flixster id', function(done) {
    flixsterLurker.getFlixsterUsersScores(789760392,2,function(response){
      var jsonResponse = JSON.parse(response);
      expect(jsonResponse).to.have.lengthOf(2);
      expect(jsonResponse[0]).to.have.deep.property('user.id',789760392);
      expect(jsonResponse[1]).to.have.deep.property('user.id',789760392);
      expect(jsonResponse[0]).to.have.deep.property('movie.id');
      expect(jsonResponse[1]).to.have.deep.property('movie.id');
      done();
    });
  });

  it('can retrieve two movie a user wants to see from its flixster id', function(done) {
    flixsterLurker.getFlixsterUsersWantToSee(789760392,2,function(response){
      var jsonResponse = JSON.parse(response);
      expect(jsonResponse).to.have.lengthOf(2);
      expect(jsonResponse[0]).to.have.deep.property('user.id',789760392);
      expect(jsonResponse[1]).to.have.deep.property('user.id',789760392);
      expect(jsonResponse[0]).to.have.deep.property('movie.id');
      expect(jsonResponse[1]).to.have.deep.property('movie.id');
      expect(jsonResponse[0]).to.have.property('score','+');
      expect(jsonResponse[1]).to.have.property('score','+');
      done();
    });
  });

});
