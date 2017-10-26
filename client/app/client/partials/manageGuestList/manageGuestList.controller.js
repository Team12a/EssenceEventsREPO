'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('manageGuestListCtrl', [ 'Events', 'Auth', '$scope', '$stateParams', '$state', function ( Events, Auth, $scope, $stateParams, $state) {

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


    //Todo list
    $scope.hasItems = function(arr)
    {
      return (arr.length > 0);
    };


        $scope.addGuest = function(){
          console.log("here");
        $state.go('client.addGuest', {event: $scope.ev } );
        };
};

}]);
