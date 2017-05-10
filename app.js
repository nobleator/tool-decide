// app.js
//==============================================================================
//

var dtApp = angular.module('dtApp', []);
//TODO: Expand for sub-attributes

dtApp.controller('mainCtrl', function($scope) {
  // Set starting slides visibility
  var initialize = function() {
    $scope.visible = {type: true,
                      auto: false,
                      manual: false,
                      topic: false,
                      attributes: false,
                      weights: false,
                      alternatives: false,
                      results: false};
    $scope.data = {name: '',
                  children: [],
                  weights: {},
                  alternatives: []};
    $scope.alternatives = [];
    $scope.alternativeName = '';
    $scope.alternativeCost = '';
    $scope.vals = {};
  };

  initialize();

  // Begin automatic path
  $scope.automatic = function () {
    // TODO: Fix temporary data for topic choices
    $scope.topicSelection = null;
    $scope.autoTopics = [{name: 'car',
                          criteria: ['MPG','Speed','Comfort']},
                        {name: 'home',
                          criteria: ['COL','Schools','Walkability']},
                        {name: 'job',
                          criteria: ['Training','Flexibility','Career advancement']}];

    $scope.visible.type = false;
    $scope.visible.auto = true;
    $scope.visible.topic = true;
  };
  // Begin manual path
  $scope.manual = function () {
    $scope.visible.type = false;
    $scope.visible.manual = true;
    $scope.visible.topic = true;
  };

  $scope.submitAutoTopic = function() {
    console.log($scope.topicSelection);
    $scope.data.name = $scope.topicSelection;

    $scope.visible.topic = false;
    $scope.visible.weights = true;
  }

  // On submit, set/change topic name
  $scope.submitManualTopic = function() {
    // data.name refers to the name field in the topic object
    // topicSelection refers to the ng-model directive
    $scope.data.name = $scope.topicSelection;
    $scope.topicSelection = '';
    // Change slide visibility
    $scope.visible.topic = false;
    $scope.visible.attributes = true;
  };
  // On submit, add attributes
  $scope.submitManualAttribute = function() {
    // topic.children refers to the children field in the topic object
    // manualAttributeName refers to the ng-model directive
    $scope.data.children.push(this.attributeName);
    $scope.attributeName = '';
  };
  // When finished adding attributes, set weights
  $scope.doneManualAttribute = function() {
    // Set list for iteration in weights
    $scope.elemList = [];
    var listLen = $scope.data.children.length;
    for (var i = 0; i < listLen; i++) {
      for (var j = i+1; j < listLen; j++) {
        var temp = {pair: {leftVal: $scope.data.children[i],
                          rightVal: $scope.data.children[j]},
                    indices: {leftInd: i, rightInd: j},
                    comparison: 0};
        $scope.elemList.push(temp);
      }
    }

    $scope.visible.attributes = false;
    $scope.visible.weights = true;
  };

  $scope.submitWeight = function() {
    // Set original weightMatrix with user inputs
    var listLen = $scope.data.children.length;
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
      $scope.data.weights[$scope.data.children[i]] = rowAvg[i];
    }

    $scope.vals = [];
    for (var i = 0; i < listLen; i++) {
      var temp = {name: $scope.data.children[i],
                  value: ''};
      $scope.vals.push(temp);
    }

    $scope.visible.weights = false;
    $scope.visible.alternatives = true;
  };

  $scope.submitManualAlternative = function() {
    //
    var newVals = {};
    for (var i = 0; i < $scope.vals.length; i++) {
      newVals[$scope.vals[i].name] = $scope.vals[i].value;
    }
    var tUtility = 0;
    var listLen = $scope.data.children.length;
    for (var i = 0; i < listLen; i++) {
      var child = $scope.data.children[i];
      tUtility += newVals[child]*$scope.data.weights[child];
    }
    var tCost = parseFloat($scope.manualAlternativeCost);
    var temp = {name: $scope.manualAlternativeName,
                utility: tUtility,
                cost: tCost,
                utilityPerCost: tUtility/tCost,
                values: newVals}
    $scope.data.alternatives.push(temp);
    $scope.manualAlternativeName = '';
    $scope.manualAlternativeCost = '';
    for (var i = 0; i < $scope.vals.length; i++) {
      $scope.vals[i].value = '';
    }
  };
  //
  $scope.doneManualAlternative = function() {
    var chartData = [];
    for (var i = 0; i < $scope.data.alternatives.length; i++) {
      // TODO: Better color generation
      // Generate a new random color for each alternative
      var color = 'rgba(';
      color += String(85*(i/$scope.data.alternatives.length)) + ',';
      color += String(85*(i/$scope.data.alternatives.length)) + ',';
      color += String(255*(i/$scope.data.alternatives.length)) + ',';
      color += '0.5)';
      var tempData = {label: $scope.data.alternatives[i].name,
                      data: [{
                        x: $scope.data.alternatives[i].cost,
                        y: $scope.data.alternatives[i].utility}],
                      backgroundColor: color
                      };
      chartData.push(tempData);
    }

    // TODO: Draw Pareto curve
    var scatterChart = new Chart('resultsChart', {
      type: 'scatter',
      data: {
        datasets: chartData
      },
      options: {
        title: {
          display: true,
          text: 'Utility vs Cost'
        },
        scales: {
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Utility'
            }
          }],
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Cost'
            }
          }]
        }
      }
    });
    // TODO: Style results table
    // Starting sorting field and direction
    $scope.orderByField = 'name';
    $scope.ascending = false;

    $scope.visible.alternatives = false;
    $scope.visible.results = true;
  };
  //
  $scope.doneResult = function() {
    // TODO: Save results somewhere to access later? -> v2.0
    // Zero out fields and start over
    initialize();
  };
});
