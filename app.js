// app.js
//==============================================================================
//

var dtApp = angular.module('dtApp', []);
// TODO: Expand for sub-attributes
/* TODO: Restructure data

criteria = {topicName: [criteriaName, ...], ...}
criteriaWeights = {criteriaName: weight, ...}
criteriaChildren = {criteriaName: [children, ...], ...}

alternatives = {topicName: [alternativeName, ...], ...}
alternativeCosts = {alternativeName: cost, ...}
alternativeValues = {alternativeName: {criteriaName: value, ...}, ...}

Switch to bracket notation?
*/
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
    $scope.tempChildren = {};
    $scope.alternativeName = '';
    $scope.alternativeCost = '';
    $scope.vals = {};
  };

  initialize();

  $scope.back = function(currentSlide) {
    // TODO: Reset variables on back (depending on the slide)
    if (currentSlide == 'topic'){
      initialize();
      $scope.visible.topic = false;
      $scope.visible.type = true;
    } else if(currentSlide == 'attributes') {
      $scope.data.name = '';
      $scope.data.children = [];
      $scope.tempChildren = {};
      $scope.visible.attributes = false;
      $scope.visible.topic = true;
    } else if(currentSlide == 'weights') {
      $scope.data.children = [];
      $scope.visible.weights = false;
      $scope.visible.attributes = true;
    } else if(currentSlide == 'alternatives') {
      $scope.data.alternatives = [];
      $scope.visible.alternatives = false;
      $scope.visible.weights = true;
    } else if(currentSlide == 'results') {
      $scope.visible.results = false;
      if ($scope.visible.auto) {
        $scope.data.alternatives = [];
        $scope.visible.weights = true;
      } else {
        $scope.visible.alternatives = true;
      }
    }
  };
  // Begin automatic path. Get auto-generated data.
  $scope.automatic = function () {
    // TODO: Temporary data for topic choices
    $scope.autoTopics = [{name: 'Car',
                          criteria: ['MPG',
                                    'Top speed',
                                    'Acceleration',
                                    'Handling',
                                    'Comfort',
                                    'Cargo space']},
                        {name: 'Home',
                          criteria: ['Schools',
                                    'Walkability',
                                    'Culture',
                                    'Crime rates',
                                    'Job opportunities',
                                    'Climate']},
                        {name: 'Job',
                          criteria: ['Training',
                                    'Flexible remote work',
                                    'Career advancement',
                                    'Casual environment',
                                    'Employee stock',
                                    'Personal office']}
                        ];
    $scope.autoAlternatives = [{topic: 'Car',
                                alternatives: [{name: 'Mustang',
                                                cost: 35000,
                                                'MPG': 23,
                                                'Top speed': 150,
                                                'Acceleration': 20,
                                                'Handling': 10,
                                                'Comfort': 5,
                                                'Cargo space': 5},
                                              {name: 'F-150',
                                                cost: 50000,
                                                'MPG': 12,
                                                'Top speed': 70,
                                                'Acceleration': 10,
                                                'Handling': 5,
                                                'Comfort': 8,
                                                'Cargo space': 50},
                                              {name: 'Tesla',
                                                cost: 60000,
                                                'MPG': 200,
                                                'Top speed': 120,
                                                'Acceleration': 18,
                                                'Handling': 15,
                                                'Comfort': 20,
                                                'Cargo space': 15},
                                              {name: 'CR-V',
                                                cost: 30000,
                                                'MPG': 18,
                                                'Top speed': 90,
                                                'Acceleration': 14,
                                                'Handling': 7,
                                                'Comfort': 10,
                                                'Cargo space': 30}]},
                              {topic: 'Home',
                              alternatives: [{name: 'Portland',
                                              cost: 90000,
                                              'Schools': 7,
                                              'Walkability': 8,
                                              'Culture': 10,
                                              'Crime rates': 10,
                                              'Job opportunities': 7,
                                              'Climate': 9},
                                            {name: 'Seattle',
                                              cost: 100000,
                                              'Schools': 10,
                                              'Walkability': 7,
                                              'Culture': 7,
                                              'Crime rates': 9,
                                              'Job opportunities': 9,
                                              'Climate': 8},
                                            {name: 'San Francisco',
                                              cost: 130000,
                                              'Schools': 9,
                                              'Walkability': 9,
                                              'Culture': 9,
                                              'Crime rates': 8,
                                              'Job opportunities': 10,
                                              'Climate': 10},
                                            {name: 'Austin',
                                              cost: 80000,
                                              'Schools': 8,
                                              'Walkability': 6,
                                              'Culture': 8,
                                              'Crime rates': 7,
                                              'Job opportunities': 8,
                                              'Climate': 7}]},
                              {topic: 'Job',
                              alternatives: [{name: 'Google',
                                              cost: 150000,
                                              'Training': 10,
                                              'Flexible remote work': 10,
                                              'Career advancement': 9,
                                              'Casual environment': 10,
                                              'Employee stock': 7,
                                              'Personal office': 7},
                                            {name: 'Facebook',
                                              cost: 140000,
                                              'Training': 9,
                                              'Flexible remote work': 9,
                                              'Career advancement': 10,
                                              'Casual environment': 9,
                                              'Employee stock': 9,
                                              'Personal office': 8},
                                            {name: 'Amazon',
                                              cost: 125000,
                                              'Training': 7,
                                              'Flexible remote work': 8,
                                              'Career advancement': 7,
                                              'Casual environment': 7,
                                              'Employee stock': 10,
                                              'Personal office': 10},
                                            {name: 'Apple',
                                              cost: 130000,
                                              'Training': 8,
                                              'Flexible remote work': 7,
                                              'Career advancement': 8,
                                              'Casual environment': 8,
                                              'Employee stock': 8,
                                              'Personal office': 9}]}
                              ];

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
  // After a topic has been selected, generate an object with the criteria
  // of the selected topic as keys and a boolean as the value. Change the
  // boolean to select checkboxes.
  $scope.submitAutoTopic = function() {
    $scope.data.name = $scope.autoTopicSelection.name;
    for (var i = 0; i < $scope.autoTopics.length; i++) {
      if ($scope.autoTopics[i].name == $scope.data.name) {
        for (var j = 0; j < $scope.autoTopics[i].criteria.length; j++) {
          $scope.tempChildren[$scope.autoTopics[i].criteria[j]] = false;
        }
      }
    }

    $scope.visible.topic = false;
    $scope.visible.attributes = true;
  };

  // On submit, set/change topic name
  $scope.submitManualTopic = function() {
    // data.name refers to the name field in the topic object
    // topicSelection refers to the ng-model directive
    $scope.data.name = $scope.manualTopicSelection;
    $scope.manualTopicSelection = '';
    // Change slide visibility
    $scope.visible.topic = false;
    $scope.visible.attributes = true;
  };

  var elicitWeights = function() {
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
  };

  $scope.submitAutoAttribute = function() {
    for (var property in $scope.tempChildren) {
      if ($scope.tempChildren[property] == true) {
        $scope.data.children.push(property);
      }
    }
    elicitWeights();
    $scope.visible.attributes = false;
    $scope.visible.weights = true;
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
    elicitWeights();
    $scope.visible.attributes = false;
    $scope.visible.weights = true;
  };

  $scope.submitWeight = function() {
    // On submission of preferences, calculate specific weights
    // Set original weightMatrix with user inputs
    var listLen = $scope.data.children.length;
    var weightMatrix = math.ones(listLen, listLen);
    for (var i = 0; i < $scope.elemList.length; i++) {
      var indi = $scope.elemList[i].indices.leftInd;
      var indj = $scope.elemList[i].indices.rightInd;
      var userInput = $scope.elemList[i].comparison;
      weightMatrix['_data'][indi][indj] = userInput;
      // Catches zero division error
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
    if ($scope.visible.auto) {
      calculateUtility();
      graphResults();
      $scope.visible.results = true;
    } else {
      $scope.visible.alternatives = true;
    }
  };

  var calculateUtility = function() {
    // TODO: Set alternatives list as soon as 'Automatic' is selected?
    for (var i = 0; i < $scope.autoAlternatives.length; i++) {
      if ($scope.autoAlternatives[i].topic == $scope.data.name) {
        var alts = $scope.autoAlternatives[i].alternatives;
      }
    }
    for (var i = 0; i < alts.length; i++) {
      var tUtility = 0;
      var listLen = $scope.data.children.length;
      for (var j = 0; j < listLen; j++) {
        var attribute = $scope.data.children[j];
        tUtility += alts[i][attribute]*$scope.data.weights[attribute];
      }
      // TODO: temp.values?
      var temp = {name: alts[i].name,
                  utility: tUtility,
                  cost: alts[i].cost,
                  utilityPerCost: tUtility/alts[i].cost,
                  values: {}};
      $scope.data.alternatives.push(temp);
    }
  };

  var graphResults = function() {
    var chartData = [];
    for (var i = 0; i < $scope.data.alternatives.length; i++) {
      // Initialize RGB variables.
      var r, g, b;
      // Find position of color i on a linear color gradient from 0 to 1530.
      var x = (1530/$scope.data.alternatives.length)*(i+1);
      // There are three main color ranges, Red(0 to 510), Green(510 to 1020),
      // and Blue(1020 to 1530).
      // Each color range has 255 of its main color, plus some amount of the
      // other colors.
      // for example, the first half of Red also includes Blue by the function
      // Blue = 255-x
      // whereas the second half of Red includes Green by the function
      // Green = x-255
      if (x<510){
        r = 255;
        g = x - 255;
        b = 255 - x;
      }else if (x<1020) {
        r = 765 - x;
        g = 255;
        b = x - 765;
      }else {
        r = x - 1275;
        g = 1275 - x;
        b = 255;
      }
      // Remove decimals
      r = Math.floor(r);
      g = Math.floor(g);
      b = Math.floor(b);
      // Replace any negative rgb values with zeros
      r = (Math.sign(r)<0) ? 0 : r;
      g = (Math.sign(g)<0) ? 0 : g;
      b = (Math.sign(b)<0) ? 0 : b;
      // TODO: adjust opacity to accomodate large set of points
      var color ='rgba(' +String(r) + ',' +String(g) + ',' +String(b) + ',0.5)';
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
    graphResults();

    $scope.visible.alternatives = false;
    $scope.visible.results = true;
  };
  //
  $scope.doneResult = function() {
    // TODO: Save results somewhere to access later?
    // Zero out fields and start over
    initialize();
  };
  $scope.downloadResult = function() {
    // Parse data into CSV string 
    var csvString = 'data:text/csv;charset=utf-8,Name,Utility,Cost\n';
    for (var i = 0; i < $scope.data.alternatives.length; i++) {
      csvString += String($scope.data.alternatives[i].name) + ',';
      csvString += String($scope.data.alternatives[i].utility) + ',';
      csvString += String($scope.data.alternatives[i].cost);
      if ((i+1) < $scope.data.alternatives.length) {csvString += '\n'};
    };
    // create a hidden element "link" so that the download can have a name
    var encodedUri = encodeURI(csvString);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DecisionAnalysisData.csv"); //name file
    // add 'link' and click to initiate download
    document.body.appendChild(link); // Required for FireFox
    link.click();
    document.body.removeChild(link); // clean up
  };
});
