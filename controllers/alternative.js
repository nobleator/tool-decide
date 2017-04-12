//==============================================================================
//
var math = require('mathjs');
class Alternative {
  constructor(topic, name, cost) {
    console.log('in Alternative constructor...');
    this.topic    = topic;
    this.name     = name;
    this.values   = {};
    this.cost     = cost;
  }
  setValues() {
    //Find lowest-level elements only
    console.log('in setValues...');
    for (var child in this.topic.children) {
      for (var i = 0; i < this.topic.children[child].length; i++) {
        if (!(this.topic.children[child][i] in this.topic.children)) {
          this.values[this.topic.children[child][i]] = 20.0; //TODO: User input
        }
      }
    }
  }
  calcUtility() {
    console.log('in calcUtility...');
    var secondPass = [];
    for (var child in this.topic.children) {
      var childUtility = -1;
      for (var i = 0; i < this.topic.children[child].length; i++) {
        if (!(this.topic.children[child][i] in this.topic.children)) {
          var tVal = this.values[this.topic.children[child][i]];
          var tWgt = this.topic.weights[this.topic.children[child][i]];
          childUtility += (tVal*tWgt);
        }
        else {
          console.log(child + ' has children...');
          secondPass.push(child); //TODO: Push only if not already in array
        }
      }
      console.log('childUtility for ' + child + ': ');
      console.log(childUtility);
      this.values[child] = childUtility;
    }
    console.log(secondPass);
    while (secondPass.length > 0) {
      console.log('in secondPass...');
      var tVar = secondPass.pop();
      var tUtility = -1;
      for (var i = 0; i < this.topic.children[tVar].length; i++) {
        var tVal = this.values[this.topic.children[tVar][i]];
        var tWgt = this.topic.weights[this.topic.children[tVar][i]];
        tUtility += (tVal*tWgt);
      }
      this.values[tVar] = tUtility;
    }
  }
}

module.exports = Alternative;
