'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('viewBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

// check to make sure there is an event passed in
$scope.eventId = $stateParams.eventId;
if (!$stateParams.eventId){
  $state.go('client.yourBudget');
} else {
  $scope.event = Events.getOne($stateParams.eventId);
}

// gets the user tied to the event
var getUser = function() {
  if (!$scope.curUser._id) {
    setTimeout(getUser, 100);
  } else {
    $scope.clientName = $scope.curUser.name;
    $scope.id = $scope.curUser._id;
  }
};

// calls the user to get the current user
$scope.curUser = Auth.getCurrentUser();
getUser();

// retrieves the events for the user
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

// updates an event in the database
var updateEvent = function($event){
  if(!$event){
    setTimeout($scope.updateEvent, 100);
      $state.go('client.yourBudget')
  } else {
    Events.update($event)
          .then(function(response){
          }, function(error){
            console.error(error);
          });
  }
};

// functions that need to be run after the page loads
$scope.load = function() {

    // Pi chart for budget
    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 300,
        x: function(d){return d.title;},
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
  $scope.title = '';

  // to add an expenditure to the event budget
  $scope.addExpenditure = function(){
    if (!$scope.event.budgetGoal){
      $scope.event.budgetGoal = 0;
    }
    var currentCost = 0.0;
    for (var i = 1; i < $scope.event.budget.length; i++){
      currentCost += Number($scope.event.budget[i].amount);
    }
    currentCost += Number($scope.amount);
    $scope.currentCost = currentCost;
    if (currentCost > $scope.event.budgetGoal){
      $scope.errorMessage = 'Over Budget';
      $scope.addItemStyle = {
        'border-color': 'red',
        'border-width': '3px',
        'border-style': 'groove'
      };
    } else {
      $scope.errorMessage = '';
    }
    if (currentCost <= $scope.event.budgetGoal){
      $scope.event.budget[0].amount = $scope.event.budgetGoal - currentCost;
      $scope.errorMessage = '';
    } else {
      $scope.event.budget[0].amount = 0.0;
      $scope.errorMessage = 'Over Budget';
      $scope.addItemStyle = {
        'border-color': 'red',
        'border-width': '3px',
        'border-style': 'groove'
      };
    }
    $scope.event.budget.push({
      'amount': $scope.amount,
      'title' : $scope.title,
      'user': 'client'
    });
    updateEvent($scope.event);
    $scope.amount = 0.0;
    $scope.title = '';
  };

  // to delete an expenditure from the event budget
  $scope.deleteExpenditure = function(expense){

    if (!$scope.event.budgetGoal){
      $scope.event.budgetGoal = 0;
    }
    var currentCost = 0.0;
    for (var i = 1; i < $scope.event.budget.length; i++){
      currentCost += Number($scope.event.budget[i].amount);
    }
    var index = $scope.event.budget.indexOf(expense);
    currentCost -= Number($scope.event.budget[index].amount);
    $scope.currentCost = currentCost;
    if (currentCost > $scope.event.budgetGoal){
      $scope.errorMessage = 'Over Budget';
      $scope.addItemStyle = {
        'border-color': 'red',
        'border-width': '3px',
        'border-style': 'groove'
      };
    } else {
      $scope.errorMessage = '';
    }
    if (currentCost <= $scope.event.budgetGoal){
      $scope.event.budget[0].amount = $scope.event.budgetGoal - currentCost;
      $scope.errorMessage = '';
    } else {
      $scope.event.budget[0].amount = 0.0;
      $scope.errorMessage = 'Over Budget';
      $scope.addItemStyle = {
        'border-color': 'red',
        'border-width': '3px',
        'border-style': 'groove'
      };
    }
    $scope.event.budget.splice(index, 1);

    updateEvent($scope.event);

  };

  // checks to make sure the event can be edited/deleted by the client
  $scope.canEdit = function(expense){
    if (expense.user === 'client'){
      return true;
    } else {
      return false;
    }
  };

  // to edit an expenditure
  $scope.editExpenditure = function(expense){
    $scope.estate = !$scope.estate;
    $scope.expenditure = expense;
    var index = $scope.event.budget.indexOf(expense);
    $scope.event.budget.splice(index, 1);
  };

  // to update an expenditure
  $scope.update = function(expense){
    $scope.estate = !$scope.estate;
    $scope.title = expense.title;
    $scope.amount = expense.amount;
    $scope.addExpenditure();
  };

}]);
