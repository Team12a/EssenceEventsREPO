'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
.controller('viewGuestListCtrl', [ 'Auth', 'Events', '$scope','$stateParams', '$state', function (Auth, Events, $scope, $stateParams, $state) {

  $scope.eve =  $stateParams.ev;
  $scope.formData = {}

  if($stateParams.ev == 'undefined')
  {
    $state.go('superAdmin.manageEvent');
  }

  $scope.toggle = function(){
    if($scope.state){
      $scope.state = !$scope.state;
    }
      $scope.state1 = !$scope.state1;

  };

  $scope.addGuest = function(){

    var newGuest = {
      "name": $scope.name,
      "partySize": $scope.partySize,
      "accommodations": $scope.accommodations,
      "email": $scope.email,
      "phoneNumber": $scope.phoneNumber
    };
      $scope.name = undefined;
      $scope.partySize = undefined;
      $scope.accommodations = undefined;
      $scope.email = undefined;
      $scope.phoneNumber = undefined;

   $scope.eve.guests.push(newGuest);
   Events.update($scope.eve);
   $scope.state1 = !$scope.state1;
   };

  $scope.changeAccepted = function(guest) {

  //Finds the correct guest by email
  for(var i = 0; i < $scope.eve.guests.length; i++){
    if($scope.eve.guests[i].email == guest.email){
      $scope.eve.guests[i].accepted = !$scope.eve.guests[i].accepted;
      break;
    }
  }

  Events.update($scope.eve);
};

  $scope.removeGuest = function(guest){
    //Finds correct guest by email
    for(var i = 0; i < $scope.eve.guests.length; i++){
      if($scope.eve.guests[i].email == guest.email){
        $scope.eve.guests.splice(i, 1);
        break;
      }
    }
    Events.update($scope.eve);
  };


    //Brings up the edit guest form
    $scope.toggleEdit = function (guest) {

      $scope.state = !$scope.state;
      $scope.guest = guest;

        $scope.hasItems = function(arr)
        {
          return (arr.length > 0);
        };
    };

  $scope.updateGuest = function(guest){

     for(var i = 0; i < $scope.eve.guests.length; i++){
       //Finds Correct Guest
       if($scope.eve.guests[i].email == guest.email){

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

       Events.update($scope.eve)
     .then(function(response) {
       //Clears Form
       $scope.formData = {
         'guestPhone'     : undefined,
         'guestEmail'      : undefined,
         'guestAccommodations' : null,
         'guestSize' : undefined
     };
      $scope.state = !$scope.state;
     }, function(err) {
       //do something
     });
   };
}]);
