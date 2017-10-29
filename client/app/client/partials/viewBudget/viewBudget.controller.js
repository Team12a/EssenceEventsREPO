'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('viewBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

var getUser = function() {
  console.log(" am i getting the user?");
  if (!$scope.curUser._id) {
    console.error("no user found");
    setTimeout(getUser, 100);
  } else {
    $scope.clientName = $scope.curUser.name;
    $scope.id = $scope.curUser._id;
  }
};

$scope.curUser = Auth.getCurrentUser();
console.log("scope.curUser = " + $scope.curUser);
getUser();
console.log("$scope.clientName: " + $scope.clientName);
console.log("$scope.curUser._id: " + $scope.curUser._id);
$scope.useridlauren = 0;
$scope.getEvents = function(){
  console.log("$scope.id = " + $scope.id);
  if (!$scope.id)
    setTimeout($scope.getEvents, 100);
  else {
      //Events.getByUser($scope.id)
      // to test the retrieval of database information
      $scope.useridlauren = '59f5e336df1d79a60ab45ca7';
      Events.getByUser( $scope.useridlauren )
        .then(function(response) {
          console.log("response.data = " + response.data);
          $scope.events = response.data;
          console.log("events: " + $scope.events[0].name);
          $scope.event = $scope.events[0]
          console.log("event: " + $scope.event);
        }, function(error) {
          console.error(error);
          //do something
      });
  }
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

  //viewBudget
  $scope.viewBudget = function()
  {
    console.log("in the view budget function");
    //$modalInstance.close();
    $state.go('client.viewBudget', {userID : $scope.id, usersName : $scope.clientName});
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


// 'use strict';
//
// angular.module('essenceEventsRepoApp.client')
// .controller('viewBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {
//
// console.log("yo yo yo");
//
// var getUser = function() {
//   console.log("getting user");
//   if (!$scope.curUser._id)
//     console.error("could not find user");
//     setTimeout(getUser, 100);
//   else {
//     $scope.clientName = $scope.curUser.name;
//     console.log("curUser" + $scope.curUser);
//     console.log("curUser._id" + $scope.curUser._id);
//     console.log("curUser._id.$oid" + $scope.curUser._id.$oid);
//     $scope.id = $scope.curUser._id.$oid;
//   }
// };
//
// $scope.curUser = Auth.getCurrentUser();
// getUser();
// console.log("where am i");
//
// $scope.getEvents = function(){
//   console.log("getting events");
//   if (!$scope.id)
//     setTimeout($scope.getEvents, 100);
//   else
//     Events.getByUser($scope.id)
//       .then(function(response) {
//         $scope.events = response.data;
//       }, function(error) {
//         //do something
//     });
// };
//
// $scope.toggle = function (event) {
//   $scope.state = !$scope.state;
//   $scope.ev = event;
//   $scope.getEventSubcons = function() {
//     var promises = $scope.ev.subcontractors.map(function(subcon) {
//       return Subcontractors.getOne(subcon);
//     });
//     $q.all(promises)
//     .then(function(response) {
//       response.forEach(function(r) {
//         $scope.subcontractors.push(r.data);
//       });
//     }, function(err) {
//       //do something
//     });
//   };
//
//   $scope.changeDone = function(index) {
//     $scope.ev.toDoList[index].done = !$scope.ev.toDoList[index].done;
//     var body = {
//       index: index,
//       bool: $scope.ev.toDoList[index].done
//     };
//     Events.toggleTodo($scope.ev._id, body)
//       .then(function(response) {
// 	//console.log('done');
//       }, function(err) {
// 	//do something
//     });
//   };
//
//     // Pi chart for budget
//     $scope.options = {
//       chart: {
//         type: 'pieChart',
//         height: 300,
//         x: function(d){return d.title},
//         y: function(d){return d.amount;},
//         showLabels: true,
//         duration: 500,
//         labelThreshold: 0.01,
//         labelSunbeamLayout: true,
//         legend: {
//           margin: {
//             top: 5,
//             right: 35,
//             bottom: 5,
//             left: 0
//           }
//         }
//       }
//     };
//
//     //Todo list
//     $scope.hasItems = function(arr)
//     {
//       return (arr.length > 0);
//     };
//
//     //Calendar stuff
//     $scope.calendarView = 'month';
//     $scope.calendarDate = new Date();
//     $scope.todo = [];
//     $scope.todo.push({title: $scope.ev.name, type: 'important', startsAt: new Date($scope.ev.date)});
//     for (var i = 0; i < $scope.ev.toDoList.length; i++)
//       $scope.todo.push({title: $scope.ev.toDoList[i].todo, type: 'info', startsAt: new Date($scope.ev.toDoList[i].by)});
// };
//
//
// }]);
