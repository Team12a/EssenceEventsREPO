'use strict';

angular.module('essenceEventsRepoApp.admin')
.controller('viewGuestListCtrl', [ 'Auth',  '$scope','$stateParams', '$state', function (Auth, $scope, $stateParams, $state) {

  $scope.eve =  $stateParams.ev;

  $scope.addGuest = function(){
    console.log("add Event");
    var newGuest = {
    "name": $scope.name,
    "partySize": $scope.partySize,
    "accommodations": $scope.accommodations,
    "attending": $scope.attending
    };
    eve.guests.push(newGuest);
  };
}]);
