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


/**this is for Basic Info
$scope.datePicker = {opened: false, scheduleDateOpened: false};
$scope.open = function($event) {
  $event.preventDefault();
  $event.stopPropagation();
  $scope.datePicker.opened = true;
};
*/


/**used for Schedule Tab,
$scope.scheduleDateOpen = function($event) {
  $event.preventDefault();
  $event.stopPropagation();
  $scope.datePicker.scheduleDateOpened = true;
};
*/


//Close modal without making changes
$scope.cancel = function() {
  $modalInstance.close();
}
}]);
