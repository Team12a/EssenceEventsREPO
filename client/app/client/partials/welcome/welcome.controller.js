'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('WelcomeCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

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

  $scope.accepted = 0;
  $scope.pending = 0;

  for(var i = 0; i < event.guests.length; i++){
    if(event.guests[i].accepted)
      $scope.accepted+= event.guests[i].partySize;
    else {
      $scope.pending+= event.guests[i].partySize;
    }
  }
  
  $scope.getEventSubcons = function() {
    var promises = $scope.ev.subcontractors.map(function(subcon) {
      return Subcontractors.getOne(subcon);
    });
    $q.all(promises)
    .then(function(response) {
      response.forEach(function(r) {
        $scope.subcontractors.push(r.data);
      });
    }, function(err) {
      //do something
    });
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

  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.title })
        .y(function(d) { return d.amount })
        .showLabels(true);

      d3.select("#chart svg")
          .datum($scope.ev.budget)
        .transition().duration(1200)
          .call(chart);

    return chart;
  });

  //Todo list
  $scope.hasItems = function(arr)
  {
    return (arr.length > 0);
  };

  //Calendar stuff
  $scope.calendarView = 'month';
  $scope.calendarDate = new Date();
  $scope.todo = [];
  $scope.todo.push({title: $scope.ev.name, type: 'important', startsAt: new Date($scope.ev.date)});
  for (var i = 0; i < $scope.ev.toDoList.length; i++){
      $scope.todo.push({title: $scope.ev.toDoList[i].todo, type: 'info', startsAt: new Date($scope.ev.toDoList[i].by)});
  }
};


}]);
