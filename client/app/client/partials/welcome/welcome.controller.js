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

//Open Manage Clients Modal to manage client information and create events for a client
$scope.openModal= function(event) {
  var modalInstance = $modal.open({
    animation: true,
    scope: $scope,
     templateUrl: 'app/client/partials/welcome/welcomeModal/welcomeModal.html',
     controller: 'WelcomeModalCtrl',
     resolve: {
       event: function()
       {
         return event;
       }
     }
   });
 };


$scope.toggle = function (event) {
  $scope.state = !$scope.state;
  $scope.ev = event;
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

    //Calendar stuff
    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();
    $scope.todo = [];
    $scope.todo.push({title: $scope.ev.name, type: 'important', startsAt: new Date($scope.ev.date)});
    for (var i = 0; i < $scope.ev.toDoList.length; i++)
      $scope.todo.push({title: $scope.ev.toDoList[i].todo, type: 'info', startsAt: new Date($scope.ev.toDoList[i].by)});
};


}]);
