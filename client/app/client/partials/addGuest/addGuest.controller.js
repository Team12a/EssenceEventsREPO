'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('addGuestCtrl', [ 'Events', 'Auth',  '$scope','$stateParams', '$state', function (Events, Auth, $scope, $stateParams, $state) {

  $scope.eve =  $stateParams.ev;

  $scope.addGuest = function(){
    var newGuest = {
    "name": $scope.name,
    "partySize": $scope.partySize,
    "accommodations": $scope.accommodations,
    "email": $scope.email,
    "phoneNumber": $scope.phoneNumber
    };
    $scope.eve.guests.push(newGuest);
    Events.update($scope.eve)
    .then(function(response){
      $state.go('client.manageGuestList');
    }, function(err){

    });

  };
}]);
