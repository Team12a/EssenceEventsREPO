'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('addGuestCtrl', [ 'event', 'Auth',  '$scope','$stateParams', '$state', function (event, Auth, $scope, $stateParams, $state) {

  $scope.ev = event;

  $scope.addGuest = function(){
    console.log("add Event");
    var newGuest = {
    name: $scope.name,
    partySize: $scope.partySize,
    accommodations: $scope.accommodations,
    attending: $scope.attending
    };
    event.guests.push(newGuest);
  }
}]);
