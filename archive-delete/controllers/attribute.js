//Note: only one level of decomposition currently allowed.
//Need to expand attribute -> sub-attributes/metrics

//==============================================================================

var math = require('mathjs');
class Attribute {
  constructor(name, parent){
    this.name = name;
    this.parent = parent;
    this.children = [];
    this.weight = null;
    this.direction = 'positive'; //TODO
  }
  addChild(child) {
    this.children.push(child);
  }
  setWeight() {
    //for all children
    //add to comparison list and calculate weights (with user input)
    //call setweight on each child
    var childLen = this.children.length;
    if (childLen > 0) {
      console.log('inside setWeight');
      var comparisonList = [];
      for (var i = 0; i < childLen; i++) {
        this.calcWeights(this.children);
        this.children[i].setWeight();
      }
    }
    else {
      console.log('no children');
    }
  }
  calcWeights(compList) {
    //Generate pairwise comparisons, Analytic Hierarchy Process (AHP)
    var compListLen = compList.length;
    var weightMatrix = math.ones(compListLen, compListLen);
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
    //Normalize by columns
    //Find column sums
    var colSum = [];
    for (var i = 0; i < compListLen; i++) {
      var tempArr = math.subset(weightMatrix,
                                math.index(math.range(0, compListLen), i));
      colSum[i] = math.sum(tempArr);
    }
    //Divide each cell by it's associated column sum
    var normWeightMatrix = math.ones(compListLen, compListLen);
    for (var i = 0; i < compListLen; i++) {
      for (var j = 0; j < compListLen; j++) {
        var newVal = weightMatrix['_data'][i][j]/colSum[i];
        normWeightMatrix['_data'][i][j] = newVal;
      }
    }
    //Find row averages
    //Row average = attribute weight
    //Assign weights to children Objects (in compList)
    var rowAvg = [];
    for (var i = 0; i < compListLen; i++) {
      var tempArr = normWeightMatrix['_data'][i];
      rowAvg[i] = math.mean(tempArr);
      compList[i].weight = rowAvg[i];
    }
  }
}

module.exports = Attribute;
