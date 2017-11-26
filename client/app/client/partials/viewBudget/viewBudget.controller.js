'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('viewBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

$scope.eventId = $stateParams.eventId;
if (!$stateParams.eventId){
  $state.go('client.yourBudget');
} else {
  $scope.event = Events.getOne($stateParams.eventId);
  console.log($scope.event);
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

  $scope.addExpenditure = function(){
    console.log('expenditure added');
    console.log('budget: ' + $scope.event.budget);
    if (!$scope.event.budgetGoal){
      $scope.event.budgetGoal = 0;
    }
    console.log('budget goal: ' + $scope.event.budgetGoal);
    var currentCost = 0.0;
    for (var i = 1; i < $scope.event.budget.length; i++){
      currentCost += $scope.event.budget[i].amount;
      console.log('new current cost: ' + currentCost);
    }
    console.log('scope amount: ' + $scope.amount);
    currentCost += Number($scope.amount);
    $scope.currentCost = currentCost;
    console.log('current cost: ' + currentCost);
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

  $scope.deleteExpenditure = function(expense){

    console.log('delete expenditure');
    var index = $scope.event.budget.indexOf(expense);
    $scope.currentCost = Number($scope.currentCost) - Number($scope.event.budget[index].amount);
    if ($scope.currentCost <= $scope.event.budgetGoal) {
      $scope.addItemStyle = {};
      $scope.errorMessage = '';
    }
    $scope.event.budget.splice(index, 1);
    if ($scope.currentCost <= $scope.event.budgetGoal){
      $scope.event.budget[0].amount = Number($scope.event.budgetGoal) - Number($scope.currentCost);
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
    updateEvent($scope.event);

  };

  $scope.canEdit = function(expense){
    //console.log('user: ' + expense.user );
    if (expense.user === 'client'){
      //console.log('can edit expense');
      return true;
    } else {
      //console.log('cannot edit an expense that you did not input');
      return false;
    }
  };

  $scope.canDelete = function(expense){
    //console.log('user: ' + expense.user );
    if (expense.user === 'client'){
      //console.log('can delete expense');
      return true;
    } else {
      //console.log('cannot delete an expense that you did not input');
      return false;
    }
  };

  //$scope.editingExpense = false;
  $scope.editExpenditure = function(expense){
    $scope.estate = !$scope.estate;
    $scope.expenditure = expense;
    var index = $scope.event.budget.indexOf(expense);
    $scope.event.budget.splice(index, 1);
  };

  $scope.update = function(expense){

    $scope.estate = !$scope.estate;
    console.log(expense);

    $scope.title = expense.title;
    $scope.amount = expense.amount;
    $scope.addExpenditure();
    //updateEvent($scope.event)

  };

}]);
