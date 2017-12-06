'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
.controller('ManageEventCtrlSuper', ['$scope', '$state', '$modal', '$q', 'Events', 'Auth', function ($scope, $state, $modal, $q, Events, Auth) {

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

    //filters to determine past and present tabs
  $scope.filterPast = function() {
    return function(item) {
      var date = new Date();
      return (new Date(item.date) < date);
    };
  };
  $scope.filterCurrent = function() {
    return function(item) {
      var date = new Date();
      return (new Date(item.date) > date);
    };
  };

    //get all events and add client name
  $scope.getEvents = function() {
    Events.getAll()
    .then(function(response) {
      $scope.events = response.data;

    //We have the userId in the model so we use Auth to get the name for each
      $scope.events.forEach(function(event) {
        Auth.getById(event.userId)
        .then(function(response) {
          event.userName = response.data.name;
        }, function(err) {
          //do something
        });
      });
    }, function(error) {
      //do something
    });
  };

    //Takes user to guest list view
    $scope.viewGuests = function(event){
      $state.go('superAdmin.viewGuestList', {ev : event});
    };

    //Open modal view
  $scope.openModal = function(event) {
    var modalInstance = $modal.open({
      animation: true,
      backdrop: 'static',
      templateUrl: 'app/superAdmin/partials/manageEvent/manageEventModal/manageEventModal.html',
      controller: 'ManageEventModalCtrlSuper',
      resolve: {
        event: function()
        {
          return event;
        }
      }
    });
  };
}]);
