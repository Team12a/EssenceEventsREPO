'use strict';

angular.module('essenceEventsRepoApp.client')
.controller('WelcomeCtrl', [ 'Events', 'Auth', '$scope','$modal', '$stateParams', '$state', function ( Events, Auth, $scope, $modal, $stateParams, $state) {

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

//Open Manage Clients Modal to manage client information and create events for a client
$scope.openModal= function(event) {
  var modalInstance = $modal.open({
    animation: true,
     templateUrl: 'app/client/partials/welcome/welcomeModal/welcomeModal.html',
     controller: 'WelcomeModalCtrl',
     resolve: {
       event: function()
       {
         return event;
       }
     }
   });
 };

}]);
