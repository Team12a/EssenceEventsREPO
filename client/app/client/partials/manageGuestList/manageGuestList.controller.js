'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('manageGuestListCtrl', [ 'Events', 'Auth', '$scope', '$stateParams', '$state', function ( Events, Auth, $scope, $stateParams, $state) {

  $scope.formData = {};

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

  //Displays the guest list for selected event
  $scope.toggle = function(event) {
    //TO-DO: Add in logic to close state1 when this state is closed
    $scope.state = !$scope.state;
    $scope.ev = event;

    $scope.hasItems = function(arr) {
      return (arr.length > 0);
    };
};

  //Takes you to page to add a guest for the selected event
  $scope.addGuest = function(event){
    $state.go('client.addGuest', {ev : event} );
  };


  $scope.changeAccepted = function(event, guest) {

    //Finds the correct guest by email
    for(var i = 0; i < event.guests.length; i++){
      if(event.guests[i].email == guest.email){
        event.guests[i].accepted = !event.guests[i].accepted;
      }
    }

    Events.update(event);
  };

  //Brings up the edit guest form
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
    //Finds correct guest by email
    for(var i = 0; i < event.guests.length; i++){
      if(event.guests[i].email == guest.email){
        event.guests.splice(i, 1);
      }
    }
    Events.update(event);

  };

  //This function not working
  $scope.updateGuest = function(event, guest){

    for(var i = 0; i < event.guests.length; i++){

      if(event.guests[i].email == guest.email){

        if($scope.formData.guestPhone != undefined)
          guest.phoneNumber = $scope.formData.guestPhone;

        if($scope.formData.guestEmail != undefined)
          guest.email = $scope.formData.guestEmail;

        if($scope.formData.guestAccommodations != null)
          guest.accommodations = $scope.formData.guestAccommodations;

        if($scope.formData.guestSize != undefined)
          guest.partySize = $scope.formData.guestSize;
      }
    }
    Events.update(event);
  };

}]);
