//Note: only one level of decomposition currently allowed.
//Need to expand attribute -> sub-attributes/metrics

//==============================================================================

var math = require('mathjs');
class Topic {
  constructor(name) {
    this.name     = name;
    this.children = [];
  }
  addAttribute(att) {
    //Get user input -> metrics
    var metrics = ['m1', 'm2', 'm3'];
    this.attributesList[att] = metrics;
  }
  setWeight() {
    var attComparison = [];
    for (var key in this.attributesList) {
      var metComparison = [];
      if (this.attributesList.hasOwnProperty(key)) {
        var attribute = key;
        attComparison.push(key);
        var metricsList = this.attributesList[key];
        for (var i = 0; i < metricsList.length; i++) {
          metComparison.push(metricsList[i]);
        }
        var metricsCalculated = this.calcWeights(metComparison);
        for (var i = 0; i < metricsList.length; i++) {
          this.weightsList[metricsList[i]] = metricsCalculated[i];
        }
      }
    }
    var attributesCalculated = this.calcWeights(attComparison);
    var i = 0;
    for (var key in this.attributesList) {
      if (this.attributesList.hasOwnProperty(key)) {
        this.weightsList[key] = attributesCalculated[i];
      }
      i++;
    }
  }
  calcWeights(compList) {
    var retVal = [];
    for (var i = 0; i < compList.length; i++) {
      retVal.push(1/(compList.length));
    }
    return retVal;
  }
  
}

module.exports = Topic;
