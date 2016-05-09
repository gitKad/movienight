var expect = require('chai').expect;
var mathUtility = require('../../utils/math');
var fibonnacciTerm = mathUtility.fibonnacciTerm;
var mean = mathUtility.mean;
var stdev = mathUtility.stdev;

describe('My math utilities', function() {
  it('can tell you what\'s the \'n\' term of the fibonnacci sequence', function(done) {
    expect(fibonnacciTerm(0)).to.be.ok;
    expect(fibonnacciTerm(0)).to.be.equal(1);
    expect(fibonnacciTerm(1)).to.be.equal(1);
    expect(fibonnacciTerm(2)).to.be.equal(2);
    expect(fibonnacciTerm(3)).to.be.equal(3);
    expect(fibonnacciTerm(4)).to.be.equal(5);
    done();
  });

  it('can tell you the mean value of an array', function(done) {
    var array = [];
    expect(mean(array)).to.be.undefined;

    array = [1,2,3];
    expect(mean(array)).to.be.ok;
    expect(mean(array)).to.be.equal(2);

    array = [0];
    expect(mean(array)).to.not.be.null;
    expect(mean(array)).to.not.be.NaN;
    expect(mean(array)).to.not.be.undefined;
    expect(mean(array)).to.be.equal(0);
    done();
  });

  it('can tell you the stdev value of an array', function(done) {
    var array = [];
    expect(stdev(array)).to.be.undefined;

    array = [2,4,4,4,5,5,7,9];
    expect(stdev(array)).to.be.ok;
    expect(stdev(array)).to.be.equal(2);

    array = [0,0];
    expect(stdev(array)).to.not.be.null;
    expect(stdev(array)).to.not.be.NaN;
    expect(stdev(array)).to.not.be.undefined;
    expect(stdev(array)).to.be.equal(0);

    array = [0];
    expect(stdev(array)).to.not.be.null;
    expect(stdev(array)).to.not.be.NaN;
    expect(stdev(array)).to.not.be.undefined;
    expect(stdev(array)).to.be.equal(0);
    done();
  });
});
