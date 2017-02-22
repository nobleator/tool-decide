//Note: only one level of decomposition currently allowed.
//Need to expand attribute -> sub-attributes/metrics

//==============================================================================

var math = require('mathjs');
class Alternative {
  constructor(name, topic) {
    this.name       = name;
    this.parent     = topic;  //Topic object -> think linked lists
    this.values     = {};     //[{att1: [v1, [v11, v12]], ...}
    this.utility    = null;
    this.cost       = null;
  }
  getAttributes() {
    //for all of the children of this.parent
    //if child has children, recurse
    //else, add to values as keys with user input as values
    return null;
  }
  setUtility() {
    //for all of the children of this.parent
    //if child has children recurse
    //else, set value = sum(weight*value) for all children
    return null;
  }
}

module.exports = Alternative;
