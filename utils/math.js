exports.fibonnacciTerm = function (i) {
  if(i == 0) return 1;
  if(i == 1) return 1;
  return exports.fibonnacciTerm(i-1)+exports.fibonnacciTerm(i-2);
};

exports.stdev = function (terms) {
  if(terms.length == 0) return undefined;
  var variance = exports.variance(terms);
  return Math.sqrt(variance);
};

exports.variance = function (terms) {
  if(terms.length == 0) return undefined;
  var mean = exports.mean(terms);
  var squareDiffs = terms.map(function(x) {
    var diff = x - mean;
    var sqr = diff * diff;
    return sqr;
  });
  return exports.mean(squareDiffs);
};

exports.mean = function (terms) {
  if(terms.length == 0) return undefined;
  return exports.sum(terms) / terms.length;
};

exports.sum = function (terms) {
  return terms.reduce(function(accumulator, x) {
    return accumulator + x;
  },0);
};
