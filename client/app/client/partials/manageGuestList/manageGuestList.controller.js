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

  $scope.toggle = function(event) {
    $scope.state = !$scope.state;
    $scope.ev = event;

      $scope.hasItems = function(arr)
      {
        return (arr.length > 0);
      };

};

//Takes you to page to add a guest for the selected event
  $scope.addGuest = function(event){
    $state.go('client.addGuest', {ev : event} );
  };

    //TO-DO How to get it to save after updating the checks
    $scope.changeAccepted = function(event, guest) {
      for(var i = 0; i < event.guests.length; i++){
        if(event.guests[i].email == guest.email){
          event.guests[i].accepted = !event.guests[i].accepted;
        }
      }
    };

  $scope.toggleEdit = function (event, guest) {
    $scope.state1 = !$scope.state1;
    $scope.ev = event;
    $scope.guest = guest;

      $scope.hasItems = function(arr)
      {
        return (arr.length > 0);
      };


  };


  $scope.removeGuest = function(event, guest){
    for(var i = 0; i < event.guests.length; i++){
      if(event.guests[i].email == guest.email){
        event.guests.splice(i, 1);
      }
    }


  };

  $scope.updateGuest = function(event, guest){
    console.log("here");

    for(var i = 0; i < event.guests.length; i++){
      if(event.guests[i].email == guest.email){

        if($scope.guestPhone != null)
        guest.phoneNumber = $scope.guestPhone ;

        if($scope.guestEmail != null)
        guest.email = $scope.guestEmail;

        if($scope.guestSize != null)
        guest.partySize = $scope.guestSize;

        if($scope.guestAccommodations != null)
        guest.accommodations= $scope.guestAccommodations;
      }
    }
  };

}]);
