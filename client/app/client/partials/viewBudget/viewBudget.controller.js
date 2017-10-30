'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('viewBudgetCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

console.log("check if event passed through" + $stateParams.eventId);
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

$scope.useridlauren = 0;
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
  //$scope.state = !$scope.state;
  //$scope.ev = event;
  $scope.getEventSubcons = function() {
    var promises = $scope.event.subcontractors.map(function(subcon) {
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


// $scope.getEventSubcons = function() {
//   if (event.subcontractors.length != "0"){
//     var promises = $scope.event.subcontractors.map(function(subcon) {
//       return Subcontractors.getOne(subcon);
//     });
//     console.log("promises: " + promises);
//     $q.all(promises)
//     .then(function(response) {
//       response.forEach(function(r) {
//         $scope.subcontractors.push(r.data);
//       });
//     }, function(err) {
//       //do something
//     });
//   }
// };
//
// $scope.changeDone = function(index) {
//   $scope.event.toDoList[index].done = !$scope.event.toDoList[index].done;
//   var body = {
//     index: index,
//     bool: $scope.event.toDoList[index].done
//   };
//   Events.toggleTodo($scope.event._id, body)
//     .then(function(response) {
// //console.log('done');
//     }, function(err) {
// //do something
//   });
// };
//
//
//   // Pi chart for budget
//   $scope.options = {
//     chart: {
//       type: 'pieChart',
//       height: 300,
//       x: function(d){return d.title},
//       y: function(d){return d.amount;},
//       showLabels: true,
//       duration: 500,
//       labelThreshold: 0.01,
//       labelSunbeamLayout: true,
//       legend: {
//         margin: {
//           top: 5,
//           right: 35,
//           bottom: 5,
//           left: 0
//         }
//       }
//     }
//   };
//
//   //Todo list
//   $scope.hasItems = function(arr)
//   {
//     return (arr.length > 0);
//   };
//
//   $scope.$on('$viewContentLoaded', function(){
//     //Here your view content is fully loaded !!
//     //Calendar stuff
//     $scope.calendarView = 'month';
//     $scope.calendarDate = new Date();
//     $scope.todo = [];
//     $scope.todo.push({title: $scope.event.name, type: 'important', startsAt: new Date($scope.event.date)});
//     console.log("todo: " + $scope.todo);
//     console.log("todoList: " + $scope.event.toDoList[0]);
//
//     for (var i = 0; i < $scope.event.toDoList.length(); i++)
//       $scope.todo.push({title: $scope.event.toDoList[i].todo, type: 'info', startsAt: new Date($scope.event.toDoList[i].by)});
//   });


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
