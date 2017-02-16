//Note: only one level of decomposition currently allowed.
//Need to expand attribute -> sub-attributes/metrics

//==============================================================================

var math = require('mathjs');
class Alternative {
  constructor(name) {
    this.name       = name;
    this.attributes = [];   //[att1: value1, att2: value2, ...]
    this.weights    = [];   //[att1: weight1, att2: weight2, ...]
    this.utility    = 0;
    this.cost       = 0;
  };
  setAttributes(attributes) {
    this.attributes = attributes;
  };
  setWeights() {
    //Generate pairwise comparisons, Analytic Hierarchy Process (AHP)
    var attLen = this.attributes.length;
    var weightMatrix = math.ones(attLen);
    for (var i = 0; i < attLen; i++) {
      var row = [];
      for (var j = 0; j < attLen; j++) {
        //Diagonals can be skipped because default matrix is ones
        if (i == j) {
          break;
        }
        //Set entries below the diagonal via 1/inverse
        if (j < i) {
          row[j] = 1/weightMatrix[j][i];
        }
        else {
          //Present to user, get input
          userInput = 7; //TODO
          weightMatrix[i][j] = userInput;
        }
      }
      weightMatrix[i] = row;
    }
    //Normalize by columns (?)
    var colSums = {};
    for (var i = 0; i < attLen; i++) {
      var tempArr = weightMatrix.subset(math.index([0, attLen], i));
      colSums[i] = sum(tempArr);
    }
    var normWeightMatrix = math.ones(attLen);
    for (var i = 0; i < attLen; i++) {
      for (var j = 0; j < attLen; j++) {
        normWeightMatrix[i][j] = weightMatrix[i][j]/colSums[i];
      }
    }
    //Find average of each row
    //Row average = attribute weight
    for (var i = 0; i < attLen; i++) {
      var tempArr = weightMatrix.subset(math.index(i, [0, attLen]));
      this.weights[attributes[i]] = avg(tempArr);
    }

  };
  setCost(cost) {
    this.cost = cost;
  };
};

module.exports = Alternative;
