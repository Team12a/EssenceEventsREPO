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

      //Takes you to page to add a guest for the selected event
      $scope.addGuest = function(){
        $state.go('client.addGuest', {ev : event} );
      };
};

    //TO-DO How to get it to save after updating the checks
    $scope.changeAccepted = function(event, index, guest) {
      console.log(guest.name);
      for(var i = 0; i < event.guests.length; i++){
        if(event.guests[i].name == guest.name){
          event.guests[i].accepted = !event.guests[i].accepted;
        }
      }
      //guest.accepted = !guest.accepted;
     //event.guests[index].accepted = !event.guests[index].accepted;
    };

  $scope.toggleEdit = function (event, guest) {
    $scope.state1 = !$scope.state1;
    $scope.ev = event;
    $scope.guest = guest;
    console.log($scope.ev);

      $scope.hasItems = function(arr)
      {
        return (arr.length > 0);
      };

      //
      // $scope.updateGuest = function(){
      //   console.log("here");
      //   if($scope.guestPhone != '')
      //   item.phoneNumber = $scope.guestPhone ;
      //
      //   if($scope.guestEmail != '')
      //   item.email = $scope.guestEmail;
      //
      //   if($scope.guestSize != '')
      //   item.partySize = $scope.guestSize;
      //
      //   if($scope.guestAccommodations != '')
      //   item.accommodations= $scope.guestAccommodations;
      // };
  };

  //TO-Do: Debug!
  $scope.removeGuest = function(event,index, guest){
    console.log("Removing");
    for(var i = 0; i < event.guests.length; i++){
      if(event.guests[i].email == guest.email){
        event.guests.splice(i, 1);
      }
    }


  };
}]);
