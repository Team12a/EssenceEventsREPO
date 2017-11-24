'use strict';

angular.module('essenceEventsRepoApp.admin')
.controller('ViewGuestListCtrl', ['Events', 'event', '$scope', '$stateParams', '$state', function (Events, event, $scope, $stateParams, $state) {

  if ($stateParams.event[0])
    $state.go('admin.manageEvent');
  $scope.event = $stateParams.event;


  $scope.addGuest = function(name, email, phoneNumber, partySize, accommodations) {
    if(name && email) {
      $scope.event.guests.push({name: name, email: email, phoneNumber: phoneNumber, partySize: partySize, accepted: false, accommodations: accommodations});
      return 1;
    }
    else
    return 0;
  };

  //Remove a guest from the array
  $scope.deleteGuest = function(index) {
    $scope.event.guests.splice(index, 1);
  };

  //Change the guest accepted checkbox
  $scope.changeAccepted = function(index) {
    $scope.event.guests[index].accepted = !$scope.event.guests[index].accepted;
  };

  //Check if array is empty
  $scope.hasItems = function(arr)
  {
    return (arr.length > 0);
  };

  $scope.submit = function() {
    uiGmapGoogleMapApi.then(function(maps) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': $scope.event.locationAdd},function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
          var locCoord = results[0].geometry.location;
              $scope.event.lat= locCoord.lat();
              $scope.event.lng= locCoord.lng();
            }
            $scope.event.budget[0].amount = ($scope.currentCost > $scope.event.budgetGoal)? 0 : $scope.event.budgetGoal - $scope.currentCost;
            if ($scope.event.name && $scope.event.date)
            Events.update($scope.event)
            .then(function(response) {
              $modalInstance.close();
              $state.reload();
            }, function(err) {
              console.log(err);
            });
          });
        });

  };

}]);
