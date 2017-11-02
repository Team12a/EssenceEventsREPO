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

      $scope.hasItems = function(arr)
      {
        return (arr.length > 0);
      };

      //Takes you to page to add a guest for the selected event
      $scope.addGuest = function(){
        $state.go('client.addGuest', {ev : event} );
      };

      //
      // //Have To double check the correct index
      // $scope.changeAccepted = function(index) {
      //   $scope.ev.guests[index].accepted = !$scope.event.guests[index].accepted;
      // };


  $scope.toggleEdit = function (item) {
    $scope.state1 = !$scope.state1;
    $scope.guest = item;

      $scope.hasItems = function(arr)
      {
        return (arr.length > 0);
      };


      $scope.updateGuest = function(){
        console.log("here");
        item.phoneNumber = $scope.guestPhone ;
        item.email = $scope.guestEmail;
        item.partySize = $scope.guestSize;
        item.accommodations= $scope.guestAccommodations;
      };

      $scope.removeGuest = function(){

      };
  };
};

}]);
