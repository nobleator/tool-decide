// controllers/main.js
//==============================================================================
//

var app = angular.module('myApp', []);

app.controller('topicCtrl', function($scope, $http) {
  $scope.data = {};
  $scope.submit = function() {
    console.log($scope.data);
    //Pass data to backend
    $http.post('/topic', $scope.data).
      success(function(elem) {
        console.log('POST success');
      }).
      error(function(elem) {
        console.error('POST failure');
      });

    //Shift active div
  };
  $scope.display = function() {
    return($scope.data);
    //return($scope.data.lastName + ', ' + $scope.data.firstName);
  };
});
