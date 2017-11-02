'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('yourBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

var getUser = function() {
  if (!$scope.curUser._id) {
    console.error("no user found");
    setTimeout(getUser, 100);
  } else {
    $scope.clientName = $scope.curUser.name;
    $scope.id = $scope.curUser._id;
  }
};

$scope.curUser = Auth.getCurrentUser();
getUser();

$scope.getEvents = function(){
  if (!$scope.id)
    setTimeout($scope.getEvents, 100);
  else
    Events.getByUser($scope.id)
      .then(function(response) {
        $scope.events = response.data;
      }, function(error) {
        //do something
    });
};




    // Pi chart for budget
    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 300,
        x: function(d){return d.title},
        y: function(d){return d.amount;},
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };




}]);
