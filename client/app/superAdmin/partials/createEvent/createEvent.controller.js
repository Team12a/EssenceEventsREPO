'use strict';


angular.module('essenceEventsRepoApp.superAdmin')
.controller('CreateEventCtrlSuper', ['Events', '$scope', '$stateParams', '$state', 'uiGmapGoogleMapApi', function (Events, $scope, $stateParams, $state, uiGmapGoogleMapApi) {


  // $scope.message = 'Hello';

  //handle people trying to hit url directly.
  if($stateParams.userID == 'undefined')
  {
    $state.go('superAdmin.manageAccounts');
  }

  //used to display the user you are talking to
  $scope.clientName = $stateParams.usersName;

  //datePickerOptions
  $scope.dateOptions =



  //set up date for event
  $scope.eventDate = new Date();
  $scope.openEventDate = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.eventDateOpened = true;
  };


  // $scope.freeCash;
  $scope.currCost = 0;
  $scope.myStyle='';
  $scope.thingsToDo = [];
  $scope.budget = [
    {
      title: "Free Cash",
      amount: $scope.freeCash
    }
  ];

  //Update the free cash variable and check for errors
  $scope.updateFreeCash = function()
  {
    if ($scope.budgetGoal < $scope.currCost) {
      $scope.mybudgetGoalStyle = {
        "border-color" : "red",
        "border-width": "3px",
        "border-style": "groove"
      }
      $scope.budgetGoal = $scope.freeCash + $scope.currCost;
    }
    else if($scope.currCost) {
      $scope.freeCash = $scope.budgetGoal-$scope.currCost;
      $scope.mybudgetGoalStyle = {};
      $scope.changeFreeCashArr();
    }
    else {
      $scope.freeCash = $scope.budgetGoal
      $scope.changeFreeCashArr();
      $scope.mybudgetGoalStyle = {};
    }
  }

  //Change free cash when updated in the budget array
  $scope.changeFreeCashArr = function()
  {
    $scope.budget[0] = ({title: "Free Cash", amount: $scope.freeCash, user: 'superadmin'});
  }

  //Check if Todo List is empty
  $scope.hasItems = function(arr)
  {
    return (arr.length > 0);
  };

  //Since free cash isn't shown, check if Budget has more than one item
  $scope.budgetHasItems = function(arr)
  {
    return (arr.length > 1);
  };

  //Logic to remove budget item and update free cash
  $scope.delete = function(arr, index)
  {
    $scope.freeCash = $scope.freeCash + $scope.budget[index].amount;
    $scope.changeFreeCashArr();
    $scope.currCost -= $scope.budget[index].amount;

    arr.splice(index, 1);
  };

  //Update Budget array when a new item is added
  $scope.addBudget = function()
  {
    if ($scope.budgetItem && $scope.itemCost && $scope.freeCash >= $scope.itemCost) {
      $scope.budget.push({title: $scope.budgetItem, amount: $scope.itemCost, user: 'superadmin'});
      $scope.freeCash = $scope.freeCash - $scope.itemCost;
      $scope.currCost += $scope.itemCost;
      $scope.myBudgetStyle = {}
      $scope.changeFreeCashArr();
      $scope.budgetItem = null;
      $scope.itemCost = null;
    }
    else {
      $scope.myBudgetStyle = {
        "border-color" : "red",
        "border-width": "3px",
        "border-style": "groove"
      }
      alert("Invalid input");
    }
  }

  // Pi chart for budget
  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 500,
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

  //set up date for event
  $scope.todoDate = new Date();
  $scope.opentodoDate = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.todoDateOpened = true;
  };

  //Adds item to Todo Array
  $scope.addToDo = function()
  {
    if ($scope.todoInput)
    $scope.thingsToDo.push({todo: $scope.todoInput, by: $scope.todoDate, done: false});
    $scope.todoDate = '';
    $scope.todoInput = '';
  };

  //deletes item from todo list
  $scope.deletethingsToDo = function(arr, index)
  {
    arr.splice(index,1);
  }

  //Saves all of the $scope fields into an event object and saves it to the database
  $scope.submit = function() {


    uiGmapGoogleMapApi.then(function(maps) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': $scope.venueAddress},function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
          var locCoord = results[0].geometry.location;
              $scope.latitude= locCoord.lat();
              $scope.longitude= locCoord.lng();
        }else {

              $scope.latitude = 29.65253;
              $scope.longitude = -82.330276;
              $scope.venueName = 'Essence Events';
              $scope.venueAddress = '530 W University Ave Gainesville, FL ';
        }
        var event = {
          name: $scope.eventName,
          date: $scope.eventDate,
          locationName: $scope.venueName,
          locationAdd: $scope.venueAddress,
          lat: $scope.latitude,
          lng: $scope.longitude,
          userId: $stateParams.userID,
          toDoList: $scope.thingsToDo,
          budgetGoal: $scope.budgetGoal,
          budget: $scope.budget
        };
        Events.create(event)
          .then(function(response) {
            $state.go('superAdmin.manageEvent');
          }, function(err) {
            //do something
        });
      });
        });


  };

}]);
