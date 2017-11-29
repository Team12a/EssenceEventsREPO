'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
.controller('ManagePaymentCtrl', ['$scope', '$state', '$modal', '$q', 'Payments', 'Auth', function ($scope, $state, $modal, $q, Payments, Auth) {

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
    $scope.getPayments = function() {
      console.log("Im here!");
      Payments.getAll()
      .then(function(response) {
        console.log(response);
        $scope.payments = response.data;
      }, function(error) {
        //do something
      });
    };
    //Open modal view
  $scope.openModal = function(payment) {
    var modalInstance = $modal.open({
      animation: true,
      backdrop: 'static',
      templateUrl: 'app/admin/partials/managePayment/managePaymentModal/managePaymentModal.html',
      controller: 'ManagePaymentModalCtrl',
      resolve: {
        payment: function()
        {
          return payment;
        }
      }
    });
  };
}]);
