'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('manageGuestListCtrl', [ 'Events', 'Auth', '$scope', '$stateParams', '$state', function ( Events, Auth, $scope, $stateParams, $state) {

  $scope.formData = {};
  $scope.state;
  $scope.state1;

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

    $scope.state1 = "edit";
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


  $scope.updateGuest = function(event, guest){

    for(var i = 0; i < event.guests.length; i++){
      //Finds Correct Guest
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

    Events.update(event)
    .then(function(response) {
      //Clears Form
      $scope.formData = {
        'guestPhone'     : undefined,
        'guestEmail'      : undefined,
        'guestAccommodations' : null,
        'guestSize' : undefined
    };
      $scope.state1 = undefined;
    }, function(err) {
      //do something
    });
  };

  $scope.toggle = function(event) {

    $scope.state = true;
    $scope.ev = event;
    $scope.state1 = undefined;
    $scope.hasItems = function(arr) {
      return (arr.length > 0);
    };
  };

  $scope.cancel = function(){
    $scope.state1 = undefined;
  };
}]);
