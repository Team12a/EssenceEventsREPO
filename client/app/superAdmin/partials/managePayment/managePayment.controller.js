'use strict';

angular.module('essenceEventsRepoApp.superAdmin')
.controller('ManagePaymentCtrlSuper', ['$scope', '$state', '$modal', '$q', 'Payments', 'Auth', function ($scope, $state, $modal, $q, Payments, Auth) {

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

      Payments.getAll()
      .then(function(response) {
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
      templateUrl: 'app/superAdmin/partials/managePayment/managePaymentModal/managePaymentModal.html',
      controller: 'ManagePaymentModalCtrlSuper',
      resolve: {
        payment: function()
        {
          return payment;
        }
      }
    });
  };
}]);
