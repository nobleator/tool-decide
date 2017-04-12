//==============================================================================
//
var math = require('mathjs');
class Topic {
  constructor(name) {
    console.log('in Topic constructor...');
    this.name     = name;
    this.children = {};
    this.weights  = {};
  }
  addChild(parent, child) {
    console.log('in addChild...');
    if (parent in this.children) {
      this.children[parent].push(child);
    }
    else {
      this.children[parent] = [child];
    }
  }
  setWeights() {
    console.log('in setWeights...');
    for (var child in this.children) {
      this.calcWeights(this.children[child]);
      /*for (var i = 0; i < this.topic.children[child].length; i++) {
        if (!(this.topic.children[child][i] in this.topic.children)) {
          calcWeights(this.topic.children[child]);
        }
      }*/
    }
  }
  calcWeights(compList) {
    console.log('in calcWeights...');
    //Generate pairwise comparisons, Analytic Hierarchy Process (AHP)
    var compListLen = compList.length;
    var weightMatrix = math.ones(compListLen, compListLen);
    console.log('weightMatrix pre-input: ');
    console.log(weightMatrix);

    for (var i = 0; i < compListLen; i++) {
      for (var j = i+1; j < compListLen; j++) {
        //Diagonals can be skipped because default matrix is ones
        var userInput = 7; //TODO
        //Get user input and set matrix value
        weightMatrix['_data'][i][j] = userInput;
        //Set inverse entries (below the diagonal) as 1/input
        weightMatrix['_data'][j][i] = 1/userInput;
      }
    }
    console.log('weightMatrix post-input: ');
    console.log(weightMatrix);

    //Normalize by columns
    //Find column sums
    var colSum = [];
    for (var i = 0; i < compListLen; i++) {
      var tempArr = math.subset(weightMatrix,
                                math.index(math.range(0, compListLen), i));
      colSum[i] = math.sum(tempArr);
    }
    console.log('colSum: ');
    console.log(colSum);

    //Divide each cell by it's associated column sum
    var normWeightMatrix = math.ones(compListLen, compListLen);
    for (var i = 0; i < compListLen; i++) {
      for (var j = 0; j < compListLen; j++) {
        var newVal = weightMatrix['_data'][i][j]/colSum[j];
        normWeightMatrix['_data'][i][j] = newVal;
      }
    }
    console.log('normWeightMatrix: ');
    console.log(normWeightMatrix);

    //Find row averages
    //Row average = attribute weight
    //Assign weights to children Objects (in compList)
    var rowAvg = [];
    for (var i = 0; i < compListLen; i++) {
      var tempArr = normWeightMatrix['_data'][i];
      rowAvg[i] = math.mean(tempArr);
      this.weights[compList[i]] = rowAvg[i];
    }
    console.log('this.weights: ');
    console.log(this.weights);

  }
}

module.exports = Topic;
