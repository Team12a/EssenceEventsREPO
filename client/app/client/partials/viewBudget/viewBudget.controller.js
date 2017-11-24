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

var updateEvent = function($event){
  if(!$event){
    setTimeout($scope.updateEvent, 100);
    // $state.go('client.yourBudget')
    console.log('no event to update');
  } else {
    Events.update($event)
          .then(function(response){
            console.log('updated');
            console.log(response);
          }, function(error){
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
    updateEvent($scope.event);
    $scope.amount = 0.0;
    $scope.title = '';
  };

  $scope.deleteExpenditure = function(expense){
    console.log('delete expenditure');
    //console.log('budget before: ' + $scope.event.budget);
    $scope.event.budget.pop();
    //console.log('budget after pop: ' + $scope.event.budget);
    updateEvent($scope.event)
  };

  $scope.canEdit = function(expense){
    //console.log('user: ' + expense.user );
    if (expense.user == 'client'){
      //console.log('can edit expense');
      return true;
    } else {
      //console.log('cannot edit an expense that you did not input');
      return false;
    }
  };

  $scope.canDelete = function(expense){
    //console.log('user: ' + expense.user );
    if (expense.user == 'client'){
      //console.log('can delete expense');
      return true;
    } else {
      //console.log('cannot delete an expense that you did not input');
      return false;
    }
  };

  $scope.editingExpense = false;
  $scope.editExpenditure = function(){
    $scope.editingExpense = true;
  };

}]);
