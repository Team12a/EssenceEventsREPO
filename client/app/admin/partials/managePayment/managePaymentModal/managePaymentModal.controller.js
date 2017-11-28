'use strict';

angular.module('essenceEventsRepoApp.admin')
.controller('ManagePaymentModalCtrl', ['$scope', '$state', '$q', '$modalInstance', 'payment', 'Payments', function ($scope, $state, $q, $modalInstance, payment, Payments)
{

    //Copy object so we don't change main page concurrently and setup subcontractors
  $scope.payment = JSON.parse(JSON.stringify(payment));

  //hideDeleteTab with functionality
  $scope.hideDeleteTab = true;

  $scope.showDeleteTabFunc = function()
  {
    $scope.hideDeleteTab = false;
  }

  $scope.hideDeleteTabFunc = function()
  {
    $scope.hideDeleteTab = true;
  }

  //deleteEvent
  $scope.deletePayment = function()
  {
    Payments.remove(payment._id).then(function()
      {
        $modalInstance.close();
        $state.reload();
      }
    );
  }

//Close modal without making changes
$scope.cancel = function() {
  $modalInstance.close();
}
}]);
