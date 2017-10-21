'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('manageGuestListCtrl', [ 'Events', 'Auth',  '$scope','$stateParams', '$state', function ( Events, Auth, $scope, $stateParams, $state) {


$scope.ev = $scope.Selectedevent;

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

  $scope.hasItems = function(arr)
  {
    return (arr.length > 0);
  };

$scope.getGuests = function(event){
  if(!$scope.id)
    setTimeout($scope.getGuests, 100);
  else
    $scope.ev = event;
        //do something

};

//Add Guest
$scope.addGuest = function()
{
  $state.go('client.addGuest', {userID : user._id, usersName : user.name});
};

}]);
