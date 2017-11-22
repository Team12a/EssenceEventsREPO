'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('viewBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

$scope.event = $stateParams.eventId;
if (!$stateParams.eventId){
  $state.go('client.yourBudget');
}

var getUser = function() {
  if (!$scope.curUser._id) {
    setTimeout(getUser, 100);
  } else {
    $scope.clientName = $scope.curUser.name;
    $scope.id = $scope.curUser._id;
  }
};

$scope.curUser = Auth.getCurrentUser();
getUser();

//$scope.useridlauren = 0;
$scope.getEvents = function(){
  if (!$scope.id) {
    setTimeout($scope.getEvents, 100);
    $state.go('client.yourBudget');
  } else {
      Events.getOne($stateParams.eventId)
        .then(function(response) {
          $scope.event = response.data;
        }, function(error) {
          console.error(error);
        });
  }
};

$scope.load = function() {

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

  };

  $scope.amount = 0.0;
  $scope.title = "";

  $scope.addExpenditure = function(){
    console.log('expenditure added');
    console.log('budget: ' + $scope.event.budget);
    $scope.event.budget.push({
      'amount': $scope.amount,
      'title' : $scope.title,
      'user': 'client'
    });
    $scope.amount = 0.0;
    $scope.title = '';
  };

  $scope.editExpenditure = function(expense){
    console.log('user: ' + expense.user );
    if (expense.user == 'client'){
      console.log('can edit expense');
    } else {
      console.log('cannot edit an expense that you did not input');
    }
  };

  $scope.deleteExpenditure = function(expense){
    console.log('user: ' + expense.user );
    if (expense.user == 'client'){
      console.log('can delete expense');
    } else {
      console.log('cannot delete an expense that you did not input');
    }
  };


}]);
