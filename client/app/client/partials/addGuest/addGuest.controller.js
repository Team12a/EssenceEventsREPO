'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('addGuestCtrl', [ 'Auth',  '$scope','$stateParams', '$state', function (Auth, $scope, $stateParams, $state) {

  console.log(JSON.stringify($stateParams.ev));
  $scope.eve =  $stateParams.ev;
  console.log($scope.eve);

  $scope.addGuest = function(){
    console.log("add Guest");
    var newGuest = {
    "name": $scope.name,
    "partySize": $scope.partySize,
    "accommodations": $scope.accommodations,
    "attending": $scope.attending
    };
    $scope.eve.guests.push(newGuest);
  };
}]);
