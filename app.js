// app.js
//==============================================================================
//

var dtApp = angular.module('dtApp', []);
//TODO: Expand for sub-attributes

dtApp.controller('mainCtrl', function($scope) {
  console.log('In mainCtrl...');
  $scope.topic = {name: '', children: [], weights: {}};
  /*
  $scope.alternatives = [{alternative_name: name,
                        utility: 0,
                        cost: 0,
                        values: {child_name: value}}]
  */
  $scope.alternatives = [];
  $scope.alternativeName = '';
  $scope.alternativeCost = '';
  $scope.vals = {};

  // Set starting values for showing/hiding divs
  $scope.showTopic = true;
  $scope.showAttributes = false;
  $scope.showWeights = false;
  $scope.showAlternatives = false;
  $scope.showResults = false;

  // On submit, set/change topic name
  $scope.submitTopic = function() {
    // topic.name refers to the name field in the topic object
    // topicName refers to the ng-model directive
    $scope.topic.name = this.topicName;
    $scope.topicName = '';
    // Change visibility
    $scope.showTopic = false;
    $scope.showAttributes = true;
  };
  // On submit, add attributes
  $scope.submitAttribute = function() {
    // topic.children refers to the children field in the topic object
    // attributeName refers to the ng-model directive
    $scope.topic.children.push(this.attributeName);
    $scope.attributeName = '';
  };
  // When finished adding attributes, set weights
  $scope.doneAttribute = function() {
    // Set list for iteration in weights
    $scope.elemList = [];
    for (var i = 0; i < $scope.topic.children.length; i++) {
      for (var j = i+1; j < $scope.topic.children.length; j++) {
        var temp = {pair: {leftVal: $scope.topic.children[i],
                          rightVal: $scope.topic.children[j]},
                    indices: {leftInd: i, rightInd: j},
                    comparison: 0};
        $scope.elemList.push(temp);
      }
    }

    $scope.showAttributes = false;
    $scope.showWeights = true;
  };

  $scope.submitWeight = function() {
    // Set original weightMatrix with user inputs
    var listLen = $scope.topic.children.length;
    var weightMatrix = math.ones(listLen, listLen);
    for (var i = 0; i < $scope.elemList.length; i++) {
      var indi = $scope.elemList[i].indices.leftInd;
      var indj = $scope.elemList[i].indices.rightInd;
      var userInput = $scope.elemList[i].comparison;
      weightMatrix['_data'][indi][indj] = userInput;
      // TODO: Restrict input to 1-9?
      if (userInput == 0) {
        weightMatrix['_data'][indj][indi] = 1000;
      }
      else {
        weightMatrix['_data'][indj][indi] = 1/userInput;
      }
    }
    //Normalize by columns
    //Find column sums
    var colSum = [];
    for (var i = 0; i < listLen; i++) {
      var tempArr = math.subset(weightMatrix,
                                math.index(math.range(0, listLen), i));
      colSum[i] = math.sum(tempArr);
    }
    //Divide each cell by it's associated column sum
    var normWeightMatrix = math.ones(listLen, listLen);
    for (var i = 0; i < listLen; i++) {
      for (var j = 0; j < listLen; j++) {
        var newVal = weightMatrix['_data'][i][j]/colSum[j];
        normWeightMatrix['_data'][i][j] = newVal;
      }
    }
    //Find row averages
    //Row average = attribute weight
    //Assign weights to children Objects (in compList)
    var rowAvg = [];
    for (var i = 0; i < listLen; i++) {
      var tempArr = normWeightMatrix['_data'][i];
      rowAvg[i] = math.mean(tempArr);
      $scope.topic.weights[$scope.topic.children[i]] = rowAvg[i];
    }

    // TODO: Issue with ng-repeat and objects vs lists
    $scope.vals = [];
    for (var i = 0; i < listLen; i++) {
      var temp = {name: $scope.topic.children[i],
                  value: ''};
      $scope.vals.push(temp);
    }

    $scope.showWeights = false;
    $scope.showAlternatives = true;
  };

  $scope.submitAlternative = function() {
    //
    //$scope.alternativeName = '';
    //$scope.alternativeCost = 0;
    //$scope.vals = {};
    var newVals = {};
    for (var i = 0; i < $scope.vals.length; i++) {
      newVals[$scope.vals[i].name] = $scope.vals[i].value;
    }
    // TODO: Calculate utility
    var tUtility = 0;
    var listLen = $scope.topic.children.length;
    for (var i = 0; i < listLen; i++) {
      var child = $scope.topic.children[i];
      tUtility += newVals[child]*$scope.topic.weights[child];
    }

    var temp = {name: $scope.alternativeName,
                utility: tUtility,
                cost: $scope.alternativeCost,
                values: newVals}
    $scope.alternatives.push(temp);
    $scope.alternativeName = '';
    $scope.alternativeCost = '';
    for (var i = 0; i < $scope.vals.length; i++) {
      $scope.vals[i].value = '';
    }
  };
  //
  $scope.doneAlternative = function() {
    // TODO: Calculate results and display
    $scope.showAlternatives = false;
    $scope.showResults = true;
  };
  //
  $scope.doneResult = function() {
    //
    $scope.showResults = false;
    $scope.showTopic = true;
  };
});
