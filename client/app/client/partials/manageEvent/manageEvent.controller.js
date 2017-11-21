'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('manageEventCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', 'uiGmapIsReady', function ( Events, Auth, $scope, $modal, $stateParams, $state, uiGmapIsReady) {


var getUser = function() {
  if (!$scope.curUser._id)
    setTimeout(getUser, 100);
  else {
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



$scope.toggle = function (event) {
  $scope.state = !$scope.state;
  $scope.ev = event;
  $scope.map = { center: { latitude: $scope.ev.lat, longitude: $scope.ev.lng }, zoom: 17};
  $scope.markers = {
    id:"0",
    coords: {
      latitude: $scope.ev.lat,
      longitude: $scope.ev.lng
    },
    window: {
      title: $scope.ev.locationName
    }
  };
  $scope.getEventSubcons = function() {
    var promises = $scope.ev.subcontractors.map(function(subcon) {
      return Subcontractors.getOne(subcon);
    });
    $q.all(promises)
    .then(function(response) {
      response.forEach(function(r) {
        $scope.subcontractors.push(r.data);
        console.log($scope.subcontractors)
        console.log(r.data);
      });
    }, function(err) {
      //do something
    });
  };

  $scope.datePicker = {opened: false, scheduleDateOpened: false};
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.datePicker.opened = true;
  };


  //used for Schedule Tab,
  $scope.scheduleDateOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.datePicker.scheduleDateOpened = true;
  };


  //adds item into todo list
  $scope.addToDo = function(todo, date)
  {
    if (todo && date) {
      $scope.ev.toDoList.push({todo: todo, by: date, done: false});
      return 1;
    }
    else
    return 0;
  };

  $scope.changeDone = function(index) {
    $scope.ev.toDoList[index].done = !$scope.ev.toDoList[index].done;
    var body = {
      index: index,
      bool: $scope.ev.toDoList[index].done
    };
    Events.toggleTodo($scope.ev._id, body)
      .then(function(response) {
	//console.log('done');
      }, function(err) {
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

    //Todo list
    $scope.hasItems = function(arr)
    {
      return (arr.length > 0);
    };

    //Checks if subcontractors
    $scope.hasSubcontractors = function(arr)
    {
      return (arr.length > 0);
    };

    //Calendar stuff
    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();
    $scope.todo = [];
    $scope.todo.push({title: $scope.ev.name, type: 'important', startsAt: new Date($scope.ev.date)});
    for (var i = 0; i < $scope.ev.toDoList.length; i++)
      $scope.todo.push({title: $scope.ev.toDoList[i].todo, type: 'info', startsAt: new Date($scope.ev.toDoList[i].by)});

};

}]);
