'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('manageGuestListCtrl', [ 'Events', 'Auth',  '$scope','$stateParams', '$state', function ( Events, Auth, $scope, $stateParams, $state) {


//console.log($scope.selectedEventId);
//console.log(ev.name);

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

$scope.selectEvent = function(selectedEventId){
  console.log("test");
  if (!$scope.id)
    setTimeout($scope.selectEvent, 100);
  else
  Events.findOneById(selectedEventId)
  .then(function(response){
    $scope.ev = response.data;
  }, function(error){
    //do something
});
  console.log($ev.name);
};

//Add Guest
$scope.addGuest = function()
{
  $state.go('client.addGuest');
};

}]);
